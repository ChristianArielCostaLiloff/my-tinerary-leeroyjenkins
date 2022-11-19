import React from "react";
import AutoToTop from "./AutoToTop";
import NavBar from "./NavBar";
import CallToAction from "./CallToAction";

export default function Home1() {
  return (
    <div className="home1">
      <div className="presentation-container">
        <div className="presentation">
          <figure className="presentation__image">
            <img src="./img/logo.png" alt="" />
          </figure>
          <div className="presentation__info">
            <div className="presentation__text">
              <h2>My Tinerary</h2>
              <p>
                Find your perfect trip, designed by insiders who know and love
                their cities!
              </p>
            </div>
            <div className="presentation__btn-container">
              <CallToAction path="/cities" style="presentation__btn">
                <div className="presentation__btn">To Cities..</div>
              </CallToAction>
              <CallToAction path="/hotels" style="presentation__btn">
                <div className="presentation__btn">To Hotels..</div>
              </CallToAction>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
