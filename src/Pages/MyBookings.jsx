
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../Provider/AuthProvider";
import { FaCalendarAlt, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null); 
  const [isModalOpen, setModalOpen] = useState(false);
  const [newBookingDate, setNewBookingDate] = useState(""); 

  useEffect(() => {
    if (user) {
      fetchBookings(user.email);
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/bookings/${user?.email}`
      );
      setBookings(data);
    } catch (err) {
      console.error(err);
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
      console.error(err);
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
      console.error(err);
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
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Car Image</th>
                <th className="px-4 py-2 border-b">Car Model</th>
                <th className="px-4 py-2 border-b">Booking Date</th>
                <th className="px-4 py-2 border-b">Total Price</th>
                <th className="px-4 py-2 border-b">Status</th>
                <th className="px-4 py-2 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border-b">
                    <img
                      src={booking.image}
                      alt="Car"
                      className="w-16 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-2 border-b text-center">{booking.carModel}</td>
                  <td className="px-4 py-2 border-b text-center">
                    {new Date(booking.bookingDate).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    ${Math.abs(booking.dailyRentalPrice)}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    <span
                      className={`px-2 py-1 rounded ${
                        booking.status === "Confirmed"
                          ? "bg-green-100 text-green-600"
                          : booking.status === "Canceled"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-center flex justify-center items-center">
                    <button
                    // disabled={booking.status === "Confirmed" || booking.status === "Canceled"}
                      onClick={() => openModal(booking)}
                      className="btn-sm flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2 disabled:cursor-not-allowed"
                    >
                      <FaCalendarAlt className="mr-1" />
                      Modify Date
                    </button>
                    <button
                    //  disabled={booking.status === "Confirmed" || booking.status === "Canceled"}
                      onClick={() => confirmCancelBooking(booking._id)}
                      className="btn-sm flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:cursor-not-allowed"
                    >
                      <FaTrashAlt className="mr-1" />
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {isModalOpen && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md w-1/3">
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
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
