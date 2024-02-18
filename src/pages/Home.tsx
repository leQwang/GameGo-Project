// import { useEffect } from "react";
// import Header from "../components/Header/Header";
// import Sidenav from "../components/Sidenav/Sidenav";
// import { SelectedGenreProvider } from "../components/Provider/SelectedGenreProvider";
// import StoreMain from "../components/Store/StoreMain";
// import Footer from "../components/Footer/Footer";
import CTA from "../components/CTA/CTA";
import ServiceStore from "./ServiceStore";
// import {NavbarSimple} from "../components/Navbar/Navbar";
// import FlyInImage from "../components/Temp/FlyInImage";

function Home() {

  return (
    <div className="bg-custom-radial-gradient overflow-hidden">
      {/* <NavbarSimple /> */}
      <CTA />
      <ServiceStore />
      {/* <FlyInImage /> */}
      {/* <Footer /> */}
    </div>
  );
}

export default Home;
