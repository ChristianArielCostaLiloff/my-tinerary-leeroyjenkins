import React, { useRef } from 'react'
import GoogleButton from '../components/GoogleButton'
import InputFormSign from '../components/InputFormSign'

export default function SignIn() {
  let form = useRef(null);

  let signIn = () => {
    let profile = {
      user: document.getElementById("user").value,
      password: document.getElementById("pass").value
    }
    localStorage.setItem("signIn", JSON.stringify(profile))
    window.location.reload(true)
  }
  

  return (
    <>
    <div className="body">
        
    <div className="container">
        <div className="title">Sign In</div>
        <div className="content">
          <form >
            <div className="user-details">
              <InputFormSign type="text" id="user" text="Enter your username">
              Username
              </InputFormSign>
              <InputFormSign type="password" id="pass" text="Enter your password">
              Password
              </InputFormSign>
            </div>
            <div className="button">
              <input type="button" onClick={signIn} value="Sign In"/>
            </div>
            <GoogleButton>
              Sign in with Google
            </GoogleButton>
          </form>
        </div>
    </div>
    </div>
    </>
  )
}
