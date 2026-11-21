import React from 'react';
import Pdf from 'react-native-pdf';
import {createUseStyles} from '@/theme';

type Props = {
  url: string;
  scale: number;
  onPageChanged?: (page: number, total: number) => void;
  onLoadComplete?: (total: number) => void;
  onError?: (error: object) => void;
};

const useStyles = createUseStyles(({colors, radius}) => ({
  pdf: {flex: 1, backgroundColor: colors.surface, borderRadius: radius.md},
}));

/** Thin wrapper around react-native-pdf so screens never import it directly. */
export const PdfViewer = ({url, scale, onPageChanged, onLoadComplete, onError}: Props) => {
  const styles = useStyles();
  return (
    <Pdf
      source={{uri: url, cache: true}}
      style={styles.pdf}
      scale={scale}
      minScale={1}
      maxScale={4}
      trustAllCerts={false}
      onPageChanged={onPageChanged}
      onLoadComplete={total => onLoadComplete?.(total)}
      onError={onError}
    />
  );
};
