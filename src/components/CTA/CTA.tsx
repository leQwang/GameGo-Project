import { useEffect } from "react";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

import logoImage from "../../assets/images/Logo1.png";

import ImageFly from "./ImageFly";

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

  return (
    <div className="relative flex min-h-screen w-screen flex-col items-start justify-center overflow-hidden pt-16 md:pt-14 z-0">
      <div className="relative z-10 flex w-full flex-col justify-around lg:flex-row">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: 50 }}
          animate={controls}
          className="relative z-10 mx-auto flex w-fit flex-col justify-center gap-3 px-2 md:w-[80%] lg:w-fit lg:pl-20 xl:mx-0 xl:ml-auto "
        >
          <div className="flex justify-center lg:relative lg:-left-3 lg:mb-8 lg:justify-start md:hidden">
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
          <div className="flex flex-col md:flex-row gap-2 md:gap-5">
            <button className="mx-auto w-full lg:w-fit rounded-full bg-orange px-7 py-3 text-lg font-bold transition-all duration-200 ease-in-out hover:bg-white hover:text-orange lg:mx-0 lg:mt-4 xl:mt-10">
              Get Started
            </button>
            <button className="mx-auto w-full lg:w-fit rounded-full bg-white px-7 py-3 text-lg font-bold text-black transition-all duration-200 ease-in-out hover:bg-orange hover:text-white lg:mx-0 lg:mt-4 xl:mt-10">
              Join Community
            </button>
          </div>
        </motion.div>

        {/* ------------------------------- */}
        <ImageFly />

        {/* <div className="relative z-0 lg:w-[50%]">
          <div className="relative flex w-full flex-col items-center ">
            <LazyLoadImage
              src={switchImage}
              alt="switch image"
              className={`flyInD img-rectangular z-0 mx-auto h-full w-full object-contain md:w-[70%] lg:w-[30rem] xl:w-[43rem]`}
            />
            <div className="flex -translate-y-12 flex-row items-center justify-center gap-10 md:gap-16 xl:gap-20">
              <LazyLoadImage
                src={unity}
                alt="unity logo"
                className={`flyInA z-10 h-9`}
              />

              <LazyLoadImage
                src={cry}
                alt="unreal logo"
                className={`flyInB z-10 h-28`}
              />

              <LazyLoadImage
                src={unreal}
                alt="cry engine logo"
                className={`flyInC z-10 h-20`}
              />
            </div>
          </div>
        </div> */}
      </div>
      <div className="ocean z-0">
        <div className="wave"></div>
        <div className="wave wave2"></div>
      </div>
    </div>
  );
}

export default CTA;
