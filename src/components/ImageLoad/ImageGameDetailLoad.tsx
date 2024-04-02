import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface ImageDetail {
  imageLink: string;
}

function ImageGameDetailLoad({ imageLink }: ImageDetail) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <LazyLoadImage
        src={imageLink}
        className={`${imageLoaded ? "h-full object-cover" : "h-0"} w-full overflow-hidden rounded-t-xl`}
        effect="blur"
        onLoad={handleImageLoad}
        style={{ aspectRatio: "16/9" }} // Set aspect ratio if needed
      />

      {!imageLoaded && (
        <div
          className="animated-background-screenshots h-full w-full rounded-xl"
          style={{ aspectRatio: "16/9" }}
        >
          <div className="background-masker"></div>
        </div>
      )}
      {/* <div className="animated-background-screenshots h-full">
        <div className="background-masker"></div>
      </div> */}
    </div>
  );
}

export default ImageGameDetailLoad;
