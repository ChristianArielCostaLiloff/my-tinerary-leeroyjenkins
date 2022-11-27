import React from "react";
import { useSelector } from "react-redux";
import CallToAction from "./CallToAction";

export default function NavBar() {
  let { logged, role } = useSelector((store) => store.userReducer);
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
                <CallToAction path="/hotels" style="menu--vertical-element">
                  Hotels
                </CallToAction>
              </li>
            </ul>
          </li>
          {!logged && (
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
          )}
          {logged && (
            <>
              <li>
                <p className="menu--horizontal-element">Admin</p>
                <ul className="menu--vertical">
                  <li>
                    <CallToAction
                      path="/newcity"
                      style="menu--vertical-element"
                    >
                      New City
                    </CallToAction>
                  </li>
                  <li>
                    <CallToAction
                      path="/newhotel"
                      style="menu--vertical-element"
                    >
                      New Hotel
                    </CallToAction>
                  </li>
                </ul>
              </li>
              <li>
                <p className="menu--horizontal-element">Edit</p>
                <ul className="menu--vertical">
                  <li>
                    <CallToAction
                      path="/cities/6370096b26cecde13c02e04c"
                      style="menu--vertical-element"
                    >
                      City
                    </CallToAction>
                  </li>
                  <li>
                    <CallToAction
                      path="/hotels/6370096b26cecde13c02e04c"
                      style="menu--vertical-element"
                    >
                      Hotel
                    </CallToAction>
                  </li>
                  <li>
                    <CallToAction
                      path="/itinerary/6370096b26cecde13c02e04c"
                      style="menu--vertical-element"
                    >
                      Itinerary
                    </CallToAction>
                  </li>
                  <li>
                    <CallToAction
                      path="/shows/6370096b26cecde13c02e04c"
                      style="menu--vertical-element"
                    >
                      Show
                    </CallToAction>
                  </li>
                </ul>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="hamburger-menu">
        <input id="menu__toggle" type="checkbox" />
        <label className="menu__btn" htmlFor="menu__toggle">
          <span></span>
        </label>
        <ul className="menu__box">
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
            <CallToAction path="/signin" style="menu__item">
              Sign in
            </CallToAction>
          </li>
          <li>
            <CallToAction
              path="/cities/6370096b26cecde13c02e04c"
              style="menu__item"
            >
              Edit City
            </CallToAction>
          </li>
          <li>
            <CallToAction
              path="/itinerary/6370096b26cecde13c02e04c"
              style="menu__item"
            >
              Edit Itinerary
            </CallToAction>
          </li>
          <li>
            <CallToAction
              path="/hotels/6370096b26cecde13c02e04c"
              style="menu__item"
            >
              Edit Hotel
            </CallToAction>
          </li>
          <li>
            <CallToAction
              path="/shows/6370096b26cecde13c02e04c"
              style="menu__item"
            >
              Edit Show
            </CallToAction>
          </li>
        </ul>
      </div>
    </nav>
  );
}
