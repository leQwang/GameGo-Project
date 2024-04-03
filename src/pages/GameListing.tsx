import { useState } from "react";

import { SelectedGenreProvider } from "../components/Provider/SelectedGenreProvider";

import GenreNav from "../components/GenreNav/GenreNav";
import ListingMain from "../components/Reviews/ListingMain";
import Footer from "../components/Footer/Footer";
import Header from "../components/ReviewSearchBar/Header";

function GameReview() {
  const [isSidenavOpen, setIsSidenavOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  // const [activePage, setActivePage] = useState(1);
  const [renderType, setRenderType] = useState("GENRE");

  return (
    <div className="bg-custom-radial-gradient overflow-hidden">
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
          <div className="relative mt-14 md:mt-12 flex w-full flex-col md:flex-row">
            <GenreNav
              isSidenavOpen={isSidenavOpen}
              setLoading={setLoading}
              setRenderType={setRenderType}
            />
            <ListingMain
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
