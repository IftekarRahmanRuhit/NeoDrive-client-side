

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

const MyCars = () => {
  const { user } = useContext(AuthContext);
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [sortOption, setSortOption] = useState("");

  const imageBBApiKey = "6822ad464ff71184fd2149759b3bafd9";

  useEffect(() => {
    if (user?.email) {
      fetchAllCars();
    }
  }, [user, sortOption]);

  const fetchAllCars = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/mycars/${user?.email}`
      );

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
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/car/${id}`);
      fetchAllCars();
    } catch (err) {
      console.error(err);
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
      console.error("Image upload failed:", error);
      toast.error("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedCar) return;
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/update-car/${selectedCar._id}`, selectedCar);
      toast.success("Car updated successfully!");
      fetchAllCars();
      setSelectedCar(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update car.");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    multiple: false,
    accept: "image/*",
  });

  return (
    <section className="container mx-auto pt-12 px-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-800">My Cars</h2>
        <Link
          to="/addcar"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Car
        </Link>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border rounded p-2"
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
          <p className="text-gray-600">No cars added yet.</p>
          <Link
            to="/addcar"
            className="text-blue-500 underline hover:text-blue-700"
          >
            Add your first car
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto mt-6">
          <table className="table-auto w-full bg-white border">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Car Image</th>
                <th className="px-4 py-2">Car Model</th>
                <th className="px-4 py-2">Daily Rental Price</th>
                <th className="px-4 py-2">Availability</th>
                <th className="px-4 py-2">Date Added</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr key={car._id} className="border-t">
                  <td className="px-4 py-2">
                    <img
                      src={car.image}
                      alt={car.carModel}
                      className="w-16 h-16 rounded"
                    />
                  </td>
                  <td className="px-4 py-2 text-center">{car.carModel}</td>
                  <td className="px-4 py-2 text-center">${car.dailyRentalPrice}</td>
                  <td className="px-4 py-2 text-center">{format(parseISO(car.availability), "P")}</td>
                  <td className="px-4 py-2 text-center">{format(parseISO(car.dateAdded), "P")}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => setSelectedCar(car)}
                      className="text-blue-500 hover:underline"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => confirmDelete(car._id)}
                      className="text-red-500 hover:underline ml-4"
                    >
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
        <div className="modal modal-open">
          <div className="modal-box max-w-lg">
            <h2 className="text-lg font-bold mb-4">Update Car Details</h2>
            <form onSubmit={handleUpdate} className="space-y-6">
              <div>
                <label className="block text-sm font-medium">Car Model</label>
                <input
                  type="text"
                  name="carModel"
                  value={selectedCar.carModel || ""}
                  onChange={(e) =>
                    setSelectedCar({ ...selectedCar, carModel: e.target.value })
                  }
                  placeholder="Enter car model"
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
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
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
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
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
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
                  placeholder="Enter vehicle registration number"
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Features</label>
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
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Description</label>
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
                  className="w-full px-3 py-2 border rounded-md"
                  rows="4"
                  required
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium">Location</label>
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
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Image</label>
                <div
                  {...getRootProps()}
                  className="border-dashed border-2 px-4 py-8 text-center rounded-md"
                >
                  <input {...getInputProps()} />
                  <p>Drag and drop files here, or click to select a file</p>
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
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setSelectedCar(null)}
                className="w-full bg-gray-300 text-black py-2 rounded-md hover:bg-gray-400 mt-2"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default MyCars;