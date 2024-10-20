import advertisService from "../../services/advertise.service";

import {
  getAdvertiseFailed,
  getAdvertiseStart,
  getAdvertiseSuccess,
  getTrendingAdvertiseStart,
  getTrendingAdvertiseSuccess,
  getTrendingAdvertiseFailed,
  updateAdvertiseImpressionsStart,
  updateAdvertiseImpressionsSuccess,
  updateAdvertiseImpressionsFailed,
  updateAdvertiseClicksStart,
  updateAdvertiseClicksSuccess,
  updateAdvertiseClicksFailed,
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

export const handleUpdateImpressions = async (id, dispatch) => {
  dispatch(updateAdvertiseImpressionsStart());

  try {
    const res = await advertisService.updateImpression(id);
    dispatch(updateAdvertiseImpressionsSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(updateAdvertiseImpressionsFailed());
    console.error(error);
  }
}

export const handleUpdateClicks = async (id, dispatch) => {
  dispatch(updateAdvertiseClicksStart());

  try {
    const res = await advertisService.updateImpression(id);
    dispatch(updateAdvertiseClicksSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(updateAdvertiseClicksFailed());
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
