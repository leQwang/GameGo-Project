import React from "react";
import ButtonSearch from "./ButtonSearch";
import "../../index.css";

interface Props {
  children: JSX.Element | string;
}

const SearchBar: React.FC<Props> = ({ children }) => {
  return (
    <div className="relative justify-center items-center w-full h-10">
      <div className="relative flex w-full h-full">
        <input
          type="text"
          placeholder={`${children}`}
          className="relative flex-grow rounded-3xl h-full px-3 mx-3"
        />
        <ButtonSearch link="">Search</ButtonSearch>
      </div>
    </div>
  );
};

export default SearchBar;
