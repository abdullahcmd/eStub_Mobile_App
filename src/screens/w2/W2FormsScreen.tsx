import React, {useEffect} from 'react';
import {View} from 'react-native';
import {
  ErrorState,
  LoadingIndicator,
  ScreenContainer,
  ScreenHeader,
} from '@/components/common';
import {W2FileCard, W2PreviewCard, W2YearSelector} from '@/components/w2';
import {ROUTES} from '@/constants/routes';
import {useAppDispatch, useAppSelector} from '@/hooks/redux';
import {useDocumentActions} from '@/hooks/useDocumentActions';
import type {MainTabScreenProps} from '@/navigation/types';
import {
  fetchW2Documents,
  selectSelectedW2,
  selectSelectedYear,
  selectW2Documents,
  selectW2Status,
  selectYear,
} from '@/store/slices/w2Slice';
import {createUseStyles} from '@/theme';

const useStyles = createUseStyles(({layout, spacing}) => ({
  header: {paddingHorizontal: layout.screenPadding},
  body: {paddingHorizontal: layout.screenPadding, gap: spacing.lg, marginTop: spacing.lg},
  years: {marginTop: spacing.sm},
}));

export const W2FormsScreen = ({navigation}: MainTabScreenProps<'W2Forms'>) => {
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const documents = useAppSelector(selectW2Documents);
  const status = useAppSelector(selectW2Status);
  const selectedYear = useAppSelector(selectSelectedYear);
  const selected = useAppSelector(selectSelectedW2);
  const {downloading, download, openExternally} = useDocumentActions();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchW2Documents());
    }
  }, [dispatch, status]);

  return (
    <ScreenContainer scroll padded={false}>
      <View style={styles.header}>
        <ScreenHeader
          title="W-2 Forms"
          rightIcon="download"
          rightLabel="Download selected W-2"
          onRightPress={selected ? () => download(selected.pdfUrl, selected.fileName) : undefined}
        />
      </View>

      {status === 'failed' ? (
        <ErrorState message="Could not load W-2 forms." onRetry={() => dispatch(fetchW2Documents())} />
      ) : status === 'loading' && !documents.length ? (
        <LoadingIndicator />
      ) : (
        <>
          <View style={styles.years}>
            <W2YearSelector
              years={documents.map(d => d.year)}
              selectedYear={selectedYear}
              onSelect={year => dispatch(selectYear(year))}
            />
          </View>
          {selected ? (
            <View style={styles.body}>
              <W2PreviewCard
                onPress={() => navigation.navigate(ROUTES.W2Viewer, {documentId: selected.id})}
              />
              <W2FileCard
                document={selected}
                downloading={downloading}
                onDownload={() => download(selected.pdfUrl, selected.fileName)}
                onOpenExternal={() => openExternally(selected.pdfUrl, selected.fileName)}
              />
            </View>
          ) : null}
        </>
      )}
    </ScreenContainer>
  );
};
