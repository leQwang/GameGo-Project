import { useState } from "react";

import { SelectedGenreProvider } from "../components/Provider/SelectedGenreProvider";

import GenreNav from "../components/GenreNav/GenreNav";
import ReviewListing from "../components/Reviews/ReviewListing";
import Footer from "../components/Footer/Footer";
import Header from "../components/ReviewSearchBar/Header";

function GameReview() {
  const [isSidenavOpen, setIsSidenavOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  // const [activePage, setActivePage] = useState(1);
  const [renderType, setRenderType] = useState("GENRE");

  return (
    <div className="bg-custom-radial-gradient min-h-screen overflow-hidden">
      <SelectedGenreProvider>
        <Header
          setSearchValue={setSearchValue}
          setIsSidenavOpen={setIsSidenavOpen}
          setLoading={setLoading}
          setRenderType={setRenderType}
        />

        <a id="store" className="h-0 w-0"></a>
        {/* --------- store ---------- */}
        <div className="bg-custom-radial-gradient relative z-10">
          <div id="parent" className="relative mt-14 flex w-full flex-col md:mt-12 md:flex-row">
            <GenreNav
              isSidenavOpen={isSidenavOpen}
              setLoading={setLoading}
              setRenderType={setRenderType}
            />
            <ReviewListing
              searchValue={searchValue}
              loading={loading}
              setLoading={setLoading}
              renderType={renderType}
              setRenderType={setRenderType}
            />
          </div>
        </div>

        <Footer />
      </SelectedGenreProvider>
    </div>
  );
}

export default GameReview;
