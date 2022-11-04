import React, { useEffect } from "react";

export default function AutoToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return(<></>)
}
