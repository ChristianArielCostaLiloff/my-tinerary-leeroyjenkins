import React from "react";
import AutoToTop from "../components/AutoToTop";
import ScrollToTop from "../components/ScrollToTop";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function Layout(props) {
  return (
    <div className="base-container">
      <AutoToTop />
      <ScrollToTop/>
      <NavBar />
      {props.children}
      <Footer/>
    </div>
  );
}
