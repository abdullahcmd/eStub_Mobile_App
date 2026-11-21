import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {createUseStyles} from '@/theme';

const useStyles = createUseStyles(({colors, spacing}) => ({
  row: {flexDirection: 'row', gap: spacing.sm},
  dot: {width: 6, height: 6, borderRadius: 3, backgroundColor: colors.border},
  active: {backgroundColor: colors.primary},
}));

/** Three-dot loading indicator shown on the splash screen. */
export const SplashDots = () => {
  const styles = useStyles();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % 3), 400);
    return () => clearInterval(id);
  }, []);

  return (
    <View style={styles.row} accessibilityLabel="Loading">
      {[0, 1, 2].map(i => (
        <View key={i} style={[styles.dot, i === active && styles.active]} />
      ))}
    </View>
  );
};
