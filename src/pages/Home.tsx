import { useEffect } from "react";
// import Header from "../components/Header/Header";
// import Sidenav from "../components/Sidenav/Sidenav";
// import { SelectedGenreProvider } from "../components/Provider/SelectedGenreProvider";
// import StoreMain from "../components/Store/StoreMain";
// import Footer from "../components/Footer/Footer";
import CTA from "../components/CTA/CTA";
import ServiceStore from "./ServiceStore";
// import {NavbarSimple} from "../components/Navbar/Navbar";

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-custom-radial-gradient overflow-hidden">
      {/* <NavbarSimple /> */}
      <CTA />
      <ServiceStore />
    </div>
  );
}

export default Home;
