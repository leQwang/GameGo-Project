// import { useState } from "react";
import logoImage from "../../assets/images/Logo1.png";

import { IoHomeOutline, IoStorefrontOutline } from "react-icons/io5";
import { FaRegStar } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";

import { useNavigate } from "react-router-dom";

function Header({
  setSearchValue,
  setIsSidenavOpen,
  setLoading,
  setRenderType,
}: any) {
  // const [inputValue, setInputValue] = useState("");
  const searchBarValue = document.getElementById(
    "headerSearchInput",
  ) as HTMLInputElement;

  // const handleInputChange = () => {
  //   setInputValue(searchBarValue?.value || "");
  // };

  //called directly when search button is clicked
  const handleSearchChange = () => {
    setSearchValue(searchBarValue?.value || "");
  };

  const handleToggleNav = () => {
    setIsSidenavOpen((prevIsOpen: boolean) => !prevIsOpen); // Use the correct prop name
  };

  // --------------- scroll to top ----------------
  const handleScrollTop = () => {
    const targetElement = document.getElementById("store");
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      });
    }
  };

  const handleScrollStore = () => {
    const targetElement = document.getElementById("store");
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      });
    }
  };

  // --------------- search button click ----------------
  const handleSearch = () => {
    setLoading(true);

    setRenderType("SEARCH");
    handleSearchChange();
    handleScrollStore();
  };

  // -------------- add a listener click enter key perform search -------------
  // Define a debounce function
  function debounce<T extends (...args: any[]) => void>(
    func: T,
    delay: number,
  ) {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }

  document.addEventListener(
    "keydown",
    debounce((event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleSearch();
      }
    }, 400),
  );

  // document.addEventListener("keydown", (event) => {
  //   if (event.key === "Enter") {
  //     handleSearch();
  //   }
  // });

  //  ------------ navigation ----------------
  const navigate = useNavigate();

  const handleClickStore = () => {
    navigate("/store");
  };

  const handleClickReviews = () => {
    navigate("/reviews");
  };

  const handleClickHome = () => {
    navigate("/");
  };

  return (
    <div className="fixed top-0 z-50 my-0 flex h-16 w-full items-center justify-start bg-[#000000c2] px-2 md:px-4">
      <img
        src={logoImage}
        className="logo react hidden h-12 cursor-pointer md:block"
        alt="React logo"
        onClick={handleScrollTop}
      />
      <div
        className="bg-vBlue flex h-10 w-10 items-center justify-center rounded-md bg-orange px-5 font-bold text-white lg:hidden"
        onClick={handleToggleNav}
      >
        ☰
      </div>
      {/* <div
        className="bg-vBlue flex h-10 w-10 items-center justify-center px-5 text-white lg:hidden"
        onClick={handleToggleNav}
      >
        <IoHomeOutline />
      </div> */}
      <div className="hidden h-full items-center justify-center gap-3 px-1 font-bold lg:flex">
        <div
          onClick={handleClickHome}
          className="text-md cursor-pointer flex h-full items-center px-1 transition-all duration-200 ease-in-out hover:bg-orange hover:text-black"
        >
          Home
        </div>
        <div
          onClick={handleClickReviews}
          className="text-md cursor-pointer flex h-full items-center px-1 transition-all duration-200 ease-in-out hover:bg-orange hover:text-black"
        >
          Reviews
        </div>
        <div
          onClick={handleClickStore}
          className="text-md cursor-pointer flex h-full items-center px-1 transition-all duration-200 ease-in-out hover:bg-orange hover:text-black"
        >
          Store
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 px-2 lg:hidden">
        <IoHomeOutline onClick={handleClickHome} className="cursor-pointer"/>
        <FaRegStar onClick={handleClickReviews} className="cursor-pointer"/>
        <IoStorefrontOutline onClick={handleClickStore} className="cursor-pointer"/>
      </div>

      {/* ---------- Search Bar ------------- */}
      <div className="relative h-10 w-full items-center justify-center">
        <div className="relative flex h-full w-full">
          <input
            id="headerSearchInput"
            type="text"
            placeholder="Find 300,000 plus games"
            className="relative h-full flex-grow rounded-l-xl pl-3 md:ml-2"
            // onChange={handleInputChange}
          />
          {/* <ButtonSearch link="">🔍</ButtonSearch> */}
          <span>
            <button
              className="flex h-full w-14 items-center justify-center rounded-r-xl bg-orange px-2 hover:opacity-80 md:w-20"
              onClick={() => {
                handleSearch();
              }}
            >
              <FaMagnifyingGlass />
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Header;
