import React from 'react';
import {Pressable, View} from 'react-native';
import {createUseStyles} from '@/theme';
import {AppText, Icon} from '../common';

type Props = {
  zoomPercent: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onDownload: () => void;
};

const useStyles = createUseStyles(({colors, radius, spacing, layout}) => ({
  bar: {
    height: layout.buttonHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
  },
  zoom: {flexDirection: 'row', alignItems: 'center', gap: spacing.xl},
  download: {flexDirection: 'row', alignItems: 'center', gap: spacing.xs},
}));

export const ZoomControls = ({zoomPercent, onZoomIn, onZoomOut, onDownload}: Props) => {
  const styles = useStyles();
  return (
    <View style={styles.bar}>
      <View style={styles.zoom}>
        <Pressable accessibilityRole="button" accessibilityLabel="Zoom out" hitSlop={8} onPress={onZoomOut}>
          <Icon name="minus" />
        </Pressable>
        <AppText variant="bodyStrong">{zoomPercent}%</AppText>
        <Pressable accessibilityRole="button" accessibilityLabel="Zoom in" hitSlop={8} onPress={onZoomIn}>
          <Icon name="plus" />
        </Pressable>
      </View>
      <Pressable accessibilityRole="button" style={styles.download} onPress={onDownload} hitSlop={8}>
        <Icon name="download" size={16} color="primary" />
        <AppText variant="label" color="primary">
          Download
        </AppText>
      </Pressable>
    </View>
  );
};
