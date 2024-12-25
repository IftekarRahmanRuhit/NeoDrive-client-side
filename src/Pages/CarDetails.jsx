import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import { FaCalendarAlt, FaInfoCircle, FaStar } from "react-icons/fa";
import bg from "../../public/bg.jpg";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [car, setCar] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchCarData();
  }, [id]);

  const fetchCarData = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/cardetails/${id}`
      );
      setCar(data);
    } catch (error) {
      toast.error("Error fetching car data");
    }
  };

  const {
    carModel,
    dailyRentalPrice,
    availability,
    features = [],
    description,
    _id,
    image,
    agent,
  } = car;

  const handleBooking = () => {
    // Checking if the user is logged in
    if (!user) {
      return toast.error("Please log in to book a car.");
    }

    //  Checking if the user is attempting to book their own car
    // if (user?.email === agent?.email) {
    //   return toast.error("Action not permitted!");
    // }

    // Checking if the car is available
    if (!availability || new Date(availability) < new Date()) {
      return toast.error("This car is not currently available for booking.");
    }

    // If all validations pass, open the modal for confirmation
    setIsModalOpen(true);
  };

  const confirmBooking = async () => {
    try {
      const bookingData = {
        email: user?.email,
        carId: _id,
        carModel,
        dailyRentalPrice,
        availability,
        image,
        bookingDate: new Date().toISOString(),
        status: "Pending",
        agent: agent?.email,
      };

      await axios.post(
        `${import.meta.env.VITE_API_URL}/addbooking`,
        bookingData
      );
      toast.success("Car booked successfully!");
      setIsModalOpen(false);
      navigate("/mybookings");
    } catch (error) {
      toast.error(error?.response?.data);
    }
  };

  // Formating availability date
  const formattedAvailability = availability
    ? new Date(availability).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unavailable";

  return (
    <div>
      <div>
        <div className="relative w-full h-64 sm:h-80 lg:h-96">
          {/* Image */}
          <img
            src={bg}
            alt="Background"
            className="w-full h-full object-cover"
          />

          {/* Text Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-3xl sm:text-4xl lg:text-7xl font-bold mb-4">
                {carModel}
              </h1>
              <p className="text-sm sm:text-base lg:text-lg">
                <Link to="/" className="hover:text-[#FF3600]">
                  Home
                </Link>{" "}
                /{" "}
                <Link to="/availablecars" className="hover:text-[#FF3600]">
                  Available Cars
                </Link>{" "}
                / <span className="text-[#FF3600]">{carModel}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-8 md:p-16 bg-black ">
        <div className="flex flex-col md:flex-row bg-[#191919] rounded-lg shadow-lg overflow-hidden gap-8 items-stretch">
          {/* Left Section: Car Details */}
          <div className="p-6 md:w-1/2">
            <h1 className="text-4xl font-bold text-white mb-4">{carModel}</h1>
            <p className="text-lg font-semibold text-orange-600 mb-6">
              ${dailyRentalPrice}{" "}
              <span className="text-gray-300">/ Per Day</span>
            </p>
            <div className="space-y-4">
              <p className="flex items-center text-lg">
                <FaCalendarAlt className="mr-3 text-[#FF3600]" />
                <strong className="text-gray-300"> Availability:</strong>
                <span className="text-gray-300 ml-1">
                  {formattedAvailability}
                </span>
              </p>
              <p className="flex items-center text-lg text-wrap">
                <FaInfoCircle className="mr-3 text-[#FF3600]" />{" "}
                <strong className="text-gray-300">Description:</strong>
              </p>
              <p className="text-gray-300  ">{description}</p>
              <p className="flex items-center text-lg">
                <FaStar className="mr-3 text-[#FF3600]" />{" "}
                <strong className="text-gray-300">Features:</strong>
              </p>
              <ul className="list-disc ml-8 text-gray-300">
                {features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            {/* Book Now Button */}
            <button
              onClick={handleBooking}
              className="mt-8 px-6 py-3 bg-gradient-to-r from-[#FF3600] to-[#ff3700d7] text-white hover:bg-gradient-to-l font-semibold rounded-lg text-lg "
            >
              Book Now
            </button>
          </div>

          {/* Right Section: Car Image */}
          <div className="md:w-1/2 bg-gray-200 flex items-center">
            <img
              src={image}
              alt={carModel}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Booking Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <div className="bg-gray-300 p-6 rounded-lg shadow-lg max-w-sm w-full">
              <h2 className="text-2xl font-bold mb-4">Confirm Booking</h2>
              <p className="mb-2 font-semibold text-gray-800">Car Model: {carModel}</p>
              <p className="mb-2 font-semibold text-gray-800">Price per Day: ${dailyRentalPrice}</p>
              <p className="mb-4 font-semibold text-gray-800">Availability: {formattedAvailability}</p>
              <Link to="">
                {" "}
                <button
                  onClick={confirmBooking}
                  className="block w-full px-4 py-2  bg-gradient-to-r from-[#FF3600] to-[#ff3700d7]  hover:bg-gradient-to-l font-semibold text-white rounded-lg text-lg mb-4 "
                >
                  Confirm Booking
                </button>{" "}
              </Link>
              <button
                onClick={() => setIsModalOpen(false)}
                className="block w-full px-4 py-2 bg-gray-400 text-white rounded-lg text-lg hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarDetails;
