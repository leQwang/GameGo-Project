import { useState } from "react";
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

// import { IconButton, Typography } from "@material-tailwind/react";

function Home() {
  const [isSidenavOpen, setIsSidenavOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="bg-custom-radial-gradient overflow-hidden">
      <SelectedGenreProvider>
        <Header
          setSearchValue={setSearchValue}
          setIsSidenavOpen={setIsSidenavOpen}
        />

        <a id="top" className="h-0 w-0"></a>
        <CTA />
        <a id="store" className="h-0 w-0"></a>
        <ServiceStore searchValue={searchValue} isSidenavOpen={isSidenavOpen}/>

        {/* <Typography color="white" className="font-normal" placeholder="">
          Page{" "}
          <div className="inline-flex h-full items-center rounded-md bg-white overflow-hidden text-black">
            <input type="number" placeholder="1" className="pl-5 bg-white w-20 text-center" />
            <button>🔍</button>
          </div>{" "}
          of <strong className="text-orange">10</strong>
        </Typography> */}

        <Footer />
      </SelectedGenreProvider>
    </div>
  );
}

export default Home;
