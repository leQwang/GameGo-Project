import { useState } from "react";

import { SelectedGenreProvider } from "../components/Provider/SelectedGenreProvider";

import CTA from "../components/CTA/CTA";
import GenreNav from "../components/Sidenav/GenreNav";
import StoreMain from "../components/Store/StoreMain";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

function Home() {
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

        <a id="top" className="h-0 w-0"></a>
        <CTA />
        <a id="store" className="h-0 w-0"></a>
        {/* --------- store ---------- */}
        <div className="bg-custom-radial-gradient relative z-10">
          <div className="relative flex w-full flex-col md:flex-row">
            <GenreNav isSidenavOpen={isSidenavOpen}  setLoading={setLoading} setRenderType={setRenderType}/>
            <StoreMain searchValue={searchValue} loading={loading} setLoading={setLoading} renderType={renderType} setRenderType={setRenderType}/>
          </div>
        </div>

        <Footer />
      </SelectedGenreProvider>
    </div>
  );
}

export default Home;
