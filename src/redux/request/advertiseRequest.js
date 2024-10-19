import advertisService from "../../services/advertise.service";

import {
  getAdvertiseFailed,
  getAdvertiseStart,
  getAdvertiseSuccess,
  getTrendingAdvertiseStart,
  getTrendingAdvertiseSuccess,
  getTrendingAdvertiseFailed,
} from "../advertiseSlice";

export const getAllAdvertise = async (dispatch) => {
  dispatch(getAdvertiseStart());

  try {
    const res = await advertisService.getAllAdverstise();
    dispatch(getAdvertiseSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(getAdvertiseFailed());
    console.error(error);
  }
};

export const getTrendingAdvertise = async (dispatch) => {
  dispatch(getTrendingAdvertiseStart());

  try {
    const res = await advertisService.getTrendingAdverstise();
    dispatch(getTrendingAdvertiseSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(getTrendingAdvertiseFailed());
    console.error(error);
  }
};
