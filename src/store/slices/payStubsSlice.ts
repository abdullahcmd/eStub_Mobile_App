import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {payStubService} from '@/api/services';
import {config} from '@/constants/config';
import {PayStub, PayStubFilter, RequestStatus} from '@/types';
import {resolveFilterRange} from '@/utils/dates';
import {getErrorMessage} from '@/utils/errors';
import {logout} from './authSlice';

type PayStubsState = {
  items: PayStub[];
  page: number;
  hasMore: boolean;
  filter: PayStubFilter;
  status: RequestStatus;
  error: string | null;
  /** Cache for the detail screen. */
  detailsById: Record<string, PayStub>;
  detailStatus: RequestStatus;
};

const defaultFilter: PayStubFilter = {
  preset: '30d',
  startDate: null,
  endDate: null,
};

const initialState: PayStubsState = {
  items: [],
  page: 1,
  hasMore: false,
  filter: defaultFilter,
  status: 'idle',
  error: null,
  detailsById: {},
  detailStatus: 'idle',
};

type ThunkConfig = {rejectValue: string; state: {payStubs: PayStubsState}};
const createThunk = createAsyncThunk.withTypes<ThunkConfig>();

/** reset=true => first page (initial load / pull-to-refresh / filter change). */
export const fetchPayStubs = createThunk(
  'payStubs/fetch',
  async ({reset}: {reset: boolean}, {getState, rejectWithValue}) => {
    try {
      const {filter, page} = getState().payStubs;
      const nextPage = reset ? 1 : page + 1;
      const {from, to} = resolveFilterRange(filter);
      const result = await payStubService.list({
        page: nextPage,
        pageSize: config.PAY_STUBS_PAGE_SIZE,
        from,
        to,
      });
      return {...result, page: nextPage, reset};
    } catch (e) {
      return rejectWithValue(getErrorMessage(e));
    }
  },
  {
    // Skip "load more" while a request is in flight or nothing is left.
    condition: ({reset}, {getState}) => {
      const {status, hasMore} = getState().payStubs;
      if (status === 'loading') {
        return false;
      }
      return reset || hasMore;
    },
  },
);

export const fetchPayStubDetail = createThunk(
  'payStubs/fetchDetail',
  async (id: string, {rejectWithValue}) => {
    try {
      return await payStubService.get(id);
    } catch (e) {
      return rejectWithValue(getErrorMessage(e));
    }
  },
);

const payStubsSlice = createSlice({
  name: 'payStubs',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<PayStubFilter>) {
      state.filter = action.payload;
    },
    clearFilter(state) {
      state.filter = defaultFilter;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPayStubs.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPayStubs.fulfilled, (state, {payload}) => {
        state.status = 'succeeded';
        state.items = payload.reset
          ? payload.items
          : [...state.items, ...payload.items];
        state.page = payload.page;
        state.hasMore = payload.hasMore;
        payload.items.forEach(item => {
          state.detailsById[item.id] = item;
        });
      })
      .addCase(fetchPayStubs.rejected, (state, action) => {
        if (action.meta.condition) {
          return;
        }
        state.status = 'failed';
        state.error = action.payload ?? 'Could not load pay stubs.';
      })
      .addCase(fetchPayStubDetail.pending, state => {
        state.detailStatus = 'loading';
      })
      .addCase(fetchPayStubDetail.fulfilled, (state, {payload}) => {
        state.detailStatus = 'succeeded';
        state.detailsById[payload.id] = payload;
      })
      .addCase(fetchPayStubDetail.rejected, state => {
        state.detailStatus = 'failed';
      })
      .addCase(logout.fulfilled, () => initialState);
  },
});

export const {setFilter, clearFilter} = payStubsSlice.actions;
export default payStubsSlice.reducer;

type S = {payStubs: PayStubsState};
export const selectPayStubs = (s: S) => s.payStubs.items;
export const selectPayStubsStatus = (s: S) => s.payStubs.status;
export const selectPayStubsError = (s: S) => s.payStubs.error;
export const selectPayStubFilter = (s: S) => s.payStubs.filter;
export const selectPayStubById = (id: string) => (s: S) =>
  s.payStubs.detailsById[id];
export const selectPayStubDetailStatus = (s: S) => s.payStubs.detailStatus;
export const selectLatestPayStub = (s: S): PayStub | undefined =>
  s.payStubs.items[0];
