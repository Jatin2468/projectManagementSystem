import axios from "axios";
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  LOGOUT,
} from "./ActionTypes";
import { API_BASE_URL } from "@/Api/api";

// ---------------- REGISTER ----------------

const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = (user) => ({
  type: REGISTER_SUCCESS,
  payload: user,
});
const registerFailure = (error) => ({
  type: REGISTER_FAILURE,
  payload: error,
});

export const register = (userData, navigate) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, {
      fullName: userData.fullName,
      email: userData.email,
      password: userData.password,
      role: "ROLE_USER",
    });

    console.log("REGISTER RESPONSE:", response.data);

    const user = response.data;

    const token = user.jwt || user.token || user.jwtToken;

    if (token) {
      localStorage.setItem("jwt", token);
    }

    dispatch(registerSuccess(user));

    // ✅ FIXED: was "/dashboard" which doesn't exist
    if (navigate) navigate("/");
  } catch (error) {
    console.log("REGISTER ERROR:", error.response?.data || error.message);
    dispatch(registerFailure(error.message));
  }
};

// ---------------- LOGIN ----------------

const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});
const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const login = (userData, navigate) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signin`, {
      email: userData.email,
      password: userData.password,
    });

    console.log("LOGIN RESPONSE:", response.data);

    const user = response.data;

    const token = user.jwt || user.token || user.jwtToken;

    if (token) {
      localStorage.setItem("jwt", token);
    }

    dispatch(loginSuccess(user));

    // ✅ FIXED: was "/dashboard" which doesn't exist
    if (navigate) navigate("/");
  } catch (error) {
    console.log("LOGIN ERROR:", error.response?.data || error.message);
    dispatch(loginFailure(error.message));
  }
};

// ---------------- GET USER ----------------

export const getUser = (token) => {
  return async (dispatch) => {
    if (!token) {
      dispatch({ type: GET_USER_FAILURE, payload: "No token" });
      return;
    }

    dispatch({ type: GET_USER_REQUEST });
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/users/profile`,
        {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 10000,
        }
      );
      dispatch({ type: GET_USER_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: GET_USER_FAILURE, payload: error.message });
    }
  };
};

// ---------------- LOGOUT ----------------

export const logout = () => {
  return async (dispatch) => {
    localStorage.removeItem("jwt");
    dispatch({ type: LOGOUT });
  };
};