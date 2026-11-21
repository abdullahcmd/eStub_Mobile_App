# eStubs Mobile App — Architecture & Coding Guide

> **Every human and AI agent working in this repo must follow this file.**
> If you add a pattern that is not described here, update this file in the same PR.

eStubs is a React Native **CLI** (not Expo) app, written in **TypeScript**, that lets employees securely view pay stubs and W-2 tax forms. The design source is `eStubDesign.pdf` (14 frames: splash, 4-step sign-in, home, W-2 list/viewer, pay stub list/detail, profile, and 3 bottom sheets).

---

## 1. Stack

| Concern | Library |
|---|---|
| Framework | React Native CLI 0.88, React 19, TypeScript |
| Navigation | `@react-navigation/native`, `native-stack`, `bottom-tabs`, `react-native-screens`, `react-native-safe-area-context` |
| State | Redux Toolkit, `react-redux`, `redux-persist` + AsyncStorage |
| Forms / validation | **Formik + Yup** (mandatory for every input) |
| SVG | `react-native-svg` + `react-native-svg-transformer` |
| Networking | `axios` (single client in `src/api/client.ts`) |
| Secure storage | `react-native-keychain` (auth token) |
| Biometrics | `react-native-biometrics` |
| PDF | `react-native-pdf` (view), `react-native-blob-util` (download) |
| Dates | `dayjs`, `@react-native-community/datetimepicker` |
| Feedback | `react-native-toast-message` |

> Dependencies are declared in `package.json` but **not installed yet**. Run `npm install` and `cd ios && bundle exec pod install` before building. Do not add a library without listing it here.

---

## 2. Folder structure

```
index.js                 # registers src/App
src/
  App.tsx                # providers: Redux → PersistGate → SafeArea → Theme → Navigation
  api/
    client.ts            # axios instance, auth token + 401 handler
    endpoints.ts         # all URL paths
    services/            # one file per backend area (authService, payStubService, w2Service)
    mocks/               # mock data + latency helpers (used when config.USE_MOCKS)
  assets/icons/          # *.svg files + index.ts icon registry
  components/            # ALL reusable UI, grouped by feature (see §4)
    common/  form/  auth/  home/  payStubs/  w2/  profile/  navigation/
  constants/             # config.ts (env-like values), routes.ts (route names)
  hooks/                 # useAppDispatch/useAppSelector, useCountdown, useDocumentActions
  navigation/            # RootNavigator, AuthNavigator, MainTabs, types.ts, navigationRef
  screens/               # thin screens grouped by feature, composed from components
  store/
    index.ts             # configureStore, persistor, RootState, AppDispatch
    rootReducer.ts       # combineReducers + persist configs
    slices/              # appSlice, authSlice, themeSlice, payStubsSlice, w2Slice
  theme/                 # colors (light/dark), tokens, ThemeProvider, createUseStyles
  types/                 # shared domain models (models.ts), svg.d.ts
  utils/                 # pure helpers (format, dates, errors, secureStorage, biometrics, download)
  validation/            # Yup schemas (schemas.ts)
__tests__/  __mocks__/   # jest
```

Path alias: `@/` → `src/` (configured in `babel.config.js`, `tsconfig.json`, `jest.config.js`). **Always import with `@/…`**, never with `../../..` across top-level folders. Relative imports are OK only inside the same component folder.

---

## 3. Screen map & navigation

```
Root stack (native-stack)
├─ Splash                          (until app.isBootstrapped)
├─ [logged out]
│   ├─ Auth (native-stack)
│   │    FindCompany → EmployeeId → VerifyPin → Password        (steps 1–4)
│   └─ EmployeeIdHelpSheet         (transparentModal bottom sheet)
└─ [logged in]
    ├─ Main (bottom-tabs, custom AppTabBar)
    │    Home | PayStubs | W2Forms | Profile
    ├─ PayStubDetail {payStubId}   (no tab bar)
    ├─ W2Viewer {documentId}       (no tab bar)
    ├─ DateFilterSheet             (transparentModal bottom sheet)
    └─ LogoutSheet                 (transparentModal bottom sheet)
```

Rules:
- Auth gating is done by **conditionally rendering screens** in `RootNavigator` based on `selectIsBootstrapped` / `selectIsAuthenticated`. Never call `navigation.navigate('Main')` after login/logout — changing redux state switches the stack.
- Route names come from `ROUTES` (`src/constants/routes.ts`); param types live in `src/navigation/types.ts`. Add a new route in **both** places, plus the navigator.
- Type screens with the helpers `RootStackScreenProps<'X'>`, `AuthStackScreenProps<'X'>`, `MainTabScreenProps<'X'>`.
- Bottom sheets are **screens** (transparentModal) that render `<SheetLayout>`; they pass results back through redux, not via callbacks in route params.
- Sheets/screens never set `headerShown: true`; headers are drawn with `ScreenHeader`.

---

## 4. Components & screens (the most important rule)

**Screens are thin.** A screen in `src/screens/<feature>/` only: reads route params, selects redux state, dispatches thunks, navigates, and composes components. No styling beyond layout wrappers, no business logic, no raw `View/Text` trees.

**Components hold all UI.** Put them in `src/components/<group>/`:

| Folder | Contents |
|---|---|
| `common/` | Design-system primitives: `AppText`, `Button`, `Icon`, `IconButton`, `Card`, `Chip`, `ChipRow`, `SegmentedControl`, `ScreenContainer`, `ScreenHeader`, `SheetLayout`, `TextLink`, `StatusBadge`, `SectionLabel`, `Divider`, `LoadingIndicator`, `ErrorState`, `EmptyState`, `FormErrorText` |
| `form/` | `TextField`, `PasswordField`, `PinInput`, `DateField` (presentational) and Formik-bound `FormTextField`, `FormPasswordField`, `FormPinInput`, `FormDateField` |
| `auth/` | `AuthLayout`, `StepProgress`, `CompanyForm`, `EmployeeIdForm`, `PinForm`, `PasswordForm`, `EmployeeIdHelpContent`, … |
| `home/` | `HomeHeader`, `GreetingHeader`, `LatestPayStubCard`, `DocumentsSection`, `DocumentTile` |
| `payStubs/` | `PayStubFilterBar`, `PayStubListItem`, `NetPayCard`, `EarningsBreakdown`, `DateRangeFilterForm` |
| `w2/` | `W2YearSelector`, `W2PreviewCard`, `W2FileCard`, `PdfViewer`, `ZoomControls` |
| `profile/` | `ProfileCard`, `AppearanceSelector`, `SettingsList`, `LogoutConfirmContent` |
| `navigation/` | `AppTabBar` |

Conventions:
1. One component per file, named export, file name = component name (`PayStubListItem.tsx`).
2. Every folder has an `index.ts` barrel; import as `import {X} from '@/components/payStubs'`.
3. A feature component may import from `../common` and `../form`, **not** from sibling feature folders. If two features need it, move it to `common/`.
4. Components are presentational: they receive data + callbacks via props. They don't dispatch or navigate (exceptions: `AppTabBar`). Forms get `onSubmit`, `loading`, `error` props; the screen dispatches.
5. Use `AppText` instead of `Text`, `Icon` instead of importing SVGs, `Button`/`IconButton` instead of raw `Pressable` for standard actions.
6. Add `accessibilityRole` / `accessibilityLabel` to every pressable that is icon-only. Minimum touch target 44pt.
7. Reuse before you create: check `common/` first.

### Adding a screen — checklist
1. Build missing components in `src/components/<group>/` (+ export in barrel).
2. Create `src/screens/<feature>/<Name>Screen.tsx`, export from the feature `index.ts` and `screens/index.ts`.
3. Add the name to `ROUTES`, the param type to `navigation/types.ts`, register in the proper navigator.
4. Add state to a slice only if it is shared or async (otherwise `useState`).

---

## 5. Styling & theming

- All colors, spacing, radii and typography come from `src/theme`. **No hard-coded hex values or magic numbers for spacing in components** (tiny one-offs like `width: 48` for an avatar are OK).
- Light/Dark/System is supported: `themeSlice.mode` (persisted) → `ThemeProvider` resolves `isDark`.
- Declare styles with `createUseStyles`:

```tsx
const useStyles = createUseStyles(({colors, spacing, radius}) => ({
  card: {backgroundColor: colors.surface, padding: spacing.lg, borderRadius: radius.lg},
}));

export const Foo = () => {
  const styles = useStyles();
  return <View style={styles.card} />;
};
```

- Use `AppText variant="…" color="…"` for typography (`display`, `title`, `heading`, `subheading`, `body`, `bodyStrong`, `caption`, `label`, `overline`, `amount`).
- Design tokens (from the PDF): background `#F6F8FB`, primary navy `#163B72`, text `#13213D`, soft chip `#E6EDF9`, danger `#C53A3A`. Add new tokens in `theme/colors.ts` for **both** palettes.
- Screens use `ScreenContainer` (safe area, background, keyboard avoiding, optional scroll, pinned `footer`).

## 6. SVG icons

- Put `name.svg` in `src/assets/icons/` using `stroke="currentColor"` / `fill="none"` on a 24×24 viewBox so it can be tinted.
- Register it in `src/assets/icons/index.ts` (`icons` map) → it becomes a valid `IconName`.
- Render with `<Icon name="download" size={20} color="primary" />`. Do not `import X from '*.svg'` in components, except multi-colour brand art (e.g. `Logo`, exported from the registry).
- Metro is configured with `react-native-svg-transformer`; `src/types/svg.d.ts` types the imports; Jest maps `.svg` to `__mocks__/svgMock.js`.

---

## 7. Redux

- One slice per domain in `src/store/slices/` using Redux Toolkit (`createSlice`, `createAsyncThunk`). Slice file exports: reducer (default), actions, thunks, and **selectors** (`selectX`). Components select via selectors, never `state.foo.bar` inline.
- Use the typed hooks `useAppDispatch` / `useAppSelector` from `@/hooks/redux`.
- Thunks call **services** (`src/api/services`) — never axios directly. Convert failures with `getErrorMessage` and `rejectWithValue(string)`.
- To avoid circular types, thunks type `state` locally (`{state: {auth: AuthState}}`) instead of importing `RootState`.
- Async state uses `RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'` + `error: string | null`.
- Persistence (`rootReducer.ts`): only `theme` and the non-sensitive `auth` wizard fields are persisted. **Tokens are never persisted in redux — they live in the OS keychain** (`utils/secureStorage`). `logout.fulfilled` resets user data slices.
- Unauthorized (401) responses trigger `logout()` through `setUnauthorizedHandler` in `store/index.ts`.

## 8. API layer

- `src/api/client.ts` is the only axios instance. Add paths in `endpoints.ts`, calls in `services/*Service.ts`.
- `config.USE_MOCKS` (in `constants/config.ts`) makes services return `api/mocks` data with simulated latency so the UI works before the backend exists. Mock PIN is `123456`; any password ≥ 8 chars logs in. Flip to `false` and verify endpoint contracts when the backend is ready.
- Services return typed domain models from `src/types/models.ts`; no `any`.

## 9. Forms & validation (Formik + Yup)

- **Every user input uses Formik with a Yup schema** from `src/validation/schemas.ts`. Error copy lives in the schema, not in components.
- Form components wrap `<Formik>` and render `Form*` fields (they read from `useFormikContext`, show errors only when touched). Pattern:

```tsx
<Formik initialValues={…} validationSchema={employeeIdSchema} onSubmit={onSubmit}>
  {({handleSubmit}) => (
    <>
      <FormTextField name="employeeId" label="Unique Employee ID" keyboardType="number-pad" />
      <Button title="Continue" loading={loading} onPress={() => handleSubmit()} />
    </>
  )}
</Formik>
```

- Server errors come from redux (`error` prop) and render with `FormErrorText` above the submit button.
- New field type → presentational component in `form/` + Formik-bound `Form*` wrapper.

## 10. Auth flow

`FindCompany (1/4) → EmployeeId (2/4) → VerifyPin (3/4) → Password (4/4)`. Answers accumulate in `authSlice`. After `submitPassword` succeeds the token is saved to the keychain and `RootNavigator` swaps to `Main`. Face ID login (`loginWithBiometrics`) reuses the stored token and only shows when the sensor is available and `biometricEnabled`. On launch `bootstrapApp` restores the token and holds the splash for `SPLASH_MIN_DURATION_MS`.

## 11. Code style

- TypeScript strict; no `any` (use `unknown` + narrowing). Props typed with a local `Props` type.
- Function components + hooks only. Prefer named exports (default export only for slice reducers and `App`).
- Prettier (`.prettierrc.js`: single quotes, no bracket spacing, trailing commas) + ESLint (`@react-native`). Run `npm run lint`, `npm run typecheck`, `npm test` before pushing.
- No `console.log` in committed code. No inline styles except truly dynamic values.
- Keep files small (< ~150 lines); split components rather than growing them.
- Comments explain *why*, not *what*. Leave `// TODO:` with context for unfinished product decisions.

## 12. Known TODOs

- Notification preferences, Privacy & security and Forgot-password flows are not in the design; their rows currently no-op / open a mailto.
- `config.API_BASE_URL` / endpoint contracts are placeholders; wire env handling (e.g. `react-native-config`) per build variant.
- Add a custom font (Inter?) in `theme/tokens.ts` once assets are provided; add app icon + `react-native-bootsplash` assets.
- Android storage permission handling for downloads on API < 29 (`utils/download.ts`).
- Unit tests: only a smoke test exists; add tests for slices, schemas and utils.

## 13. Commands

```bash
npm install                      # not run yet — deps are only declared
cd ios && bundle install && bundle exec pod install && cd ..
npm start                        # Metro
npm run ios | npm run android
npm run lint | npm run typecheck | npm test
```
