import {useRef, useEffect} from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import primaryImage from "../../assets/images/horizon-poster.jpg";

function VideoBanner() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.style.zIndex = "99";
        videoRef.current.play();
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleVideoEnd = () => {
    if (videoRef.current) {
      videoRef.current.style.zIndex = "0";
    }
  };
  return (
    <div className="group relative overflow-hidden md:w-[99%] md:rounded-2xl lg:h-[27rem] 2xl:h-[28rem]">
      <LazyLoadImage
        src={primaryImage}
        alt="bg"
        className={`relative z-10 h-[25rem] w-full object-cover transition-opacity duration-200 ease-in-out md:h-full`}
        // onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleMouseLeave}
      />
      <video
        ref={videoRef}
        muted
        className="absolute top-0 h-[25rem] w-full object-cover md:h-full "
        src={
          "http://cdn.akamai.steamstatic.com/steam/apps/257007287/movie_max_vp9.webm?t=1711032973"
        }
        onEnded={handleVideoEnd}
      ></video>
    </div>
  );
}

export default VideoBanner;
