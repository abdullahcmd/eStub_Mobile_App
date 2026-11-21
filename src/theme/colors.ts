export type ThemeColors = {
  background: string;
  surface: string;
  surfaceMuted: string;
  primary: string;
  onPrimary: string;
  primarySoft: string;
  onPrimarySoft: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  inputBackground: string;
  danger: string;
  onDanger: string;
  dangerSoft: string;
  success: string;
  successSoft: string;
  overlay: string;
  skeleton: string;
};

/** Values sampled from the eStubs design PDF. */
export const lightColors: ThemeColors = {
  background: '#F6F8FB',
  surface: '#FFFFFF',
  surfaceMuted: '#EEF2F8',
  primary: '#163B72',
  onPrimary: '#FFFFFF',
  primarySoft: '#E6EDF9',
  onPrimarySoft: '#163B72',
  text: '#13213D',
  textSecondary: '#5B6B85',
  textMuted: '#8A97AD',
  border: '#E3E8F0',
  inputBackground: '#FFFFFF',
  danger: '#C53A3A',
  onDanger: '#FFFFFF',
  dangerSoft: '#FBE9E9',
  success: '#1F8A5B',
  successSoft: '#E4F4EC',
  overlay: 'rgba(19, 33, 61, 0.65)',
  skeleton: '#E3E8F0',
};

export const darkColors: ThemeColors = {
  background: '#0C1424',
  surface: '#152036',
  surfaceMuted: '#1C2A44',
  primary: '#4C7DD6',
  onPrimary: '#FFFFFF',
  primarySoft: '#1F3358',
  onPrimarySoft: '#BCD0F5',
  text: '#F2F5FA',
  textSecondary: '#A6B3CA',
  textMuted: '#7686A3',
  border: '#27364F',
  inputBackground: '#152036',
  danger: '#E5605F',
  onDanger: '#FFFFFF',
  dangerSoft: '#3A1F26',
  success: '#4CC38A',
  successSoft: '#17342A',
  overlay: 'rgba(0, 0, 0, 0.7)',
  skeleton: '#27364F',
};
