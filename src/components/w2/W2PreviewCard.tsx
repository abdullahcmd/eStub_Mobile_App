import React from 'react';
import {Pressable} from 'react-native';
import {createUseStyles} from '@/theme';
import {AppText, Card} from '../common';
import {DocumentPlaceholder} from './DocumentPlaceholder';

type Props = {onPress: () => void};

const useStyles = createUseStyles(({spacing}) => ({
  card: {gap: spacing.md, alignItems: 'center'},
}));

export const W2PreviewCard = ({onPress}: Props) => {
  const styles = useStyles();
  return (
    <Pressable accessibilityRole="button" accessibilityLabel="Open full document" onPress={onPress}>
      <Card style={styles.card}>
        <DocumentPlaceholder title="W-2" />
        <AppText variant="caption" color="textSecondary">
          Tap to open full document
        </AppText>
      </Card>
    </Pressable>
  );
};
