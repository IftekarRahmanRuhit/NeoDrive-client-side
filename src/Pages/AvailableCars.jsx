import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns"; 
import { Link } from "react-router-dom";

const AvailableCars = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [viewType, setViewType] = useState("grid"); 

  useEffect(() => {
    // Fetch car data
    const fetchCars = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/cars`
        );
        setCars(response.data);
        setFilteredCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
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
    <div className="p-6">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        {/* Search Box */}
        <input
          type="text"
          placeholder="Search by model or location"
          className="border px-4 py-2 rounded-lg w-full md:w-72"
          value={searchTerm}
          onChange={handleSearch}
        />

        {/* Sort Options */}
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

        {/* Toggle View */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full md:w-auto"
          onClick={() => setViewType(viewType === "grid" ? "list" : "grid")}
        >
          {viewType === "grid" ? "Switch to List View" : "Switch to Grid View"}
        </button>
      </div>

      {/* Car Cards */}
      <div
        className={`grid ${
          viewType === "grid"
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            : "grid-cols-1 gap-4"
        }`}
      >
        {filteredCars.map((car) => (
          <div
            key={car._id}
            className={`border rounded-lg p-4 shadow-lg hover:shadow-xl transition ${
              viewType === "list" ? "flex items-center gap-4" : ""
            }`}
          >
            <img
              src={car.image}
              alt={car.carModel}
              className={`${
                viewType === "list"
                  ? "w-32 h-32 object-cover rounded-md"
                  : "w-full h-48 object-cover rounded-md mb-4"
              }`}
            />
            <div className="flex flex-col justify-between">
              <h3 className="text-lg font-semibold">{car.carModel}</h3>
              <p className="text-gray-600">
                Price: ${car.dailyRentalPrice}/day
              </p>
              <p className="text-gray-600">
                Availability: {format(new Date(car.availability), "P")}
              </p>
              <p className="text-gray-500 text-sm">Location: {car.location}</p>
              <Link to={`/cardetails/${car._id}`}>
                {" "}
                <button className="bg-green-500 text-white mt-4 px-4 py-2 rounded-lg w-full">
                  Book Now
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
