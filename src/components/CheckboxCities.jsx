import React from "react";

export default function CheckboxCities(props) {
  let { continent, reference, check } = props;
  return (
    <>
      <input
        type="checkbox"
        name="continent"
        id={continent.toLowerCase()}
        value={continent}
        ref={reference}
        checked={check}
      />
      <label htmlFor={continent.toLowerCase()}>{continent}</label>
    </>
  );
}
