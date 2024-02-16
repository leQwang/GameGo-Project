import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import switchImage from "../../assets/images/switch2.png";
import unity from "../../assets/images/unityLogo.png";
import unreal from "../../assets/images/unrealLogo.png";
import cry from "../../assets/images/cryLogo.png";

function CTA() {
  return (
    <div className="relative flex min-h-screen w-screen flex-col items-start justify-center overflow-hidden">
      <div className="relative flex w-full flex-col justify-around lg:flex-row z-10">
        <div className="flyIn relative z-10 flex w-fit flex-col justify-center lg:ml-12 xl:ml-32">
          <h4 className="w-fit text-lg font-bold leading-[3rem] text-orange">
            Your favorite game listing
          </h4>
          <h1 className="text-5xl font-bold leading-[4rem] lg:w-[25rem] xl:w-[30rem] xl:text-7xl">
            Work that we produce for our clients
          </h1>
          <p className="text-xl leading-8 lg:mt-2 lg:w-[25rem] xl:mt-4 xl:w-[40rem]">
            Welcome to the ultimate destination for all your gaming experience!
            Dive into our comprehensive reviews and curated lists to discover
            your next gaming adventure.
          </p>
          <button className="w-fit rounded-full bg-orangeLight px-7 py-3 transition-all duration-200 ease-in-out text-lg font-bold hover:bg-white hover:text-orange lg:mt-4 xl:mt-12">
            Join the Community
          </button>
        </div>

        <div className="relative z-0 xl:justify-center">
          <div className="relative w-full ">
            <LazyLoadImage
              src={switchImage}
              alt="switch image"
              className={`flyInD img-rectangular z-0 h-full w-full object-contain lg:w-[30rem] xl:w-[43rem] `}
            />
            <div className="flex -translate-y-12 flex-row items-center justify-center gap-16 xl:gap-28">
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
        </div>
      </div>
      <div className="ocean z-0">
        <div className="wave"></div>
        <div className="wave wave2"></div>
      </div>
    </div>
  );
}

export default CTA;
