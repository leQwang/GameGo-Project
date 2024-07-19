import { useState } from "react";
// import { useNavigate } from "react-router-dom";

import { GameRawGCard, ShortScreenshot } from "../../Services/RawGApi";

import "react-lazy-load-image-component/src/effects/blur.css";

// import { LazyLoadImage } from "react-lazy-load-image-component";

import { Link } from "react-router-dom";

import { FaWindows } from "react-icons/fa6";
import { IoLogoAndroid } from "react-icons/io";
import { FaLinux, FaXbox, FaPlaystation, FaApple } from "react-icons/fa";

import { SiNintendoswitch } from "react-icons/si";
import GameCardImgCarousel from "./GameCardImgCarousel";

function GameCard(gameRawG: GameRawGCard) {
  // --------------- constants ---------------
  console.log(gameRawG);

  // --------------- image loading process ---------------
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // ------------------ hover game card -----------------------
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link to={`/reviews/${gameRawG.id}`} target="_blank">
      <li
        key={gameRawG.id}
        className="xl:h-92 group relative flex h-full w-full flex-col overflow-hidden rounded-xl bg-orangeGameCard transition-all duration-100 ease-in-out hover:z-10 hover:scale-105 hover:cursor-pointer hover:overflow-visible hover:rounded-t-xl hover:shadow-lg md:hover:rounded-b-none"
        onMouseEnter={() => setIsHovered(true)}
      >
        <div className="h-48 z-0">
          <img
            src={gameRawG.background_image}
            alt={gameRawG.name}
            className={`${imageLoaded ? "h-48" : "hidden h-0"} w-full overflow-hidden rounded-t-xl`}
            onLoad={handleImageLoad} // Set onLoad event handler to update imageLoaded state
          />

          {/* For Mobile second image */}
          {/* <img
            src={
              gameRawG.short_screenshots.length > 1
                ? gameRawG.short_screenshots[1].image
                : gameRawG.background_image
            }
            alt={gameRawG.name}
            className={`relative h-0 w-full overflow-hidden rounded-t-xl group-hover:h-48 md:hidden`}
          /> */}

          {isHovered &&
          // gameRawG.short_screenshots != null &&
          // gameRawG.short_screenshots != undefined &&
          gameRawG.short_screenshots.length > 4 ? (
            <GameCardImgCarousel
              shortScreenshots={
                gameRawG.short_screenshots.slice(1, 4) as ShortScreenshot[]
              }
            />
          ) : (
            <div className="absolute top-0 left-0 hidden h-0 w-full overflow-hidden rounded-t-xl md:group-hover:block md:group-hover:h-48">
              {" "}
              <img
                src={gameRawG.background_image}
                alt={gameRawG.name}
                className={`${imageLoaded ? "h-48" : "hidden h-0"} w-full overflow-hidden rounded-t-xl`}
                onLoad={handleImageLoad} // Set onLoad event handler to update imageLoaded state
              />
            </div>
          )}

          {!imageLoaded && (
            <div className="animated-background group-hover:hidden">
              <div className="background-masker"></div>
            </div>
          )}
        </div>

        <div className="flex flex-grow flex-col px-2 pb-2">
          <div className="mt-1 flex justify-between">
            <ul className="flex items-center ">
              {gameRawG.parent_platforms?.map((parent_platform, index) => (
                <li className={`mx-1 my-2`} key={index}>
                  {Number(parent_platform.platform.id) === 1 ? (
                    <FaWindows />
                  ) : (
                    ""
                  )}
                  {Number(parent_platform.platform.id) === 2 ? (
                    <FaPlaystation />
                  ) : (
                    ""
                  )}
                  {Number(parent_platform.platform.id) === 3 ? <FaXbox /> : ""}
                  {Number(parent_platform.platform.id) === 4 ? (
                    <IoLogoAndroid />
                  ) : (
                    ""
                  )}
                  {Number(parent_platform.platform.id) === 5 ? <FaApple /> : ""}
                  {Number(parent_platform.platform.id) === 6 ? <FaLinux /> : ""}
                  {Number(parent_platform.platform.id) === 7 ? (
                    <SiNintendoswitch />
                  ) : (
                    ""
                  )}
                </li>
              ))}
            </ul>
            <div
              className={`w-fit rounded-sm border px-3 font-bold ${
                Number(gameRawG.metacritic) >= 80
                  ? "border-green-500 text-green-500"
                  : Number(gameRawG.metacritic) < 50
                    ? "border-red-500 text-red-500"
                    : "border-yellow-600 text-yellow-600"
              } ${
                Number(gameRawG.metacritic) >= 80
                  ? "group-hover:bg-green-500 group-hover:text-white"
                  : Number(gameRawG.metacritic) < 50
                    ? "group-hover:bg-red-500 group-hover:text-white"
                    : "group-hover:bg-yellow-600 group-hover:text-black"
              } ${gameRawG.metacritic === null ? "hidden" : "visible"}`}
            >
              {gameRawG.metacritic}
            </div>
          </div>

          <div className="flex flex-grow items-center font-sans text-lg font-semibold xl:text-xl">
            {gameRawG.name}
          </div>

          {/* --------------------------------------- */}
          <div className="text-md relative left-0 w-full -translate-y-[7px] bg-orangeGameCard pb-2 shadow-2xl shadow-black transition-opacity duration-200 ease-in-out group-hover:opacity-100 md:absolute md:top-[100%] md:rounded-b-xl md:px-2 md:opacity-0">
            <div className="flex justify-between">
              <span className="font-semibold">Rating: </span>
              <span>{gameRawG.rating}⭐</span>
            </div>
            <div className="h-[1px] w-full bg-orange opacity-50"></div>
            <div className="flex justify-between">
              <span className="font-semibold">Released: </span>{" "}
              <span>{gameRawG.released}</span>
            </div>
            <div className="h-[1px] w-full bg-orange opacity-50"></div>
            {gameRawG.released == null ? (
              ""
            ) : (
              <div className="flex justify-between">
                <span className="font-semibold">Rank: </span>
                <span>
                  {gameRawG.rating_top} of {gameRawG.released.slice(0, 4)}
                </span>
              </div>
            )}
            <div className="h-[1px] w-full bg-orange opacity-50"></div>
            <div className="flex flex-col justify-between">
              <div className="flex flex-grow font-semibold">Genres: </div>
              <div className="flex flex-wrap justify-end overflow-hidden">
                {gameRawG.genres.map(
                  (genre: { name: string }, index: number) => {
                    if (index < gameRawG.genres.length - 1) {
                      return (
                        <span className="hover:font-semibold " key={index}>
                          {genre.name},
                        </span>
                      );
                    } else {
                      return (
                        <span className="ps-1 hover:font-semibold" key={index}>
                          {genre.name}
                        </span>
                      );
                    }
                  },
                )}
              </div>
            </div>
          </div>
        </div>
      </li>
    </Link>
  );
}

export default GameCard;
