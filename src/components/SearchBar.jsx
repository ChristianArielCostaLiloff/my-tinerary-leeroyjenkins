import React from "react";

export default function SearchBar(props) {
  let { reference , onChange } = props;
  return (
    <div className="container_searchbox">
      <div className="search_bar">
        <input type="text" placeholder="Search.." name="q" id="search-text" ref={reference} onChange={onChange}/>
        <button type="button">
          <img src="./img/search.png" />
        </button>
      </div>
    </div>
  );
}
