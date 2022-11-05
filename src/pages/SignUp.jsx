import React, { useRef } from "react";
import GoogleButton from "../components/GoogleButton";
import InputFormSign from "../components/InputFormSign";

export default function SingUp() {
  let form = useRef(null);

  let signUp = () => {
    let profile = {
      name: document.getElementById("name").value,
      username: document.getElementById("username").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      password: document.getElementById("password").value,
      passwordConfirmation: document.getElementById("password-confirmation")
        .value,
      gender: document.querySelector("input[name='gender']:checked").value,
    };
    if (profile.password != profile.passwordConfirmation) {
      alert("Password confirmation not match");
    } else {
      console.log(profile);
      localStorage.setItem("profile", JSON.stringify(profile));
      alert("You Sing Up successfully");
    }
    window.location.reload(true);
  };
  return (
    <div className="page--sing-up">
      <div className="container">
        <div className="title">Registration</div>
        <div className="content">
          <form onSubmit={signUp} ref={form}>
            <div className="user-details">
              <InputFormSign text="Enter your name" id="name" type="text">
                Full Name
              </InputFormSign>
              <InputFormSign text="Enter your username" id="username" type="text">
                Username
              </InputFormSign>
              <InputFormSign text="Enter your email" id="email" type="text">
                Email
              </InputFormSign>
              <InputFormSign text="Enter your number" id="phone" type="text">
                Phone Number
              </InputFormSign>
              <InputFormSign text="Enter your password" id="password" type="password">
                Password
              </InputFormSign>
              <InputFormSign
                text="Confirm your password"
                id="password-confirmation" type="password"
              >
                Confirm Password
              </InputFormSign>
            </div>
            <div className="gender-details">
              <input type="radio" name="gender" id="dot-1" value="Male" />
              <input type="radio" name="gender" id="dot-2" value="Female" />
              <input type="radio" name="gender" id="dot-3" value="Undeclared" />
              <span className="gender-title">Gender</span>
              <div className="category">
                <label htmlFor="dot-1">
                  <span className="dot one"></span>
                  <span className="gender">Male</span>
                </label>
                <label htmlFor="dot-2">
                  <span className="dot two"></span>
                  <span className="gender">Female</span>
                </label>
                <label htmlFor="dot-3">
                  <span className="dot three"></span>
                  <span className="gender">Prefer not to say</span>
                </label>
              </div>
            </div>
            <div className="button">
              <input type="submit" id="btn-submit" value="Register" />
            </div>
            <GoogleButton>
              Sign in with Google
            </GoogleButton>
          </form>
        </div>
      </div>
    </div>
  );
}
