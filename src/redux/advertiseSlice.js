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
    updateAdvertiseImpressionsStart: (state) => {
      state.advertise.advertiseData = {};
      state.advertise.isFetching = true;
    },
    updateAdvertiseImpressionsSuccess: (state, action) => {
      state.advertise.isFetching = false;
      state.advertise.advertiseData = action.payload;
      state.advertise.success = true;
    },
    updateAdvertiseImpressionsFailed: (state) => {
      state.advertise.isFetching = false;
      state.advertise.error = true;
    },
    updateAdvertiseClicksStart: (state) => {
      state.advertise.advertiseData = {};
      state.advertise.isFetching = true;
    },
    updateAdvertiseClicksSuccess: (state, action) => {
      state.advertise.isFetching = false;
      state.advertise.advertiseData = action.payload;
      state.advertise.success = true;
    },
    updateAdvertiseClicksFailed: (state) => {
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
  updateAdvertiseImpressionsStart,
  updateAdvertiseImpressionsSuccess,
  updateAdvertiseImpressionsFailed,
  updateAdvertiseClicksStart,
  updateAdvertiseClicksSuccess,
  updateAdvertiseClicksFailed,
} = advertiseSlice.actions;

export default advertiseSlice.reducer;
