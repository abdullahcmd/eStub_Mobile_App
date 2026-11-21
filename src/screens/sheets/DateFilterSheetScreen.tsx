import React from 'react';
import {SheetLayout} from '@/components/common';
import {DateRangeFilterForm} from '@/components/payStubs';
import {useAppDispatch, useAppSelector} from '@/hooks/redux';
import type {RootStackScreenProps} from '@/navigation/types';
import {
  clearFilter,
  selectPayStubFilter,
  setFilter,
} from '@/store/slices/payStubsSlice';

export const DateFilterSheetScreen = ({
  navigation,
}: RootStackScreenProps<'DateFilterSheet'>) => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectPayStubFilter);

  return (
    <SheetLayout title="Filter by date range" onClose={navigation.goBack}>
      <DateRangeFilterForm
        initialFilter={filter}
        onApply={next => {
          dispatch(setFilter(next));
          navigation.goBack();
        }}
        onClear={() => {
          dispatch(clearFilter());
          navigation.goBack();
        }}
      />
    </SheetLayout>
  );
};
