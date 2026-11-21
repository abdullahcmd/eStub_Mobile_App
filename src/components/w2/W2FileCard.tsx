import React from 'react';
import {View} from 'react-native';
import {createUseStyles} from '@/theme';
import {W2Document} from '@/types';
import {AppText, Button, Card, IconButton} from '../common';

type Props = {
  document: W2Document;
  downloading: boolean;
  onDownload: () => void;
  onOpenExternal: () => void;
};

const useStyles = createUseStyles(({spacing}) => ({
  card: {gap: spacing.md},
  top: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
  actions: {flexDirection: 'row', gap: spacing.sm},
  download: {flex: 1},
}));

export const W2FileCard = ({document, downloading, onDownload, onOpenExternal}: Props) => {
  const styles = useStyles();
  return (
    <Card style={styles.card}>
      <View style={styles.top}>
        <AppText variant="bodyStrong">{document.fileName}</AppText>
        <AppText variant="caption" color="textMuted">
          {document.sizeLabel}
        </AppText>
      </View>
      <View style={styles.actions}>
        <Button title="Download PDF" loading={downloading} onPress={onDownload} style={styles.download} />
        <IconButton
          icon="open-external"
          size={48}
          accessibilityLabel="Open in another app"
          onPress={onOpenExternal}
        />
      </View>
    </Card>
  );
};
