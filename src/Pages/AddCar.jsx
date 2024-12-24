
import React, { useState, useContext } from "react";
import { useDropzone } from "react-dropzone";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import axios from "axios";
import { AuthContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const AddCar = () => {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [availability, setAvailability] = useState(new Date());
  const axiosSecure = useAxiosSecure();

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setImage(file); // set the dropped file
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false, //  allowing one image
  });

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      // Sending the image to ImgBB
      const response = await fetch("https://api.imgbb.com/1/upload?key=6822ad464ff71184fd2149759b3bafd9", {
        method: "POST",
        body: formData,
      });

      const data = await response.json(); // Parsing the response
      if (data.success) {
        // Successfully uploaded
        return data.data.url; // Getting the direct image URL
      } else {
      
        throw new Error("Image upload failed");
      }
    } catch (error) {
   
      Swal.fire({
        title: "Error",
        text: "Failed to upload image. Please try again.",
        icon: "error",
        confirmButtonText: "Close",
        confirmButtonColor: "#d33",
      });
      throw error;
    }
  };

  const handleAddCar = async (event) => {
    event.preventDefault();
    const form = event.target;

    const carModel = form.carModel.value;
    const dailyRentalPrice = form.dailyRentalPrice.value;
    const vehicleRegistrationNumber = form.vehicleRegistrationNumber.value;
    const features = form.features.value;
    const description = form.description.value;
    const location = form.location.value;

    try {
      // Uploading image to ImgBB and getting the image URL
      let imageUrl = null;
      if (image) {
        imageUrl = await handleImageUpload(image);
      }

      //  sending cardData to the backend
      const carData = {
        carModel,
        dailyRentalPrice: parseFloat(dailyRentalPrice),
        vehicleRegistrationNumber,
        features: features.split(',').map(feature => feature.trim()),// Converting string to array using 
        description,
        location,
        availability,
        bookingCount: 0,
        image: imageUrl, // uploaded image URL
        agent: {
          email: user?.email,
          name: user?.displayName,
        },
        dateAdded: new Date(), // Storing the date when the car is added
      };

      // Making a POST request to save the car data

      const response = await axiosSecure.post(`/addcar`, carData);

      if (response.data.insertedId) {
        Swal.fire({
          title: "Success",
          text: "Car added successfully!",
          icon: "success",
          confirmButtonText: "Close",
          confirmButtonColor: "#008C8C",
        });

        navigate("/mycars");

        // Reset form and image
        form.reset();
        setImage(null);
        setAvailability(new Date());
      }
    } catch (err) {
     
      Swal.fire({
        title: "Error",
        text: "Failed to add car. Please try again.",
        icon: "error",
        confirmButtonText: "Close",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-8 max-w-4xl mx-auto rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-[#008C8C] mb-5">
        Add a Car
      </h2>
      <form onSubmit={handleAddCar} className="space-y-6">
        <div>
          <label className="block text-sm font-medium">Car Model</label>
          <input
            type="text"
            name="carModel"
            placeholder="Enter car model"
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Daily Rental Price</label>
          <input
            type="number"
            name="dailyRentalPrice"
            placeholder="Enter daily rental price"
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Availability Date</label>
          <DatePicker
            selected={availability}
            onChange={(date) => setAvailability(date)}
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
            placeholder="Enter features (comma-separated)"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
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
          {image && (
            <div className="mt-4">
              <img
                src={URL.createObjectURL(image)}
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
          Add Car
        </button>
      </form>
    </div>
  );
};

export default AddCar;


