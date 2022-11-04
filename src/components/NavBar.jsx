import React from "react";
import CallToAction from "./CallToAction";

export default function NavBar() {
  return (
    <nav>
      <div className="nav">
        <figure className="nav__image">
          <img src="./img/logo.png" alt="" />
        </figure>
        <ul className="menu--horizontal">
          <li>
            <CallToAction path="/" style="menu--horizontal-element">
              Home
            </CallToAction>
          </li>
          <li>
            <p className="menu--horizontal-element">Places</p>
            <ul className="menu--vertical">
              <li>
                <CallToAction path="/cities" style="menu--vertical-element">
                  Cities
                </CallToAction>
              </li>
              <li>
                <CallToAction
                  path="/hotels"
                  style="menu--vertical-element"
                >
                  Hotels
                </CallToAction>
              </li>
            </ul>
          </li>
          <li>
            <p className="menu--horizontal-element">Account</p>
            <ul className="menu--vertical">
              <li>
                <CallToAction path="/signup" style="menu--vertical-element">
                  Sign up
                </CallToAction>
              </li>
              <li>
                <CallToAction path="/signin" style="menu--vertical-element">
                  Sign in
                </CallToAction>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="hamburger-menu">
        <input id="menu__toggle" type="checkbox" />
        <label class="menu__btn" for="menu__toggle">
          <span></span>
        </label>
        <ul class="menu__box">
          <li>
            <CallToAction path="/" style="menu__item">
              Home
            </CallToAction>
          </li>
          <li>
            <CallToAction path="/cities" style="menu__item">
              Cities
            </CallToAction>
          </li>
          <li>
            <CallToAction path="/hotels" style="menu__item">
              Hotels
            </CallToAction>
          </li>
          <li>
            <CallToAction path="/signin" style="menu__item" >
              Sign in
            </CallToAction>
          </li>
          <li>
            <CallToAction path="/signup" style="menu__item" >
              Sign up
            </CallToAction>
          </li>
        </ul>
      </div>
    </nav>
  );
}
