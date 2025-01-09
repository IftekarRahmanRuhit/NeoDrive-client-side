import { Link } from "react-router-dom";
import bg from "../../public/bg.jpg";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
const ContactUs = () => {
  const handleContactUs = () => {
    event.preventDefault();
    const form = event.target;

    const FirstName = form.FirstName.value;
    const LastName = form.LastName.value;
    const email = form.email.value;
    const number = form.number.value;
    const message = form.message.value;
    form.reset();

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Thank you for reaching out! We will contact you shortly.",
      showConfirmButton: false,
      timer: 2000,
    });
    form.reset();
  };

  return (
    <div>
      <div className="max-w-screen-2xl mx-auto">
        <div className="relative w-full h-64 sm:h-80 lg:h-96 mt-20">
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
                Contact Us
              </h1>
              <p className="text-sm sm:text-base lg:text-lg">
                <Link to="/" className="hover:text-[#FF3600]">
                  Home
                </Link>{" "}
                <Link to="/contact" className="hover:text-[#FF3600]"></Link> /{" "}
                <span className="text-[#FF3600]">contact us</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#191919]  text-white py-16 px-8 max-w-screen-2xl mx-auto">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Left Section */}
          <div>
            <h2 className="text-3xl font-bold mb-4">Contact Information</h2>
            <p className="mb-6">Say something to start a live chat!</p>
            <div className="space-y-6">
              <div className="flex items-center">
                <FaPhoneAlt className="text-orange-500 mr-4" size={20} />
                <p>+880 1765487829</p>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-orange-500 mr-4" size={20} />
                <p>info@domain.com</p>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-orange-500 mr-4" size={20} />
                <p>Sylhet, Bangladesh</p>
              </div>
            </div>
            <div className="flex items-center mt-8 space-x-4">
              <FaFacebook
                className="cursor-pointer hover:text-blue-500"
                size={25}
              />
              <FaTwitter
                className="cursor-pointer hover:text-blue-500"
                size={25}
              />
              <FaLinkedin
                className="cursor-pointer hover:text-blue-500"
                size={25}
              />
              <FaInstagram
                className="cursor-pointer hover:text-pink-500"
                size={25}
              />
            </div>
          </div>

          {/* Right Section */}
          <div>
            <form
              onSubmit={handleContactUs}
              className="grid md:grid-cols-2 gap-6"
            >
              <div className="flex flex-col">
                <label className="mb-2">First Name</label>
                <input
                  required
                  type="text"
                  name="FirstName"
                  placeholder="Enter Your Name"
                  className="p-3 rounded-md bg-[#222121] text-white focus:outline-none focus:ring-2 focus:ring-gray-700"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-2">Last Name</label>
                <input
                  required
                  type="text"
                  name="LastName"
                  placeholder="Enter Your Name"
                  className="p-3 rounded-md bg-[#222121] text-white focus:outline-none focus:ring-2 focus:ring-gray-700"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-2">Email</label>
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  className="p-3 rounded-md bg-[#222121] text-white focus:outline-none focus:ring-2 focus:ring-gray-700"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-2">Phone</label>
                <input
                  required
                  type="text"
                  placeholder="Enter Your Number"
                  name="number"
                  className="p-3 rounded-md bg-[#222121] text-white focus:outline-none focus:ring-2 focus:ring-gray-700"
                />
              </div>
              <div className="md:col-span-2 flex flex-col">
                <label className="mb-2">Message</label>
                <textarea
                  required
                  placeholder="Write Your Message"
                  rows="5"
                  name="message"
                  className="p-3 rounded-md bg-[#222121] text-white focus:outline-none focus:ring-2 focus:ring-gray-700"
                ></textarea>
              </div>
              <button
                type="submit"
                className="md:col-span-2 bg-gradient-to-r from-[#FF3600] to-[#ff3700d7] text-white hover:bg-gradient-to-l py-3 rounded-md flex items-center justify-center"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
