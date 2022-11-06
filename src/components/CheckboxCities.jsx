import React from "react";
import { cities } from "../data/cities";

export default function CheckboxCities(props) {
  let { continent } = props;
  return (
    <>
      <input type="checkbox" name="continent" id={continent.toLowerCase()} value={continent.toLowerCase()} />
      <label htmlFor={continent.toLowerCase()}>{continent}</label>
    </>
  );
}
