import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import team1 from "../../public/team1.jpg"
import team2 from "../../public/team2.jpg"
import team3 from "../../public/team3.jpg"
import team4 from "../../public/team4.jpg"
import team5 from "../../public/team5.jpg"
import team6 from "../../public/team6.jpg"
import team7 from "../../public/team7.jpg"
import team8 from "../../public/team8.jpg"

const DriversSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 800, 
      once: false, 
      offset: 100, 
    });
  }, []);

  return (
    <section className="bg-[#191919]  text-white py-20 max-w-screen-2xl mx-auto">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Header Section */}
        <p className="text-[#FF3600] font-medium mb-2">★ Our Experienced Drivers</p>
        <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-16">
          Ensuring your safety and  comfort <br /> on every journey
        </h2>

        {/* Driver Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 cursor-pointer">
          {/* Card 1 */}
          <div
            className=" rounded-lg p-4 shadow-md"
            data-aos="fade-right"
          >
            <img
              src={team1}
              alt="John Smith"
              className="rounded-lg w-full mb-4 hover:scale-105 transition-transform"
            />
            <h3 className="text-lg font-semibold">John Smith</h3>
            <p className="text-sm text-gray-400">Senior Chauffeur</p>
          </div>

          {/* Card 2 */}
          <div
            className=" rounded-lg p-4 shadow-md"
            data-aos="fade-up"
            data-aos-delay="100" 
          >
            <img
              src={team2}
              alt="Taylor Smith"
              className="rounded-lg w-full mb-4 hover:scale-105 transition-transform"
            />
            <h3 className="text-lg font-semibold">Taylor Smith</h3>
            <p className="text-sm text-gray-400">City Tour Guide</p>
          </div>

          {/* Card 3 */}
          <div
            className=" rounded-lg p-4 shadow-md"
            data-aos="fade-up"
            data-aos-delay="200" 
          >
            <img
              src={team3}
              alt="Jordan Drown"
              className="rounded-lg w-full mb-4 hover:scale-105 transition-transform"
            />
            <h3 className="text-lg font-semibold">Jordan Drown</h3>
            <p className="text-sm text-gray-400">Distance Driver</p>
          </div>

          {/* Card 4 */}
          <div
            className=" rounded-lg p-4 shadow-md"
            data-aos="fade-left"
            data-aos-delay="300" 
          >
            <img
              src={team4}
              alt="Davis Casey"
              className="rounded-lg w-full mb-4 hover:scale-105 transition-transform"
            />
            <h3 className="text-lg font-semibold">Davis Casey</h3>
            <p className="text-sm text-gray-400">Travel Specialist</p>
          </div>

          {/* card-5  */}
          <div
            className=" rounded-lg p-4 shadow-md"
            data-aos="fade-right"
            data-aos-delay="300" 
          >
            <img
              src={team5}
              alt="Davis Casey"
              className="rounded-lg w-full mb-4 hover:scale-105 transition-transform"
            />
            <h3 className="text-lg font-semibold">Morgan Lee</h3>
            <p className="text-sm text-gray-400">Travel Consultant</p>
          </div>

          {/* card-6  */}
          <div
            className=" rounded-lg p-4 shadow-md"
            data-aos="fade-up"
          >
            <img
              src={team6}
              alt="Davis Casey"
              className="rounded-lg w-full mb-4 hover:scale-105 transition-transform"
            />
            <h3 className="text-lg font-semibold">Carlos Mendes</h3>
            <p className="text-sm text-gray-400">Airport Transfer</p>
          </div>

          {/* card-7  */}
          <div
            className=" rounded-lg p-4 shadow-md"
            data-aos="fade-up"
            data-aos-delay="300" 
          >
            <img
              src={team7}
              alt="Davis Casey"
              className="rounded-lg w-full mb-4 hover:scale-105 transition-transform"
            />
            <h3 className="text-lg font-semibold">Riley Walker</h3>
            <p className="text-sm text-gray-400">Executive Chauffeur</p>
          </div>

          {/* card 8 */}
          <div
            className=" rounded-lg p-4 shadow-md"
            data-aos="fade-left"
            data-aos-delay="300" 
          >
            <img
              src={team8}
              alt="Davis Casey"
              className="rounded-lg w-full mb-4 hover:scale-105 transition-transform"
            />
            <h3 className="text-lg font-semibold">Avery Hall</h3>
            <p className="text-sm text-gray-400">Shuttle Driver</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DriversSection;