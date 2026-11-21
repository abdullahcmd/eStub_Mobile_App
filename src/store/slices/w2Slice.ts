import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {w2Service} from '@/api/services';
import {RequestStatus, W2Document} from '@/types';
import {getErrorMessage} from '@/utils/errors';
import {logout} from './authSlice';

type W2State = {
  documents: W2Document[];
  selectedYear: number | null;
  status: RequestStatus;
  error: string | null;
};

const initialState: W2State = {
  documents: [],
  selectedYear: null,
  status: 'idle',
  error: null,
};

export const fetchW2Documents = createAsyncThunk<
  W2Document[],
  void,
  {rejectValue: string}
>('w2/fetch', async (_, {rejectWithValue}) => {
  try {
    return await w2Service.list();
  } catch (e) {
    return rejectWithValue(getErrorMessage(e));
  }
});

const w2Slice = createSlice({
  name: 'w2',
  initialState,
  reducers: {
    selectYear(state, action: PayloadAction<number>) {
      state.selectedYear = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchW2Documents.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchW2Documents.fulfilled, (state, {payload}) => {
        state.status = 'succeeded';
        state.documents = payload;
        if (state.selectedYear === null && payload.length) {
          state.selectedYear = Math.max(...payload.map(d => d.year));
        }
      })
      .addCase(fetchW2Documents.rejected, (state, {payload}) => {
        state.status = 'failed';
        state.error = payload ?? 'Could not load W-2 forms.';
      })
      .addCase(logout.fulfilled, () => initialState);
  },
});

export const {selectYear} = w2Slice.actions;
export default w2Slice.reducer;

type S = {w2: W2State};
export const selectW2Documents = (s: S) => s.w2.documents;
export const selectW2Status = (s: S) => s.w2.status;
export const selectSelectedYear = (s: S) => s.w2.selectedYear;
export const selectW2ById = (id: string) => (s: S) =>
  s.w2.documents.find(d => d.id === id);
export const selectSelectedW2 = (s: S): W2Document | undefined =>
  s.w2.documents.find(d => d.year === s.w2.selectedYear);
