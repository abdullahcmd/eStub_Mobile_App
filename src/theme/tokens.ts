import {Platform, TextStyle, ViewStyle} from 'react-native';

export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 48,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  pill: 999,
} as const;

/** Single place to swap in a custom font (e.g. Inter) later. */
const fontFamily = Platform.select({ios: 'System', default: 'sans-serif'});

export type TextVariant =
  | 'display'
  | 'title'
  | 'heading'
  | 'subheading'
  | 'body'
  | 'bodyStrong'
  | 'caption'
  | 'label'
  | 'overline'
  | 'amount';

export const typography: Record<TextVariant, TextStyle> = {
  display: {fontFamily, fontSize: 28, lineHeight: 34, fontWeight: '700'},
  title: {fontFamily, fontSize: 24, lineHeight: 30, fontWeight: '700'},
  heading: {fontFamily, fontSize: 20, lineHeight: 26, fontWeight: '700'},
  subheading: {fontFamily, fontSize: 16, lineHeight: 22, fontWeight: '600'},
  body: {fontFamily, fontSize: 14, lineHeight: 20, fontWeight: '400'},
  bodyStrong: {fontFamily, fontSize: 14, lineHeight: 20, fontWeight: '600'},
  caption: {fontFamily, fontSize: 12, lineHeight: 16, fontWeight: '400'},
  label: {fontFamily, fontSize: 13, lineHeight: 18, fontWeight: '600'},
  overline: {
    fontFamily,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '600',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  amount: {fontFamily, fontSize: 32, lineHeight: 38, fontWeight: '700'},
};

export const shadows: Record<'card' | 'sheet', ViewStyle> = {
  card: {
    shadowColor: '#13213D',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 2},
    elevation: 2,
  },
  sheet: {
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowRadius: 16,
    shadowOffset: {width: 0, height: -4},
    elevation: 12,
  },
};

export const layout = {
  screenPadding: spacing.xl,
  minTouchTarget: 44,
  buttonHeight: 48,
  inputHeight: 48,
  headerHeight: 56,
} as const;
