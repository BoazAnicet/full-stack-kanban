import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./postsService";

const initialState = {
  posts: [],
  post: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new post
export const createPost = createAsyncThunk("posts/create", async (post, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await postService.createPost(post, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

// Fetch one post by id
export const fetchPost = createAsyncThunk("post/fetch", async (post_id, thunkAPI) => {
  try {
    return await postService.fetchPost(post_id);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Fetch all posts
export const fetchPosts = createAsyncThunk("posts/fetchAll", async (_, thunkAPI) => {
  try {
    return await postService.fetchPosts();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

// Update one post by id
export const editPost = createAsyncThunk("post/edit", async (post, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;

    return await postService.editPost(post, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Delete post
export const deletePost = createAsyncThunk("post/delete", async (post_id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;

    return await postService.deletePost(post_id, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = state.posts.filter((el) => el._id != action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(fetchPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.post = action.payload;
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(editPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.post = action.payload;
        state.posts.splice(
          state.posts.map((el) => el._id).indexOf(action.payload._id),
          1,
          action.payload
        );
      })
      .addCase(editPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = postsSlice.actions;
export default postsSlice.reducer;
