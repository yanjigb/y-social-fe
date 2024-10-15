import Global from "../../constant/global";
import userService from "../../services/user.service";
import {
  loginStart,
  loginSuccess,
  loginFailed,
  registerStart,
  registerSuccess,
  registerFailed,
  logoutStart,
  logoutSuccess,
  logoutFailed,
} from "../authSlice";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await userService.loginUser(user);
    dispatch(loginSuccess(res.data));
    if (
      res.data?.data.isVerifyEmail ||
      res.data?.data._id === Global.ADMIN_ID
    ) {
      navigate("/");
    }
    return res.data;
  } catch (error) {
    dispatch(loginFailed());
    console.error(error);
  }
};

export const registerUser = async (user, dispatch) => {
  dispatch(registerStart());
  try {
    const res = await userService.createUser(user);
    dispatch(registerSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(registerFailed());
    console.error(error);
  }
};

export const logout = async (dispatch, navigate) => {
  dispatch(logoutStart());
  try {
    dispatch(logoutSuccess());
    navigate("/");
  } catch (error) {
    dispatch(logoutFailed());
    console.error(error);
  }
};
