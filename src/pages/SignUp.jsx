import React, { useRef } from "react";
import GoogleButton from "../components/GoogleButton";
import InputFormSign from "../components/InputFormSign";

export default function SingUp() {
  const name = useRef(null);
  const username = useRef(null);
  const email = useRef(null);
  const phone = useRef(null);
  const password = useRef(null);
  const passwordConfirmation = useRef(null);
  const radioMale = useRef(null);
  const radioFemale = useRef(null);
  const radioNot = useRef(null);

  const radioChecked = () => {
    if (radioMale.current.checked) {
      return radioMale.current.value;
    }
    if (radioFemale.current.checked) {
      return radioFemale.current.value;
    }
    if (radioNot.current.checked) {
      return radioNot.current.value;
    }
  };

  let handleSubmit = () => {
    let profile = {
      name: name.current.value,
      username: username.current.value,
      email: email.current.value,
      phone: phone.current.value,
      password: password.current.value,
      passwordConfirmation: passwordConfirmation.current.value,
      gender: radioChecked(),
    };
    console.log(profile);
    if (profile.password != profile.passwordConfirmation) {
      alert("Password confirmation not match");
    } else {
      localStorage.setItem("profile", JSON.stringify(profile));
      alert("You Sing Up successfully");
    }
  };


  return (
    <div className="page--sing-up">
      <div className="container">
        <div className="title">Registration</div>
        <div className="content">
          <form onSubmit={handleSubmit}>
            <div className="user-details">
              <InputFormSign
                text="Enter your name"
                reference={name}
                type="text"
              >
                Full Name
              </InputFormSign>
              <InputFormSign
                text="Enter your username"
                reference={username}
                type="text"
              >
                Username
              </InputFormSign>
              <InputFormSign
                text="Enter your email"
                reference={email}
                type="text"
              >
                Email
              </InputFormSign>
              <InputFormSign
                text="Enter your number"
                reference={phone}
                type="text"
              >
                Phone Number
              </InputFormSign>
              <InputFormSign
                text="Enter your password"
                reference={password}
                type="password"
              >
                Password
              </InputFormSign>
              <InputFormSign
                text="Confirm your password"
                reference={passwordConfirmation}
                type="password"
              >
                Confirm Password
              </InputFormSign>
            </div>
            <div className="gender-details">
              <input type="radio" name="gender" id="dot-1" value="Male" ref={radioMale}/>
              <input type="radio" name="gender" id="dot-2" value="Female" ref={radioFemale}/>
              <input
                type="radio"
                name="gender"
                id="dot-3"
                value="Undeclared"
                ref={radioNot}
              />
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
            <GoogleButton>Sign in with Google</GoogleButton>
          </form>
        </div>
      </div>
    </div>
  );
}
