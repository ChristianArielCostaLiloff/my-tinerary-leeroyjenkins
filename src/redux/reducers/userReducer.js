import { createReducer } from "@reduxjs/toolkit";
import userActions from "../actions/userActions";
const { login, reLogin } = userActions;

const initialState = {
  user: {},
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login.fulfilled, (state, action) => {
      if (action.payload.success) {
        let { user, token } = action.payload.response;
        localStorage.setItem(
          "token",
          JSON.stringify({
            token: { user: token },
          })
        );
        return {
          ...state,
          name: user.name,
          email: user.email,
          photo: user.photo,
          logged: true,
          role: user.role,
          token: token,
        };
      } else {
        return {
          ...state,
          message: action.payload.response,
        };
      }
    })
    .addCase(reLogin.fulfilled, (state, action) => {
      const { user, token } = action.payload.response;
      if (action.payload.success) {
        return {
          ...state,
          name: user.name,
          email: user.email,
          photo: user.photo,
          logged: true,
          role: user.role,
          token: token,
        };
      } else {
        return {
          ...state,
          message: action.payload.response,
        };
      }
    });
});

export default userReducer;
