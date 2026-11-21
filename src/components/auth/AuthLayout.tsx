import React from 'react';
import {View} from 'react-native';
import {IconName} from '@/assets/icons';
import {createUseStyles} from '@/theme';
import {AppText, ScreenContainer, ScreenHeader} from '../common';
import {StepProgress} from './StepProgress';

type Props = {
  step: number;
  headerTitle: string;
  heading: string;
  subtitle: string;
  onBack?: () => void;
  rightIcon?: IconName;
  rightLabel?: string;
  onRightPress?: () => void;
  children: React.ReactNode;
};

const useStyles = createUseStyles(({spacing}) => ({
  intro: {marginTop: spacing.xxl, gap: spacing.sm, marginBottom: spacing.xl},
}));

/** Shared chrome of all 4 sign-in screens: header, step bar, heading, subtitle. */
export const AuthLayout = ({
  step,
  headerTitle,
  heading,
  subtitle,
  onBack,
  rightIcon,
  rightLabel,
  onRightPress,
  children,
}: Props) => {
  const styles = useStyles();
  return (
    <ScreenContainer scroll>
      <ScreenHeader
        title={headerTitle}
        onBack={onBack}
        rightIcon={rightIcon}
        rightLabel={rightLabel}
        onRightPress={onRightPress}
      />
      <StepProgress step={step} />
      <View style={styles.intro}>
        <AppText variant="title" accessibilityRole="header">
          {heading}
        </AppText>
        <AppText color="textSecondary">{subtitle}</AppText>
      </View>
      {children}
    </ScreenContainer>
  );
};
