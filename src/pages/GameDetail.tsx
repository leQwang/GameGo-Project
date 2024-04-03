import { useEffect, useState } from "react";
// import parse from "html-react-parser";

import { useParams } from "react-router-dom";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

//interface
import {
  GameRawGGeneral,
  GameStoreLink,
  GameScreenShotRawG,
} from "../Services/RawGApi";

//services
import {
  getGameRawGById,
  getStoreLinks,
  getScreenShotRawG,
} from "../Services/RawGApi";

// components
import GameDetailInfo from "../components/GameDetail/GameDetailInfo";
import Footer from "../components/Footer/Footer";
// import GameDetailMedia from "../components/GameDetail/GameDetailMedia";
import ImageGameDetailLoad from "../components/ImageLoad/ImageGameDetailLoad";

function GameDetail() {
  const { gameId } = useParams<{ gameId: string }>();

  // ----------------- fetch game details -----------------
  const [gameData, setGameData] = useState<GameRawGGeneral | null>(null);

  const fetchGameById = async (gameID: string) => {
    try {
      const gameData = await getGameRawGById(gameID);
      if (gameData === undefined || gameData.detail === "Not found.") {
        return null;
      }
      setGameData(gameData);

      return gameData;
    } catch (error) {
      console.error("Error fetching gameList Overview details:", error);
    }
  };

  // ----------------- fetch game store link -----------------
  const [gameStoreLinks, setGameStoreLinks] = useState<GameStoreLink[] | null>(
    null,
  );

  const fetchGameStoreLink = async (gameId: string) => {
    try {
      const GameStoreLink = await getStoreLinks(gameId);
      if (GameStoreLink === undefined || GameStoreLink.length === 0) {
        return null;
      }
      setGameStoreLinks(GameStoreLink.results);

      return GameStoreLink.results;
    } catch (error) {
      console.error("Error fetching gameList Overview details:", error);
    }
  };

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

  // ----------------------- fetching --------------------------
  useEffect(() => {
    // console.log(gameId, gameId === undefined);
    if (gameId === undefined) return;
    fetchGameById(gameId);
    fetchGameStoreLink(gameId);
    fetchGameScreenShots(gameId);
  }, []);

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
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
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
    if (screenWidth < 640) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [screenWidth]);

  return (
    <div className={`relative min-h-screen overflow-hidden bg-[#221200]`}>
      <div className="absolute left-0 top-0 w-full">
        <div className="relative w-full">
          <img
            className="relative w-full"
            src={gameData?.background_image}
            alt="background image"
            loading="lazy"
          />
          <div className="gameDetail_background-desktop absolute left-0 top-0 h-full w-full"></div>
        </div>
      </div>

      <div className="relative h-full w-full">
        <div className="relative h-20 w-full"></div>
        <div className="mx-auto flex w-full flex-row md:w-1/2">
          <GameDetailInfo gameData={gameData} gameStoreLinks={gameStoreLinks} />
          {/* <GameDetailMedia /> */}
        </div>
      </div>

      <div className="relative my-10 h-full w-full">
        {gameScreenShots?.length != undefined && gameScreenShots?.length > 0 ? (
          <div
            ref={sliderRef}
            className={` ${isMobile ? "flex flex-col" : "keen-slider"}`}
          >
            {gameScreenShots?.map((screenshot, index) => {
              return (
                <div
                  key={index}
                  className={` relative ${isMobile ? "" : "keen-slider__slide"}`}
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
      <Footer />
    </div>
  );
}

export default GameDetail;
