import React from "react";
import ButtonSearch from "./ButtonSearch";
import "../../index.css";

interface Props {
  children: JSX.Element | string;
}

const SearchBar: React.FC<Props> = ({ children }) => {
  return (
    <div className="relative h-10 w-full items-center justify-center">
      <div className="relative flex h-full w-full">
        <input
          type="text"
          placeholder={`${children}`}
          className="relative ml-2 h-full flex-grow rounded-l-xl pl-3"
        />
        {/* <ButtonSearch link="">🔍</ButtonSearch> */}
        <a href="" target="_blank">
          <span>
            <button className="h-full w-14 rounded-r-xl bg-orange px-2 md:w-20">
              🔍
            </button>
          </span>
        </a>
      </div>
    </div>
  );
};

export default SearchBar;
