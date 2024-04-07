import {useEffect, useState} from "react";
import ImageGameDetailLoad from "../ImageLoad/ImageGameDetailLoad";

import { useKeenSlider } from "keen-slider/react";

//interface
import {
  GameScreenShotRawG,
} from "../../Services/RawGApi";

//services
import {
  getScreenShotRawG,
} from "../../Services/RawGApi";

function ScrShotCarousel({gameId}: {gameId: string}) {
  useEffect(() => {
    fetchGameScreenShots(gameId);
  },[]);

    // -------------- fetch game screenshots ------------------
    const [gameScreenShots, setGameScreenShots] = useState<
    GameScreenShotRawG[] | null
  >();

  const fetchGameScreenShots = async (gameId: string) => {
    try {
      const gameScreenShots = await getScreenShotRawG(gameId);
      if (gameScreenShots === undefined || gameScreenShots.length === 0) {
        return null;
      }
      let screenshotList: GameScreenShotRawG[] = [];
      for (let i = 0; i < gameScreenShots.results.length; i++) {
        if (gameScreenShots.results[i].image !== null) {
          screenshotList.push(gameScreenShots.results[i]);
        }
      }
      setGameScreenShots(screenshotList);
      // console.log(screenshotList);
      return screenshotList;
    } catch (error) {
      console.error("Error fetching gameList Overview details:", error);
    }
  };

  // ----------------------- slider --------------------------
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slides: {
        perView: 3,
        spacing: 15,
      },
    },
    [
      (slider) => {
        let timeout: any;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 3000);
        }
        slider.on("created", () => {
          // slider.container.addEventListener("mouseover", () => {
          //   mouseOver = true;
          //   clearNextTimeout();
          // });
          // slider.container.addEventListener("mouseout", () => {
          //   mouseOver = false;
          //   nextTimeout();
          // });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ],
  );

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
    if (screenWidth < 1023) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [screenWidth]);

  return (
    <div className="relative my-5 h-full w-full">
      {gameScreenShots?.length != undefined && gameScreenShots?.length > 0 ? (
        <div
          ref={sliderRef}
          className={`${isMobile ? "flex flex-col" : "keen-slider"}`}
        >
          {gameScreenShots?.map((screenshot, index) => {
            return (
              <div
                key={index}
                className={` relative ${isMobile ? "mx-3 my-1" : "keen-slider__slide"}`}
              >
                <ImageGameDetailLoad imageLink={screenshot.image} />
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default ScrShotCarousel;
