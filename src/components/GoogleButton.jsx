import React from 'react'

export default function GoogleButton(props) {
  return (
    <div className="gSignInWrapper">
      <div id="customBtn" className="customGPlusSignIn">
        <span className="icon"></span>
        <span className="buttonText">{props.children}</span>
      </div>
    </div>
  )
}
