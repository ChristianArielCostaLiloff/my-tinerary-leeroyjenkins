import axios from "axios";
import React, { useRef } from "react";
import Swal from "sweetalert2";
import GoogleButton from "../components/GoogleButton";
import InputFormSign from "../components/InputFormSign";
import apiUrl from "../url";

export default function SingUp() {
  const name = useRef(null);
  const lastName = useRef(null);
  const age = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const passwordConfirmation = useRef(null);
  const photo = useRef(null);

  let handleSubmit = async (event) => {
    event.preventDefault();
    let profile = {
      name: name.current.value,
      lastName: lastName.current.value,
      role: "user",
      photo: photo.current.value,
      age: age.current.value,
      email: email.current.value,
      password: password.current.value,
    };
    if (profile.password !== passwordConfirmation.current.value) {
      Swal.fire("Warning!", "Your password doesn't match", "error");
    } else {
      await axios
        .post(`${apiUrl}/api/auth/signup`, profile)
        .then((res) => {
          if (res.data.success) {
            Swal.fire("All correct!", "User has been created", "success").then(
              (result) => {
                if (result.isConfirmed) {
                  event.target.reset();
                }
              }
            );
          } else {
            Swal.fire(
              "Correct the following fields",
              res.data.message.join("<br>"),
              "error"
            );
          }
        })
        .catch((error) => {
          Swal.fire(
            "Something went wrong!",
            error.response.data.message,
            "error"
          );
        });
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
                Name
              </InputFormSign>
              <InputFormSign
                text="Enter your Last Name"
                reference={lastName}
                type="text"
              >
                Last Name
              </InputFormSign>
              <InputFormSign
                text="Enter your age"
                reference={age}
                type="number"
              >
                Age
              </InputFormSign>
              <InputFormSign
                text="Enter your email"
                reference={email}
                type="text"
              >
                Email
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
              <InputFormSign text="Photo url" reference={photo} type="text">
                Photo
              </InputFormSign>
            </div>
            <div className="button">
              <input
                type="submit"
                id="btn-submit"
                value="Register"
              />
            </div>
            <GoogleButton>Sign in with Google</GoogleButton>
          </form>
        </div>
      </div>
    </div>
  );
}
