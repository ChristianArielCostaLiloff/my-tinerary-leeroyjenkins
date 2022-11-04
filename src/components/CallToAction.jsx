import React from 'react'
import { Link as  LinkRouter } from "react-router-dom";

export default function CallToAction(props) {
  let {style, path} = props;
  return (
    <LinkRouter to={path} className={style}>
      {props.children}
    </LinkRouter>
  )
}
