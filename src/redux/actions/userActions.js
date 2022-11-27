import { createAsyncThunk } from "@reduxjs/toolkit";
import apiUrl from "../../url";
import axios from "axios";

const login = createAsyncThunk("login", async (data) => {
  try {
    let user = await axios.post(`${apiUrl}/api/auth/signin`, data);
    if (user.data.success) {
      return {
        success: true,
        response: user.data.response,
        data: user.data,
      };
    } else {
    return {
      success: false,
      response: user .data.message,
    };
    }
  } catch (error) {
    return {
      success: false,
      response: error.response.data.message,
    };
  }
});

const reLogin = createAsyncThunk("reLogin", async (token) => {
  let headers = { headers: { Authorization: `Bearer ${token}` } };
  try {
    let user = await axios.post(
      `${apiUrl}/api/auth/token`,
      null,
      headers
    );
    return {
      success: true,
      response: {
        user: user.data.user.response,
        token,
      },
    };
  } catch (error) {
    return {
      success: false,
      response: error.response.data.message,
    };
  }
});

const userActions = {
  login,
  reLogin,
};

export default userActions;
