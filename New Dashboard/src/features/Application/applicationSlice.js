import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import applicationService from "./applicationService";

export const adminGetAllApplications = createAsyncThunk(
  "application/getAll-admin",
  async (thunkAPI) => {
    try {
      return await applicationService.adminGetAllApplications();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const userGetAllApplications = createAsyncThunk(
  "application/getAll-user",
  async (thunkAPI) => {
    try {
      return await applicationService.userGetAllApplications();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const userDeleteApplication = createAsyncThunk(
  "application/delete",
  async (id, thunkAPI) => {
    try {
      return await applicationService.userDeleteApplication(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createApplication = createAsyncThunk(
  "application/create",
  async (data, thunkAPI) => {
    try {
      return await applicationService.createApplication(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  applications: [],
  adminApplications: [],
  userApplications: [],
  userDeletedApplications: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const applicationSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(adminGetAllApplications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(adminGetAllApplications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.adminApplications = action.payload;
      })
      .addCase(adminGetAllApplications.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(userGetAllApplications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userGetAllApplications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.userApplications = action.payload;
      })
      .addCase(userGetAllApplications.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(userDeleteApplication.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userDeleteApplication.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.userDeletedApplications = action.payload;
      })
      .addCase(userDeleteApplication.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createApplication.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createApplication.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdApplication = action.payload;
      })
      .addCase(createApplication.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default applicationSlice.reducer;
