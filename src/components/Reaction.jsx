import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import apiUrl from "../url";

export default function Reaction({ reaction, eventType }) {
  const { _id } = useSelector((store) => store.userReducer);
  let [toggle, setToggle] = useState(reaction.userId.includes(_id));
  let [reactionsQuantity, setReactionsQuantity] = useState(reaction.quantity);

  useEffect(() => {
    getReaction();
  }, [toggle]);

  async function getReaction() {
    await axios.get(`${apiUrl}/api/reaction/${reaction._id}`);
  }

  const handleClick = async () => {
    let token = JSON.parse(localStorage.getItem("token"));
    let headers = { headers: { Authorization: `Bearer ${token.token.user}` } };
    await axios.put(
      `${apiUrl}/api/reaction?name=${reaction.name}&${eventType}Id=${
        reaction.itineraryId || reaction.showId
      }`,
      null,
      headers
    );
    if (toggle) {
      setReactionsQuantity(reactionsQuantity - 1);
    } else {
      setReactionsQuantity(reactionsQuantity + 1);
    }
    setToggle(!toggle);
  };

  return (
    <button className="btn-reaction" onClick={handleClick}>
      <img
        id="figure-reaction"
        src={toggle ? reaction.icon : reaction.iconBack}
        alt={reaction.name}
      />
      <p>{reactionsQuantity}</p>
    </button>
  );
}
