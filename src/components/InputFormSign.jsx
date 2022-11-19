import React from "react";

export default function InputFormSign(props) {
    let {text, id, type} = props
  return (
    <div className="input-box">
      <span className="details">{props.children}</span>
      <input type={type} id={id} placeholder={text} required />
    </div>
  );
}
