import { useEffect, useRef, useState } from "react";
import "../../index.css"; // Import your Tailwind CSS file
import switchImage from "../../assets/images/switch2.png";

const FlyInImage = () => {
  const imageRef = useRef(null);
  const [isFlyIn, setIsFlyIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!isFlyIn && imageRef.current) {
        const triggerPosition = (
          imageRef.current as HTMLElement
        ).getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (triggerPosition < windowHeight) {
          setIsFlyIn(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFlyIn]);

  return (
    <div className="relative z-50 flex h-screen items-center justify-center">
      <div
        ref={imageRef}
        className={` transition-all duration-1000 ${
          isFlyIn ? "top-1/2 opacity-100" : "top-full opacity-0"
        }`}
      >
        <img
          src={switchImage}
          alt="Fly-in Image"
          className="h-auto w-64 rounded-full"
        />
      </div>
    </div>
  );
};

export default FlyInImage;
