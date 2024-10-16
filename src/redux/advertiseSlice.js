import { createSlice } from "@reduxjs/toolkit";

const advertiseSlice = createSlice({
  name: "advertise",
  initialState: {
    advertise: {
      isFetching: false,
      error: false,
      success: false,
      advertiseData: {},
    },
  },
  reducers: {
    getAdvertiseStart: (state) => {
      state.advertise = {};
      state.advertise.isFetching = true;
    },
    getAdvertiseSuccess: (state, action) => {
      state.advertise.isFetching = false;
      state.advertise.advertiseData = action.payload;
      state.advertise.success = true;
    },
    getAdvertiseFailed: (state) => {
      state.advertise.isFetching = false;
      state.advertise.error = true;
    },
    getTrendingAdvertiseStart: (state) => {
      state.advertise.advertiseData = {};
      state.advertise.isFetching = true;
    },
    getTrendingAdvertiseSuccess: (state, action) => {
      state.advertise.isFetching = false;
      state.advertise.advertiseData = action.payload;
      state.advertise.success = true;
    },
    getTrendingAdvertiseFailed: (state) => {
      state.advertise.isFetching = false;
      state.advertise.error = true;
    },
  },
});

export const {
  getAdvertiseStart,
  getAdvertiseSuccess,
  getAdvertiseFailed,
  getTrendingAdvertiseStart,
  getTrendingAdvertiseSuccess,
  getTrendingAdvertiseFailed,
} = advertiseSlice.actions;

export default advertiseSlice.reducer;
