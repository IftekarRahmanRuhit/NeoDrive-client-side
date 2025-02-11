
import React from 'react';
import Lottie from 'lottie-react';
import car from '../../public/car.json';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="flex flex-col items-center p-8 rounded-xl  shadow-lg max-w-lg w-full mx-4">
        <div className="">
          <Lottie animationData={car} loop autoplay />
        </div>
        <div className="mt-4 text-center">
          <h2 className="text-2xl font-bold text-gray-100">
          Welcome to Our Car Rental Service 
          </h2>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;