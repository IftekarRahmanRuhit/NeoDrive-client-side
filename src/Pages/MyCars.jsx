import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format, parseISO } from "date-fns";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import { useDropzone } from "react-dropzone";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { FaEdit, FaTrash } from "react-icons/fa";
import "animate.css";
import { Helmet } from "react-helmet-async";

const MyCars = () => {
  const { user } = useContext(AuthContext);
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const axiosSecure = useAxiosSecure();

  const imageBBApiKey = "6822ad464ff71184fd2149759b3bafd9";

  useEffect(() => {
    if (user?.email) {
      fetchAllCars();
    }
  }, [user, sortOption]);

  const fetchAllCars = async () => {
    try {
      const { data } = await axiosSecure.get(`/mycars/${user?.email}`);

      if (sortOption === "priceAsc") {
        data.sort((a, b) => a.dailyRentalPrice - b.dailyRentalPrice);
      } else if (sortOption === "priceDesc") {
        data.sort((a, b) => b.dailyRentalPrice - a.dailyRentalPrice);
      } else if (sortOption === "dateNewest") {
        data.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
      } else if (sortOption === "dateOldest") {
        data.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
      }

      setCars(data);
    } catch (err) {
      // console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/car/${id}`);
      fetchAllCars();
    } catch (err) {
      toast.error("Failed to delete car.");
    }
  };

  const confirmDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
        Swal.fire("Deleted!", "Your car has been deleted.", "success");
      }
    });
  };

  const handleDrop = async (acceptedFiles) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", acceptedFiles[0]);

      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imageBBApiKey}`,
        formData
      );

      const imageUrl = response.data.data.url;

      setSelectedCar({ ...selectedCar, image: imageUrl });
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedCar) return;
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/update-car/${selectedCar._id}`,
        selectedCar
      );
      toast.success("Car updated successfully!");
      fetchAllCars();
      setSelectedCar(null);
    } catch (err) {
      toast.error("Failed to update car.");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    multiple: false,
    accept: "image/*",
  });

  return (
    <div className="bg-[#191919] pb-28 max-w-screen-2xl mx-auto">
            <Helmet>
              <title>NeoDrive | My Cars</title>
            </Helmet>
      <section className="container mx-auto pt-12 px-4 ">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-100 w-11/12 mx-auto ">My Cars</h2>
          <Link
            to="/addcar"
            className="bg-gradient-to-r from-[#FF3600] to-[#ff3700d7] text-white hover:bg-gradient-to-l font-semibold px-4 py-2 rounded  "
          >
            Add Car
          </Link>
        </div>

        <div className="mt-6 flex justify-end gap-4 ">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className=" rounded p-2 bg-gray-950 text-white font-semibold "
          >
            <option value="">Sort By</option>
            <option value="priceAsc">Price (Lowest First)</option>
            <option value="priceDesc">Price (Highest First)</option>
            <option value="dateNewest">Date Added (Newest First)</option>
            <option value="dateOldest">Date Added (Oldest First)</option>
          </select>
        </div>

        {cars.length === 0 ? (
          <div className="mt-6 text-center">
            <p className="text-gray-100 text-2xl">No cars added yet.</p>
            <Link
              to="/addcar"
              className="mt-3 text-[#ff3700d7] underline hover:text-[#ff3700d6]"
            >
              Add your first car
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto mt-6 w-11/12 mx-auto ">
            <table className="table-auto w-full bg-black border border-gray-700 rounded-lg shadow-lg animate__animated animate__fadeInUp">
              <thead className="bg-black">
                <tr>
                  <th className="px-4 py-4 text-white text-center text-xl">
                    Car Image
                  </th>
                  <th className="px-4 py-4 text-white text-center text-xl">
                    Car Model
                  </th>
                  <th className="px-4 py-4 text-white text-center text-xl">
                    Daily Rental Price
                  </th>
                  <th className="px-4 py-4 text-white text-center text-xl">
                    Booking Count
                  </th>


                  <th className="px-4 py-4 text-white text-center text-xl">
                    Availability
                  </th>
                  <th className="px-4 py-4 text-white text-center text-xl">
                    Date Added
                  </th>
                  <th className="px-4 py-4 text-white text-center text-xl">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {cars.map((car) => (
                  <tr
                    key={car._id}
                    className="border-t border-gray-700 hover:bg-[#2C2C2C]"
                  >
                    <td className="px-4 py-2">
                      <img
                        src={car.image}
                        alt={car.carModel}
                        className="w-28 h-20 rounded mx-auto"
                      />
                    </td>
                    <td className="px-4 py-2 text-gray-300 text-center font-semibold">
                      {car.carModel}
                    </td>
                    <td className="px-4 py-2 text-gray-300 text-center font-semibold">
                      ${car.dailyRentalPrice}
                    </td>
                    <td className="px-4 py-2 text-gray-300 text-center font-semibold">
                      {car.bookingCount}
                    </td>
                    <td className="px-4 py-2 text-gray-300 text-center font-semibold">
                    
                       {format(new Date(car.availability), "dd-MM-yyyy")}
                    </td>
                    <td className="px-4 py-2 text-gray-300 text-center font-semibold">
                      {/* {format(parseISO(car.dateAdded), "P")} */}
                       {format(new Date(car.dateAdded), "dd-MM-yyyy")}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => setSelectedCar(car)}
                        className="flex items-center font-semibold text-blue-400 hover:text-blue-600 mx-auto"
                      >
                        <span className="mr-2">
                          <i className="text-lg">
                            <FaEdit />
                          </i>
                        </span>
                        Update
                      </button>
                      <button
                        onClick={() => confirmDelete(car._id)}
                        className="flex items-center font-semibold text-red-400 hover:text-red-600 mt-2 mx-auto"
                      >
                        <span className="mr-2">
                          <i className="text-lg">
                            <FaTrash />
                          </i>
                        </span>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedCar && (
          <div className="modal modal-open ">
            <div className="modal-box max-w-lg bg-gradient-to-r from-gray-950 via-gray-900 to-black">
              <h2 className="text-2xl text-center text-gray-100 font-bold mb-4">
                Update Car Details
              </h2>
              <form onSubmit={handleUpdate} className="space-y-6">
                <div>
                  <label className="block text-lg font-medium text-gray-300 mb-2">
                    Car Model
                  </label>
                  <input
                    type="text"
                    name="carModel"
                    value={selectedCar.carModel || ""}
                    onChange={(e) =>
                      setSelectedCar({
                        ...selectedCar,
                        carModel: e.target.value,
                      })
                    }
                    placeholder="Enter car model"
                    className="w-full px-3 py-2  rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 bg-gray-800 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-300 mb-2">
                    Daily Rental Price
                  </label>
                  <input
                    type="number"
                    name="dailyRentalPrice"
                    value={selectedCar.dailyRentalPrice || ""}
                    onChange={(e) =>
                      setSelectedCar({
                        ...selectedCar,
                        dailyRentalPrice: e.target.value,
                      })
                    }
                    placeholder="Enter daily rental price"
                    className="w-full px-3 py-2  rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 bg-gray-800 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-300 mb-2">
                    Availability Date
                  </label>
                  <DatePicker
                    selected={parseISO(selectedCar.availability)}
                    onChange={(date) =>
                      setSelectedCar({
                        ...selectedCar,
                        availability: date.toISOString(),
                      })
                    }
                    className="w-full px-3 py-2  rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 bg-gray-800 text-white"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-300 mb-2">
                    Vehicle Registration Number
                  </label>
                  <input
                    type="text"
                    name="vehicleRegistrationNumber"
                    value={selectedCar.vehicleRegistrationNumber || ""}
                    onChange={(e) =>
                      setSelectedCar({
                        ...selectedCar,
                        vehicleRegistrationNumber: e.target.value,
                      })
                    }
                    placeholder="Enter vehicle registration number "
                    className="w-full px-3 py-2  rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 bg-gray-800 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-300 mb-2">
                    Features
                  </label>
                  <input
                    type="text"
                    name="features"
                    value={selectedCar.features || ""}
                    onChange={(e) =>
                      setSelectedCar({
                        ...selectedCar,
                        features: e.target.value,
                      })
                    }
                    placeholder="Enter features (comma-separated)"
                    className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 bg-gray-800 text-white"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={selectedCar.description || ""}
                    onChange={(e) =>
                      setSelectedCar({
                        ...selectedCar,
                        description: e.target.value,
                      })
                    }
                    placeholder="Enter description"
                    className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 bg-gray-800 text-white"
                    rows="4"
                    required
                  ></textarea>
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-300 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={selectedCar.location || ""}
                    onChange={(e) =>
                      setSelectedCar({
                        ...selectedCar,
                        location: e.target.value,
                      })
                    }
                    placeholder="Enter location"
                    className="w-full px-3 py-2  rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 bg-gray-800 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-300 mb-2">
                    Image
                  </label>
                  <div
                    {...getRootProps()}
                    className="border-dashed border-2 px-4 py-8 text-center rounded-md"
                  >
                    <input {...getInputProps()} />
                    <p className="text-gray-300 cursor-pointer">
                      Drag and drop files here, or click to select a file
                    </p>
                  </div>
                  {selectedCar.image && (
                    <div className="mt-4">
                      <img
                        src={selectedCar.image}
                        alt="Selected preview"
                        className="w-full h-32 object-cover rounded-md"
                      />
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#FF3600] to-[#ff3700d7] text-white hover:bg-gradient-to-l  py-2 rounded-md "
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCar(null)}
                  className="w-full bg-gray-500 text-black py-2 rounded-md hover:bg-gray-400 mt-2"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default MyCars;
