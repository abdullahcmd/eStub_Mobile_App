import React from 'react';
import {View} from 'react-native';
import {createUseStyles} from '@/theme';
import {AppText} from '../common';
import {DocumentTile} from './DocumentTile';

type Props = {onPayStubsPress: () => void; onW2Press: () => void};

const useStyles = createUseStyles(({spacing}) => ({
  wrap: {gap: spacing.md, marginTop: spacing.xl},
  row: {flexDirection: 'row', gap: spacing.md},
}));

export const DocumentsSection = ({onPayStubsPress, onW2Press}: Props) => {
  const styles = useStyles();
  return (
    <View style={styles.wrap}>
      <AppText variant="subheading">Documents</AppText>
      <View style={styles.row}>
        <DocumentTile
          icon="pay-stubs"
          title="Pay Stubs"
          description="View and download pay statements"
          onPress={onPayStubsPress}
        />
        <DocumentTile
          icon="w2"
          title="W-2 Forms"
          description="Access annual tax documents"
          onPress={onW2Press}
        />
      </View>
    </View>
  );
};
