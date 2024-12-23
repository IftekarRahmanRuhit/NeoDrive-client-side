import { Link } from "react-router-dom";
import video from "../../public/video.mp4";

const Banner = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden max-w-screen-2xl mx-auto">
      <div className="relative w-full h-full">
        <video
          src={video}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black/50 px-4 text-center">
        <p className="text-[#FF3600] font-bold text-lg">Welcome To Car Rent</p>
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white dark:text-gray-100 leading-tight">
          Looking to save more on <br /> your rental car?
        </h1>

        <p className="mt-4 md:mt-10 text-base md:text-lg lg:text-xl text-gray-300 dark:text-gray-400 max-w-md md:max-w-lg lg:max-w-2xl ">
          Whether you’re planning a weekend getaway, a business trip, or just
          need a reliable ride for the day, we offers a wide range of vehicles
          to suit your needs.
        </p>

        <Link to="/availablecars">
          {" "}
          <button className="mt-6 px-6 py-3 font-semibold bg-gradient-to-r from-[#FF3600] to-[#ff3700d7] text-white hover:bg-gradient-to-l  duration-300 border-none rounded-lg hover:scale-105 transition-transform text-sm md:text-base lg:text-lg">
            View Available Cars
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Banner;
