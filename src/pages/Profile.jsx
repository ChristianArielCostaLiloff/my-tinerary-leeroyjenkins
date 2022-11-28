import axios from "axios";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import apiUrl from "../url";

export default function Profile() {
  const name = useRef(null);
  const lastName = useRef(null);
  const photo = useRef(null);
  const age = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  let { _id } = useSelector((store) => store.userReducer);
  let [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/auth/me/${_id}`)
      .then((res) => setUser(res.data.response))
      .catch((error) => console.log(error));
  }, []);

  const handleClick = async () => {
    let profile = {
      name: name.current.value,
      lastName: lastName.current.value,
      photo: photo.current.value,
      age: age.current.value,
      email: email.current.value,
      password: password.current.value,
    };
    const res = await axios.patch(`${apiUrl}/api/auth/me/${_id}`, profile);
    console.log(res);
    if (res.data.success) {
      Swal.fire("Success!", "Your profile has been updated", "success");
    }
  };
  return (
    <>
      {user && (
        <div className="base-cities profile-style">
          <form className="box_edit">
            <img className="image_edit" src={user.photo} alt="img" />
            <input
              className="input_edit"
              type="text"
              name=""
              placeholder="Name"
              defaultValue={user.name}
              ref={name}
            />
            <input
              className="input_edit"
              type="text"
              name=""
              placeholder="Last name"
              defaultValue={user.lastName}
              ref={lastName}
            />
            <input
              className="input_edit"
              type="text"
              name=""
              placeholder="Photo"
              defaultValue={user.photo}
              ref={photo}
            />
            <input
              className="input_edit"
              type="number"
              name=""
              placeholder="Age"
              defaultValue={user.age}
              ref={age}
            />
            <input
              className="input_edit"
              type="email"
              name=""
              placeholder="Email"
              defaultValue={user.email}
              ref={email}
            />
            <input
              className="input_edit"
              type="password"
              name=""
              placeholder="Password"
              ref={password}
            />
            <div className="buttons_edit">
              <button className="button_edit style_save" onClick={handleClick}>
                SAVE
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
