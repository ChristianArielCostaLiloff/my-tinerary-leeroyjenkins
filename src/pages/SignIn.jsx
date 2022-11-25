import React from "react";
import GoogleButton from "../components/GoogleButton";
import InputFormSign from "../components/InputFormSign";

export default function SignIn() {
  let handleSubmit = () => {
    let profile = {
      user: document.getElementById("user").value,
      password: document.getElementById("pass").value,
    };
    localStorage.setItem("signIn", JSON.stringify(profile));
  };

  return (
    <>
      <div className="body">
        <div className="container">
          <div className="title">Sign In</div>
          <div className="content">
            <form onSubmit={handleSubmit}>
              <div className="user-details">
                <InputFormSign type="text" id="user" text="Enter your username">
                  Username
                </InputFormSign>
                <InputFormSign
                  type="password"
                  id="pass"
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
