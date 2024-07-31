import React from "react";

const Search = () => {
  return (
    <div className="search">
      <input type="date" />
      <select name="destination" id="destination">
        <option value="" selected disabled>
          -- Destination --
        </option>
        <option value="a">A</option>
        <option value="b">B</option>
      </select>
    </div>
  );
};

export default Search;
