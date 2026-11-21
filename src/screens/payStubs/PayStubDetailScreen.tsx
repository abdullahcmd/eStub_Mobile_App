import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {
  Button,
  IconButton,
  LoadingIndicator,
  ScreenContainer,
  ScreenHeader,
  SegmentedControl,
  SegmentOption,
} from '@/components/common';
import {EarningsBreakdown, NetPayCard} from '@/components/payStubs';
import {PdfViewer} from '@/components/w2';
import {useAppDispatch, useAppSelector} from '@/hooks/redux';
import {useDocumentActions} from '@/hooks/useDocumentActions';
import type {RootStackScreenProps} from '@/navigation/types';
import {
  fetchPayStubDetail,
  selectPayStubById,
} from '@/store/slices/payStubsSlice';
import {createUseStyles} from '@/theme';
import {formatPeriod} from '@/utils/format';

type Tab = 'details' | 'pdf';
const TABS: SegmentOption<Tab>[] = [
  {value: 'details', label: 'Details'},
  {value: 'pdf', label: 'PDF'},
];

const useStyles = createUseStyles(({spacing}) => ({
  gap: {gap: spacing.lg, marginTop: spacing.lg},
  pdf: {flex: 1, marginTop: spacing.lg},
  footer: {flexDirection: 'row', gap: spacing.sm},
  download: {flex: 1},
}));

export const PayStubDetailScreen = ({
  route,
  navigation,
}: RootStackScreenProps<'PayStubDetail'>) => {
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const {payStubId} = route.params;
  const payStub = useAppSelector(selectPayStubById(payStubId));
  const [tab, setTab] = useState<Tab>('details');
  const {downloading, download, openExternally} = useDocumentActions();

  useEffect(() => {
    dispatch(fetchPayStubDetail(payStubId));
  }, [dispatch, payStubId]);

  if (!payStub) {
    return (
      <ScreenContainer>
        <ScreenHeader title="Pay stub" onBack={navigation.goBack} />
        <LoadingIndicator />
      </ScreenContainer>
    );
  }

  const title = formatPeriod(payStub.periodStart, payStub.periodEnd);
  const fileName = `paystub-${payStub.periodEnd}.pdf`;

  return (
    <ScreenContainer
      scroll={tab === 'details'}
      edges={['top', 'bottom', 'left', 'right']}
      footer={
        <View style={styles.footer}>
          <Button
            title="Download PDF"
            style={styles.download}
            loading={downloading}
            onPress={() => download(payStub.pdfUrl, fileName)}
          />
          <IconButton
            icon="open-external"
            size={48}
            accessibilityLabel="Open in another app"
            onPress={() => openExternally(payStub.pdfUrl, fileName)}
          />
        </View>
      }>
      <ScreenHeader
        title={title}
        onBack={navigation.goBack}
        rightIcon="open-external"
        rightLabel="Open in another app"
        onRightPress={() => openExternally(payStub.pdfUrl, fileName)}
      />
      <SegmentedControl options={TABS} value={tab} onChange={setTab} />
      {tab === 'details' ? (
        <View style={styles.gap}>
          <NetPayCard payStub={payStub} />
          <EarningsBreakdown payStub={payStub} />
        </View>
      ) : (
        <View style={styles.pdf}>
          <PdfViewer url={payStub.pdfUrl} scale={1} />
        </View>
      )}
    </ScreenContainer>
  );
};
