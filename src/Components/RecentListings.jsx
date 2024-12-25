import axios from "axios";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaCalendarAlt, FaClipboardList, FaMapMarkerAlt } from "react-icons/fa";

import { formatDistanceToNowStrict } from 'date-fns';
import { Link } from "react-router-dom";

const RecentListings = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });

    const fetchCars = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/latest-cars`
        );
        setCars(data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, []);

  return (
    <div className="bg-[#191919] max-w-screen-2xl mx-auto pb-16">
      <div>
        <div className="p-10 pt-20">
          <p className="text-4xl font-bold text-center mb-4 text-[#ff3700d7] animate__animated animate__backInUp">
            Discover the Latest Arrivals
          </p>
          <p className="font-medium text-gray-300 text-center animate__animated animate__backInUp ">
            Explore our newly added vehicles, handpicked for your comfort and
            style. <br /> Book your favorite ride today!
          </p>
        </div>
      </div>
      <div className="w-11/12 mx-auto md:p-10 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car, index) => (
            <div
              key={car._id}
              data-aos="fade-up"
              data-aos-delay={index * 100} // Adds delay for a staggered animation
              className=" relative rounded-lg p-4 shadow-xl cursor-pointer hover:shadow-2xl bg-black transition"
            >
              {/* Price Badge */}
              <div className="absolute top-4 right-4 bg-[#FF3600] text-white font-bold px-3 py-2">
                ${car.dailyRentalPrice}/Day
              </div>

              {/* Car Image */}
              <img
                src={car.image}
                alt={car.carModel}
                className="hover:scale-105 transition-transform w-full h-48 object-cover rounded-md mb-4"
              />

              {/* Car Details */}
              <div className="flex flex-col justify-between">
                <h3 className="text-2xl font-semibold mb-2 text-[#FF3600]">
                  {car.carModel}
                </h3>

                {/* Availability */}
                <p className="flex items-center text-base-300">
                  <FaCalendarAlt className="mr-2 text-blue-500" />
                  <strong>Date Posted:</strong>{" "}
                  <span className="ml-2">
                  {formatDistanceToNowStrict(new Date(car.dateAdded), { addSuffix: true })}
                  </span>
                </p>

                {/* Booking Count */}
                <p className="flex items-center text-base-300">
                  <FaClipboardList className="mr-2 text-green-500" />
                  <strong>Booking Count:</strong>{" "}
                  <span className="ml-1">{car.bookingCount}</span>
                </p>

                {/* Location */}
                <p className="flex items-center text-base-300">
                  <FaMapMarkerAlt className="mr-2 text-red-500" />
                  <strong>Location:</strong>{" "}
                  <span className="ml-1">{car.location}</span>
                </p>

                <Link to={`/cardetails/${car._id}`}>
                  <button className="bg-gradient-to-r from-[#FF3600] to-[#ff3700d7] text-white hover:bg-gradient-to-l font-semibold mt-4 px-4 py-2 rounded-lg w-full">
                    Rent Now
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentListings;
