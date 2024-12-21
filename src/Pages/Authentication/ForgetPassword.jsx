import React, { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const ForgetPassword = () => {

    const location = useLocation();
    const { signOutUser } = useContext(AuthContext);
  
    const [email, setEmail] = useState(location.state?.email || "");
  
    const handleResetPassword = () => {
      if (!email) {
        toast.error("Please provide a valid email address.");
        return;
      }
  
      signOutUser()
        .then(() => {
          toast.success("You have been logged out.");

          setTimeout(() => {
            window.location.href = "https://mail.google.com";
          }, 2000);
        })
        .catch(() => {
          toast.error("An error occurred while logging out.");
        });
    };

    
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-200 dark:bg-gray-900 p-4">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-4 text-[#008C8C]">Reset Password</h2>
          <p className="text-gray-600 dark:text-gray-300 text-center mb-6 font-medium">
            Enter your email address below to reset your password.
          </p>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-bold ">Email Address</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-[#008C8C] dark:bg-gray-700 dark:text-white"
              placeholder="Enter your email"
            />
          </div>
          <button
            onClick={handleResetPassword}
            className="btn t font-bold bg-gradient-to-r from-[#00ADB5] to-[#008C8C] text-white hover:bg-gradient-to-l hover:bg-[#008C8C] transition-all duration-300 border-none w-full"
          >
            Reset Password
          </button>
        </div>
      </div>
    );
};

export default ForgetPassword;