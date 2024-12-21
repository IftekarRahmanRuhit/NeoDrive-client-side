import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#e3ebeb] dark:bg-gray-900 p-4">
        <div className="bg-white shadow-md rounded-lg p-8 text-center max-w-md w-full">
          <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            Sorry, the page you are looking for does not exist.
          </p>
          <Link
            to="/"
            className="px-6 py-3 rounded-lg font-bold bg-gradient-to-r from-[#00ADB5] to-[#008C8C] text-white hover:bg-gradient-to-l hover:bg-[#008C8C] transition-all duration-300 border-none"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
};

export default ErrorPage;