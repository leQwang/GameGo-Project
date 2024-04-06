// import React from "react";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import switchImage from "../../assets/images/switch2.png";
import unity from "../../assets/images/unityLogo.png";
import unreal from "../../assets/images/unrealLogo.png";
import cry from "../../assets/images/cryLogo.png";
function ImageFly() {
  return (
    <div className="relative z-0 lg:w-[50%]">
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
    </div>
  );
}

export default ImageFly;
