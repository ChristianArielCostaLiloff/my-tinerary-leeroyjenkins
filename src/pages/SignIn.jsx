import React from "react";
import { useRef } from "react";
import GoogleButton from "../components/GoogleButton";
import InputFormSign from "../components/InputFormSign";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import userActions from "../redux/actions/userActions";
import Swal from "sweetalert2";

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useRef(null);
  const pass = useRef(null);

  let handleSubmit = async (event) => {
    event.preventDefault();
    let user = {
      email: email.current.value,
      password: pass.current.value,
    };
    try {
      const res = await dispatch(userActions.login(user));
      if (res.payload.success) {
        Swal.fire(res.payload.data.message, "You are being redirected", "success").then(
          (result) => {
            if (result.isConfirmed) navigate("/");
          }
        );
      } else {
        Swal.fire(
          "Error!",
          Array.isArray(res.payload.response)
            ? res.payload.response.join("<br>")
            : res.payload.response,
          "error"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="body">
        <div className="container">
          <div className="title">Sign In</div>
          <div className="content">
            <form onSubmit={handleSubmit}>
              <div className="user-details">
                <InputFormSign
                  type="text"
                  reference={email}
                  text="Enter your email"
                >
                  Email
                </InputFormSign>
                <InputFormSign
                  type="password"
                  reference={pass}
                  text="Enter your password"
                >
                  Password
                </InputFormSign>
              </div>
              <div className="button">
                <input type="submit" value="Sign In" />
              </div>
              <GoogleButton>Sign in with Google</GoogleButton>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}




