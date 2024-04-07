import { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";

import { ShortScreenshot } from "../../Services/RawGApi";

interface GameCardImgCarouselProps {
  shortScreenshots: ShortScreenshot[];
}

function GameCardImgCarousel({ shortScreenshots }: GameCardImgCarouselProps) {
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slides: {
        perView: 1,
        spacing: 0,
      },
    },
    [
      (slider) => {
        let interval: any;
        function startAutoSlide() {
          interval = setInterval(() => {
            if (slider) slider.next();
          }, 1200); // Adjust time 
        }

        slider.on("created", startAutoSlide);
        slider.on("destroyed", () => clearInterval(interval));
      },
    ],
  );

  // State to track loaded images count
  const [loadedImages, setLoadedImages] = useState(0);
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);

  // Handle individual image load
  const handleImageLoad = () => {
    setLoadedImages((prevCount) => prevCount + 1);
  };

  useEffect(() => {
    // Check if all images are loaded
    if (loadedImages === shortScreenshots.length) {
      setIsFullyLoaded(true);
    }
  }, [loadedImages]);

  return (
    <div className="absolute hidden h-0 w-full rounded-t-xl group-hover:block group-hover:h-48 overflow-hidden">
      <div
        className={`${!isFullyLoaded ? "h-48" : "hidden"} absolute flex justify-center items-center w-full bg-black bg-opacity-50 rounded-t-xl`}
      >
        <div className="loading-circle absolute"></div>
      </div>
      <div className="navigation-wrapper h-full">
        <div
          ref={sliderRef}
          className={`${!isFullyLoaded ? "h-0" : "h-full"} keen-slider `}
        >
          {shortScreenshots.map((screenshot, index) => (
            <div key={screenshot.id} className="keen-slider__slide h-full">
              <img
                src={screenshot.image}
                alt={`screenshot ${index}`}
                className="h-full w-full object-cover"
                onLoad={handleImageLoad}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default GameCardImgCarousel;
