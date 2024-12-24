
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../Provider/AuthProvider";
import { FaCalendarAlt, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null); 
  const [isModalOpen, setModalOpen] = useState(false);
  const [newBookingDate, setNewBookingDate] = useState(""); 
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user) {
      fetchBookings(user.email);
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const { data } = await axiosSecure.get(
        `/bookings/${user?.email}`
      );
      setBookings(data);
    } catch (err) {
      toast.error("Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (id) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/booking-cancel/${id}`, {
        status: "Canceled",
      });
      toast.success("Booking canceled successfully!");
      fetchBookings(user.email);
    } catch (err) {
     
      toast.error("Failed to cancel booking.");
    }
  };

  const confirmCancelBooking = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleCancelBooking(id);
        Swal.fire("Canceled!", "Your booking has been canceled.", "success");
      }
    });
  };

  const handleModifyBooking = async (id, newDate) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/bookings/${id}`, {
        bookingDate: newDate,
        status: "Confirmed",
      });
      toast.success("Booking date modified and confirmed successfully!");
      fetchBookings(user.email);
    } catch (err) {
     
      toast.error("Failed to modify booking.");
    }
  };

  const openModal = (booking) => {
    setSelectedBooking(booking);
    setNewBookingDate("");
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedBooking(null);
    setModalOpen(false);
  };

  const handleConfirmModify = async () => {
    if (newBookingDate) {
      await handleModifyBooking(selectedBooking._id, newBookingDate);
    }
    closeModal();
  };

  return (
<div className="max-w-screen-2xl mx-auto">
<div className="p-6 bg-[#191919] min-h-screen pb-24 ">
      <h1 className="text-3xl font-bold mb-10 mt-6 w-11/12 mx-auto text-gray-100">My Bookings</h1>
      {loading ? (
         <div className="text-center">
          <span className=" text-center mx-auto items-center loading loading-bars loading-md text-white"></span>
         </div>
      ) : (

        <div className="overflow-x-auto w-11/12 mx-auto">
  <table className="min-w-full bg-black border border-gray-700 shadow-md rounded-lg">
    <thead className="bg-black text-white">
      <tr>
        <th className="px-4 py-4 border-b border-gray-600 text-center text-xl">Car Image</th>
        <th className="px-4 py-4 border-b border-gray-600 text-center text-xl">Car Model</th>
        <th className="px-4 py-4 border-b border-gray-600 text-center text-xl">Booking Date</th>
        <th className="px-4 py-4 border-b border-gray-600 text-center text-xl">Total Price</th>
        <th className="px-4 py-4 border-b border-gray-600 text-center text-xl">Status</th>
        <th className="px-4 py-4 border-b border-gray-600 text-center text-xl">Actions</th>
      </tr>
    </thead>
    <tbody>
      {bookings.map((booking) => (
        <tr key={booking._id} className="hover:bg-[#2C2C2C]">
          <td className="px-4 py-2 border-b border-gray-600">
            <img
              src={booking.image}
              alt="Car"
              className="w-28 h-20 mx-auto object-cover rounded"
            />
          </td>
          <td className="px-4 py-2 border-b border-gray-600 font-semibold text-gray-300 text-center">
            {booking.carModel}
          </td>
          <td className="px-4 py-2 border-b border-gray-600 font-semibold text-gray-300 text-center">
            {new Date(booking.bookingDate).toLocaleString()}
          </td>
          <td className="px-4 py-2 border-b border-gray-600 font-semibold text-gray-300 text-center">
            ${Math.abs(booking.dailyRentalPrice)}
          </td>
          <td className="px-4 py-2 border-b border-gray-600  text-center">
            <span
              className={`px-2 py-1 rounded ${
                booking.status === "Confirmed"
                  ? "bg-green-500 text-white"
                  : booking.status === "Canceled"
                  ? "bg-red-500 text-white"
                  : "bg-yellow-500 text-white"
              }`}
            >
              {booking.status}
            </span>
          </td>
          <td className="px-4 py-2 border-b border-gray-600 text-center align-middle">
            <div className="space-x-2">
              <button
                onClick={() => openModal(booking)}
                className="inline-flex font-medium items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                <FaCalendarAlt className="mr-2" />
                Modify Date
              </button>
              <button
                onClick={() => confirmCancelBooking(booking._id)}
                className="inline-flex font-medium items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                <FaTrashAlt className="mr-2" />
                Cancel
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
      )}
      {isModalOpen && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-200 p-6 rounded shadow-md w-1/3">
            <h3 className="text-lg font-bold mb-4">Modify Booking Date</h3>
            <input
              type="datetime-local"
              className="w-full p-2 border rounded mb-4"
              value={newBookingDate}
              onChange={(e) => setNewBookingDate(e.target.value)}
            />
            <div className="flex justify-end">
              <button
               
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmModify}
                className="px-4 py-2 bg-gradient-to-r from-[#FF3600] to-[#ff3700d7] text-white hover:bg-gradient-to-l  rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
</div>
  );
};

export default MyBookings;
