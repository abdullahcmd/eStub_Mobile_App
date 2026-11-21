import React, {useState} from 'react';
import {View} from 'react-native';
import {AppText, ErrorState, ScreenContainer, ScreenHeader} from '@/components/common';
import {PdfViewer, ZoomControls} from '@/components/w2';
import {useAppSelector} from '@/hooks/redux';
import {useDocumentActions} from '@/hooks/useDocumentActions';
import type {RootStackScreenProps} from '@/navigation/types';
import {selectW2ById} from '@/store/slices/w2Slice';
import {createUseStyles} from '@/theme';

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const STEP = 0.25;

const useStyles = createUseStyles(({spacing}) => ({
  viewer: {flex: 1, marginVertical: spacing.md},
  caption: {marginBottom: spacing.md},
}));

export const W2ViewerScreen = ({route, navigation}: RootStackScreenProps<'W2Viewer'>) => {
  const styles = useStyles();
  const document = useAppSelector(selectW2ById(route.params.documentId));
  const [scale, setScale] = useState(1);
  const [page, setPage] = useState({current: 1, total: document?.pages ?? 1});
  const {download, openExternally} = useDocumentActions();

  if (!document) {
    return (
      <ScreenContainer>
        <ScreenHeader title="W-2" onBack={navigation.goBack} />
        <ErrorState message="Document not found." />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer edges={['top', 'bottom', 'left', 'right']}>
      <ScreenHeader
        title={`W-2 — ${document.year}`}
        onBack={navigation.goBack}
        rightIcon="open-external"
        rightLabel="Open in another app"
        onRightPress={() => openExternally(document.pdfUrl, document.fileName)}
      />
      <View style={styles.viewer}>
        <PdfViewer
          url={document.pdfUrl}
          scale={scale}
          onLoadComplete={total => setPage(p => ({...p, total}))}
          onPageChanged={(current, total) => setPage({current, total})}
        />
      </View>
      <AppText variant="caption" color="textSecondary" align="center" style={styles.caption}>
        Page {page.current} of {page.total}  •  Pinch to zoom
      </AppText>
      <ZoomControls
        zoomPercent={Math.round(scale * 100)}
        onZoomIn={() => setScale(s => Math.min(MAX_SCALE, s + STEP))}
        onZoomOut={() => setScale(s => Math.max(MIN_SCALE, s - STEP))}
        onDownload={() => download(document.pdfUrl, document.fileName)}
      />
    </ScreenContainer>
  );
};
