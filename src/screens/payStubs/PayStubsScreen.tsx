import React, {useCallback, useEffect} from 'react';
import {FlatList, RefreshControl, View} from 'react-native';
import {
  EmptyState,
  ErrorState,
  LoadingIndicator,
  ScreenContainer,
  ScreenHeader,
} from '@/components/common';
import {
  PayStubFilterBar,
  PayStubListHeader,
  PayStubListItem,
} from '@/components/payStubs';
import {ROUTES} from '@/constants/routes';
import {useAppDispatch, useAppSelector} from '@/hooks/redux';
import type {MainTabScreenProps} from '@/navigation/types';
import {
  fetchPayStubs,
  selectPayStubFilter,
  selectPayStubs,
  selectPayStubsError,
  selectPayStubsStatus,
  setFilter,
} from '@/store/slices/payStubsSlice';
import {createUseStyles, useTheme} from '@/theme';
import {PayStubFilterPreset} from '@/types';

const useStyles = createUseStyles(({layout, spacing}) => ({
  header: {paddingHorizontal: layout.screenPadding},
  list: {paddingHorizontal: layout.screenPadding, paddingBottom: spacing.xxl, gap: spacing.md},
  flex: {flex: 1},
}));

export const PayStubsScreen = ({navigation}: MainTabScreenProps<'PayStubs'>) => {
  const styles = useStyles();
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectPayStubs);
  const status = useAppSelector(selectPayStubsStatus);
  const error = useAppSelector(selectPayStubsError);
  const filter = useAppSelector(selectPayStubFilter);

  // (Re)load whenever the filter changes — also covers the first load.
  useEffect(() => {
    dispatch(fetchPayStubs({reset: true}));
  }, [dispatch, filter]);

  const refresh = useCallback(
    () => dispatch(fetchPayStubs({reset: true})),
    [dispatch],
  );

  const onPresetChange = (preset: PayStubFilterPreset) => {
    if (preset === 'custom') {
      navigation.navigate(ROUTES.DateFilterSheet);
    } else {
      dispatch(setFilter({preset, startDate: null, endDate: null}));
    }
  };

  return (
    <ScreenContainer padded={false}>
      <View style={styles.header}>
        <ScreenHeader
          title="Pay Stubs"
          rightIcon="refresh"
          rightLabel="Refresh"
          onRightPress={refresh}
        />
      </View>
      <PayStubFilterBar
        preset={filter.preset}
        onPresetChange={onPresetChange}
        onOpenDateFilter={() => navigation.navigate(ROUTES.DateFilterSheet)}
      />
      <PayStubListHeader count={items.length} />

      {status === 'failed' && !items.length ? (
        <ErrorState message={error ?? 'Could not load pay stubs.'} onRetry={refresh} />
      ) : status === 'loading' && !items.length ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          style={styles.flex}
          data={items}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          renderItem={({item}) => (
            <PayStubListItem
              payStub={item}
              onPress={id => navigation.navigate(ROUTES.PayStubDetail, {payStubId: id})}
            />
          )}
          ListEmptyComponent={
            <EmptyState title="No statements" message="Try a different date range." />
          }
          refreshControl={
            <RefreshControl
              refreshing={status === 'loading'}
              onRefresh={refresh}
              tintColor={colors.primary}
            />
          }
          onEndReachedThreshold={0.4}
          onEndReached={() => dispatch(fetchPayStubs({reset: false}))}
        />
      )}
    </ScreenContainer>
  );
};
