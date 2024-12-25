
import video from "../../public/video2.mp4";
import { Typewriter } from "react-simple-typewriter";
const AvailableCarsBanner = () => {
  return (
    <div>
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
          <p className="text-[#FF3600] font-bold text-lg">
          ★ Welcome To Car Rent
          </p>
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white dark:text-gray-100 leading-tight">
          <Typewriter
              words={["Explore Our Available Cars"]}
              loop={false}
              cursor
              cursorStyle="|"
              typeSpeed={80}
              deleteSpeed={80}
            />
         
          </h1>

          <p className="mt-4 md:mt-10 text-base md:text-lg lg:text-xl text-gray-300 dark:text-gray-400 max-w-md md:max-w-lg lg:max-w-2xl ">
          Browse through our wide selection of cars, ready to rent at affordable prices with convenient availability and locations.
          </p>

        </div>
      </div>
    </div>
  );
};

export default AvailableCarsBanner;
