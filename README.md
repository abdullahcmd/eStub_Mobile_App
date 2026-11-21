# eStubs Mobile App

React Native CLI (TypeScript) app for viewing pay stubs and W-2 forms.

- **Architecture, conventions and screen map:** see [AGENTS.md](./AGENTS.md) (required reading for contributors and AI agents).
- **Dependencies are declared but not installed.** To get started:

```bash
npm install
cd ios && bundle install && bundle exec pod install && cd ..
npm start
npm run ios   # or npm run android
```

By default the app runs against mock data (`src/constants/config.ts` → `USE_MOCKS`). In mock mode the PIN is `123456` and any password of 8+ characters signs in.
