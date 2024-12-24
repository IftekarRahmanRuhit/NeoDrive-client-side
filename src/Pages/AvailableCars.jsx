import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns"; 
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaClipboardList, FaMapMarkerAlt,FaSearch, FaList, FaTh } from "react-icons/fa";

const AvailableCars = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [viewType, setViewType] = useState("grid"); 

  useEffect(() => {
   
    const fetchCars = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/cars`
        );
        setCars(response.data);
        setFilteredCars(response.data);
      } catch (error) {
        // console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, []);

  // Handle search functionality
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const term = event.target.value.toLowerCase();

    const filtered = cars.filter(
      (car) =>
        car.carModel.toLowerCase().includes(term) ||
        car.location.toLowerCase().includes(term)
    );
    setFilteredCars(filtered);
  };

  // Handle sorting functionality
  const handleSort = (event) => {
    const option = event.target.value;
    setSortOption(option);

    const sortedCars = [...filteredCars];
    if (option === "priceLowToHigh") {
      sortedCars.sort((a, b) => a.dailyRentalPrice - b.dailyRentalPrice);
    } else if (option === "priceHighToLow") {
      sortedCars.sort((a, b) => b.dailyRentalPrice - a.dailyRentalPrice);
    } else if (option === "dateNewest") {
      sortedCars.sort(
        (a, b) => new Date(b.availability) - new Date(a.availability)
      );
    } else if (option === "dateOldest") {
      sortedCars.sort(
        (a, b) => new Date(a.availability) - new Date(b.availability)
      );
    }
    setFilteredCars(sortedCars);
  };

  return (
    // <div className="p-6">
    //   <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
    //     {/* Search Box */}
    //     <input
    //       type="text"
    //       placeholder="Search by model or location"
    //       className="border px-4 py-2 rounded-lg w-full md:w-72"
    //       value={searchTerm}
    //       onChange={handleSearch}
    //     />

    //     {/* Sort Options */}
    //     <select
    //       className="border px-4 py-2 rounded-lg w-full md:w-auto"
    //       value={sortOption}
    //       onChange={handleSort}
    //     >
    //       <option value="default">Sort By</option>
    //       <option value="priceLowToHigh">Price: Low to High</option>
    //       <option value="priceHighToLow">Price: High to Low</option>
    //       <option value="dateNewest">Availability: Soonest</option>
    //       <option value="dateOldest">Availability: Latest</option>
    //     </select>

    //     {/* Toggle View */}
    //     <button
    //       className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full md:w-auto"
    //       onClick={() => setViewType(viewType === "grid" ? "list" : "grid")}
    //     >
    //       {viewType === "grid" ? "Switch to List View" : "Switch to Grid View"}
    //     </button>
    //   </div>

    //   {/* Car Cards */}
    //   <div
    //     className={`grid ${
    //       viewType === "grid"
    //         ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
    //         : "grid-cols-1 gap-4"
    //     }`}
    //   >
    //     {filteredCars.map((car) => (
    //       <div
    //         key={car._id}
    //         className={`border rounded-lg p-4 shadow-lg hover:shadow-xl transition ${
    //           viewType === "list" ? "flex items-center gap-4" : ""
    //         }`}
    //       >
    //         <img
    //           src={car.image}
    //           alt={car.carModel}
    //           className={`${
    //             viewType === "list"
    //               ? "w-32 h-32 object-cover rounded-md"
    //               : "w-full h-48 object-cover rounded-md mb-4"
    //           }`}
    //         />
    //         <div className="flex flex-col justify-between">
    //           <h3 className="text-lg font-semibold">{car.carModel}</h3>
    //           <p className="text-gray-600">
    //             Price: ${car.dailyRentalPrice}/day
    //           </p>
    //           <p className="text-gray-600">
    //             Availability: {format(new Date(car.availability), "P")}
    //           </p>
    //           <p className="text-gray-600">
    //             BookingCount: {car.bookingCount} 
    //           </p>
    //           <p className="text-gray-500 text-sm">Location: {car.location}</p>
    //           <Link to={`/cardetails/${car._id}`}>
    //             {" "}
    //             <button className="bg-green-500 text-white mt-4 px-4 py-2 rounded-lg w-full">
    //               Book Now
    //             </button>
    //           </Link>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
<div className="p-6 bg-[#191919] ">
  {/* Search and Filter Section */}
  <div className="flex flex-wrap items-center gap-4 justify-between mb-6">
    {/* Sort Options (Left) */}
    <select
      className="border px-4 py-2 rounded-lg w-full md:w-auto"
      value={sortOption}
      onChange={handleSort}
    >
      <option value="default">Sort By</option>
      <option value="priceLowToHigh">Price: Low to High</option>
      <option value="priceHighToLow">Price: High to Low</option>
      <option value="dateNewest">Availability: Soonest</option>
      <option value="dateOldest">Availability: Latest</option>
    </select>

    {/* Search Bar (Center) */}
    <div className="relative flex-1 max-w-md">
      <input
        type="text"
        placeholder="Search by model or location"
        className="border px-4 py-2 w-full rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchTerm}
        onChange={handleSearch}
      />
      <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-orange-500" />
    </div>

    {/* Switch View Button (Right) */}
    <button
      className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg w-full md:w-auto"
      onClick={() => setViewType(viewType === "grid" ? "list" : "grid")}
    >
      {viewType === "grid" ? (
        <>
          <FaList className="mr-2" />
          List View
        </>
      ) : (
        <>
          <FaTh className="mr-2" />
          Grid View
        </>
      )}
    </button>
  </div>

  {/* Car Cards */}
  <div
    className={`grid w-11/12 mx-auto ${
      viewType === "grid"
        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        : "grid-cols-1 gap-4"
    }`}
  >
    {filteredCars.map((car) => (
      <div
        key={car._id}
        className={`relative  rounded-lg p-4 shadow-xl cursor-pointer hover:shadow-xl bg-black transition ${
          viewType === "list" ? "flex items-center gap-4" : ""
        }`}
      >
        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-[#FF3600] text-white font-bold px-3 py-2  ">
          ${car.dailyRentalPrice}/Day
        </div>

        {/* Car Image */}
        <img
          src={car.image}
          alt={car.carModel}
          className={`hover:scale-105 transition-transform  ${
            viewType === "list"
              ? "w-32 h-32 object-cover rounded-md"
              : "w-full h-48 object-cover rounded-md mb-4"
          }`}
        />

        {/* Car Details */}
        <div className="flex flex-col justify-between">
          <h3 className="text-xl font-semibold mb-2 text-[#FF3600]">{car.carModel}</h3>

          {/* Availability */}
          <p className="flex items-center text-base-300">
            <FaCalendarAlt className="mr-2 text-blue-500" />
            <strong>Availability:</strong> <span className="ml-2">{format(new Date(car.availability), "P")}</span>
          </p>

          {/* Booking Count */}
          <p className="flex items-center text-base-300">
            <FaClipboardList className="mr-2 text-green-500" />
            <strong>Booking Count:</strong> <span className="ml-1">{car.bookingCount}</span>
          </p>

          {/* Location */}
          <p className="flex items-center text-base-300">
            <FaMapMarkerAlt className="mr-2 text-red-500" />
            <strong>Location:</strong> <span className="ml-1">{car.location}</span>
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
    
  );
};

export default AvailableCars;
