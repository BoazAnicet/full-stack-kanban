import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import boardsService from "./boardsService";

const initialState = {
  boards: [],
  board: null,
  isLoading: true,
  isSuccess: false,
  isError: false,
  message: "",
};

export const createBoard = createAsyncThunk("boards/create", async (board, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;

    return await boardsService.createBoard(board, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const fetchAllBoards = createAsyncThunk("boards/fetch", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;

    return await boardsService.fetchAllBoards(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const fetchBoard = createAsyncThunk("board/fetch", async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;

    return await boardsService.fetchBoard(id, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const editBoard = createAsyncThunk("board/edit", async (board, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;

    return await boardsService.editBoard(board, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteBoard = createAsyncThunk("board/delete", async (board, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;

    return await boardsService.deleteBoard(board, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

const boardSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBoard.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        state.boards = state.boards.concat(action.payload);
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(createBoard.rejected, (state, action) => {
        state.message = action.payload;
        state.isError = true;
        state.isLoading = true;
      })
      .addCase(fetchAllBoards.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllBoards.fulfilled, (state, action) => {
        state.boards = action.payload;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(fetchAllBoards.rejected, (state, action) => {
        state.message = action.payload;
        state.isError = true;
        state.isLoading = true;
      })
      .addCase(fetchBoard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBoard.fulfilled, (state, action) => {
        state.board = action.payload;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(fetchBoard.rejected, (state, action) => {
        state.message = action.payload;
        state.isError = true;
        state.isLoading = true;
      })
      .addCase(editBoard.pending, (state, action) => {
        let updatedBoardIndex = state.boards.findIndex((b) => b._id === action.meta.arg._id);
        state.boards[updatedBoardIndex] = action.meta.arg;
        state.board = action.meta.arg;
        // state.isLoading = true;
      })
      .addCase(editBoard.fulfilled, (state, action) => {
        let updatedBoardIndex = state.boards.findIndex((b) => b._id === action.payload._id);
        state.boards[updatedBoardIndex] = action.payload;
        state.board = action.payload;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(editBoard.rejected, (state, action) => {
        state.message = action.payload;
        // state.isError = true;
        // state.isLoading = true;
      })
      .addCase(deleteBoard.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(deleteBoard.fulfilled, (state, action) => {
        state.boards = state.boards.filter((b) => b._id !== action.payload._id);
        state.board = null;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(deleteBoard.rejected, (state, action) => {
        state.message = action.payload;
        state.isError = true;
        state.isLoading = true;
      });
  },
});

export const { reset } = boardSlice.actions;
export default boardSlice.reducer;
