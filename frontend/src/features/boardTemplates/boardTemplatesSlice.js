import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import boardTemplatesService from "./boardTemplatesService";

const initialState = {
  boardTemplates: [],
  isLoading: true,
  isSuccess: false,
  isError: false,
  message: "",
};

export const fetchAllTemplates = createAsyncThunk("boardTemplates/fetch", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;

    return await boardTemplatesService.fetchAllTemplates(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

const boardTemplatesSlice = createSlice({
  name: "boardTemplates",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTemplates.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllTemplates.fulfilled, (state, action) => {
        state.boardTemplates = action.payload;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(fetchAllTemplates.rejected, (state, action) => {
        state.message = action.payload;
        state.isError = true;
        state.isLoading = true;
      });
  },
});

export const { reset } = boardTemplatesSlice.actions;
export default boardTemplatesSlice.reducer;
