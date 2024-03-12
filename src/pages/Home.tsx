import { useState, useEffect } from "react";
// import Header from "../components/Header/Header";
// import Sidenav from "../components/Sidenav/Sidenav";
// import { SelectedGenreProvider } from "../components/Provider/SelectedGenreProvider";
// import StoreMain from "../components/Store/StoreMain";
// import Footer from "../components/Footer/Footer";
import CTA from "../components/CTA/CTA";
import ServiceStore from "./ServiceStore";
import Footer from "../components/Footer/Footer";
import { SelectedGenreProvider } from "../components/Provider/SelectedGenreProvider";
import Header from "../components/Header/Header";

function Home() {
  // const [isSidenavOpen, setIsSidenavOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    console.log(searchValue);
  }, [searchValue]);

  return (
    <div className="bg-custom-radial-gradient overflow-hidden">
      <SelectedGenreProvider>
        <Header setSearchValue={setSearchValue} />

        <CTA />
        <ServiceStore searchValue={searchValue}/>
        <Footer />
      </SelectedGenreProvider>
    </div>
  );
}

export default Home;
