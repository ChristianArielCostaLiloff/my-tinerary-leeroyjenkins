import React from "react";

export default function SearchBar() {
  return (
    <div className="container_searchbox">
      <form action="" className="search_bar">
        <input type="text" placeholder="Search.." name="q" id="search-text" />
        <button type="button">
          <img src="./img/search.png" />
        </button>
      </form>
    </div>
  );
}
