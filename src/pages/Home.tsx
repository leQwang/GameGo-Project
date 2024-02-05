import React, { useState } from "react";
import Header from "../components/Header/Header";
import Sidenav from "../components/Sidenav/Sidenav";
import { SelectedGenreProvider } from "../components/Provider/SelectedGenreProvider";
import HomeMain from "../components/Main/HomeMain";
import Footer from "../components/Footer/Footer";

function Home() {
  return (
    <SelectedGenreProvider>
      <div className="absolute bg-custom-radial-gradient w-full">
        <Header />
        <div className="relative flex mt-5">
          <Sidenav />
          <HomeMain />
        </div>
        <Footer />
      </div>
    </SelectedGenreProvider>
  );
}

export default Home;
