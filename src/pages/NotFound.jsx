import React from 'react'
import CallToAction from '../components/CallToAction'

export default function NotFound() {
  return (
    <>
      <div className="container_img_button" >
        <figure className="container_img_NotFound">
          <img className="img_NotFound" src="./img/page-not-found.jpg" alt="" />
        </figure>
        <div className="container_button">
          <CallToAction path="/">
            <button className="button_BackHome">BACK TO HOME!</button>
          </CallToAction>
        </div>
      </div>
    </>
  )
}
