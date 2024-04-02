// import { useState } from "react";
import logoImage from "../../assets/images/Logo1.png";

function Header({
  setSearchValue,
  setIsSidenavOpen,
  setLoading,
  setRenderType,
}: any) {
  // const [inputValue, setInputValue] = useState("");
  const searchBarValue = document.getElementById("headerSearchInput") as HTMLInputElement;

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

  return (
    <div className="fixed top-0 z-50 my-2 flex h-12 w-full items-center justify-start px-2 md:px-4">
      <img
        src={logoImage}
        className="logo react hidden h-12 cursor-pointer md:block"
        alt="React logo"
        onClick={handleScrollTop}
      />
      <div
        className="bg-vBlue flex h-10 w-10 items-center justify-center rounded-md bg-orange px-5 font-bold text-white md:hidden"
        onClick={handleToggleNav}
      >
        ☰
      </div>

      {/* ---------- Search Bar ------------- */}
      <div className="relative h-10 w-full items-center justify-center">
        <div className="relative flex h-full w-full">
          <input
            id="headerSearchInput"
            type="text"
            placeholder="Find 100,000 plus games"
            className="relative ml-2 h-full flex-grow rounded-l-xl pl-3"
            // onChange={handleInputChange}
          />
          {/* <ButtonSearch link="">🔍</ButtonSearch> */}
          <span>
            <button
              className="h-full w-14 rounded-r-xl bg-orange px-2 md:w-20"
              onClick={() => {
                handleSearch();
              }}
            >
              🔍
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Header;