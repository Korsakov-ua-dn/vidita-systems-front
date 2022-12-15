import { createSlice, createAsyncThunk, AnyAction, PayloadAction } from "@reduxjs/toolkit";
import { articleApi, ArticleType } from "../../api";

// thunk
export const fetchAllDocuments = createAsyncThunk<ArticleType[], undefined, { rejectValue: string }>
  ("activity/GET_ALL", async (_, { rejectWithValue }) => {
    try {

      const res = Promise.all([
        articleApi.getAll("documents1"), 
        articleApi.getAll("documents2")
      ]);
      let data = (await res).flatMap(axiosResponce => axiosResponce.data);
      // сортировка по умолчанию => delivery_date
      data.sort((a, b) => new Date(a.delivery_date).getTime() - new Date(b.delivery_date).getTime())
      // data.sort((a, b) => a.qty - b.qty)
      return data;

    } catch (err) {

      return rejectWithValue("Some error occured, please try again");

    }
});


// slice
const initialState: ArticleStateType = {
  data: [],
  selected: [],
  sort: "delivery_date",
  loading: false,
  error: null,
}

const activitySlice = createSlice({
  name: "activity/GET_ONE",
  initialState,
  reducers: {
    setSort(state, action) {
      state.sort = action.payload
    },
    addArticle(state, action) {
      state.selected.push(action.payload)
    },
    removeArticle(state, action) {
      state.selected = state.selected.filter(item => item._id !== action.payload._id)
    },
    addAll(state) {
      state.selected = [...state.data]
    },
    removeAll(state) {
      state.selected = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllDocuments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllDocuments.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const actions = activitySlice.actions
export default activitySlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}

// types
type ArticleStateType = {
  data: ArticleType[]
  selected: ArticleType[]
  sort: SortType
  loading: boolean
  error: string | null
}

export type SortType = "delivery_date" | "currency" | "name" | "volume" | "qty" | "sum" | "status"
