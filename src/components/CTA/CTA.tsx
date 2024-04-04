import { useEffect, useState } from "react";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

import logoImage from "../../assets/images/Logo1.png";

import ImageFly from "./ImageFly";
import { useNavigate } from "react-router-dom";

function CTA() {
  const controls = useAnimation();
  const imageControls = useAnimation();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        x: 0,
        transition: { delay: 0.5, duration: 1 },
      });
    }
  }, [controls, inView]);

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { delay: 0.5, duration: 1 },
      });
    }
  }, [imageControls, inView]);

  // -------------------- check if mobile --------------------
  const [isMobile, setIsMobile] = useState(false);

  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0,
  );

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenWidth < 640) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [screenWidth]);

  //  ---------------------- useNavigation ------------------
  // const navigate = useNavigate();

  const navigate = useNavigate();

  const handleClickReviews = () => {
    navigate("/reviews");
  };

  const handleClickStore = () => {
    navigate("/store");
  };

  return (
    <div className="relative z-0 flex h-screen w-screen flex-col items-start justify-center overflow-hidden pt-16 md:pt-14">
      <div className="relative z-10 flex w-full flex-col justify-around lg:flex-row">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: 50 }}
          animate={controls}
          className="relative z-10 mx-auto flex w-fit flex-col justify-center gap-3 px-2 md:w-[80%] lg:w-fit lg:pl-20 xl:mx-0 xl:ml-auto "
        >
          <div className="flex justify-center md:hidden lg:relative lg:-left-3 lg:mb-8 lg:justify-start">
            <img src={logoImage} className="logo react h-12" alt="React logo" />
          </div>
          <h4 className="w-full text-center text-lg font-bold text-orange lg:w-fit lg:text-left">
            Your favorite game listing
          </h4>
          <h1 className="text-center text-5xl font-bold md:text-5xl md:leading-[3rem] lg:w-[25rem] lg:text-left xl:w-[30rem] xl:text-7xl xl:leading-[4rem]">
            Work that we produce for our clients
          </h1>
          <p className="text-center text-xl leading-8 lg:mt-2 lg:w-[25rem] lg:text-left xl:mt-4 xl:w-[40rem]">
            Welcome to the ultimate destination for all your gaming experience!
            Dive into our comprehensive reviews and curated lists to discover
            your next gaming adventure.
          </p>

          {isMobile ? (
            <div></div>
          ) : (
            <div className="flex flex-col gap-2 md:flex-row md:gap-5">
              <button
                onClick={handleClickReviews}
                className="mx-auto w-full rounded-xl bg-orange px-7 py-3 text-lg font-bold transition-all duration-200 ease-in-out hover:bg-white hover:text-orange lg:mx-0 lg:mt-4 lg:w-fit xl:mt-10"
              >
                See Listing
              </button>
              <button onClick={handleClickStore} className="mx-auto w-full rounded-xl bg-white px-7 py-3 text-lg font-bold text-black transition-all duration-200 ease-in-out hover:bg-orange hover:text-white lg:mx-0 lg:mt-4 lg:w-fit xl:mt-10">
                Find Best Deal
              </button>
            </div>
          )}
        </motion.div>

        {/* ------------------------------- */}
        <ImageFly />
        {isMobile ? (
          <div className="mb-20 flex flex-col gap-3 md:mb-0 md:flex-row md:gap-5">
            <button
              onClick={handleClickReviews}
              className="mx-auto w-[70%] rounded-xl bg-orange px-7 py-3 text-lg font-bold transition-all duration-200 ease-in-out hover:bg-white hover:text-orange lg:mx-0 lg:mt-4 lg:w-fit xl:mt-10"
            >
              See Listing
            </button>
            <button onClick={handleClickStore} className="mx-auto w-[70%] rounded-xl bg-white px-7 py-3 text-lg font-bold text-black transition-all duration-200 ease-in-out hover:bg-orange hover:text-white lg:mx-0 lg:mt-4 lg:w-fit xl:mt-10">
              Find Best Deal
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="ocean z-0">
        <div className="wave"></div>
        <div className="wave wave2"></div>
      </div>
    </div>
  );
}

export default CTA;
