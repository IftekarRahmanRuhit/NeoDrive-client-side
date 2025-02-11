// import React from 'react';
// import { ImSpinner9 } from 'react-icons/im';

// const LoadingSpinner = () => {
//   return (
//     <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
//       <div className="flex flex-col items-center justify-center p-8 rounded-lg bg-white/90">
//         {/* You can replace this div with your Lottie animation component */}
//         <div className="animate-spin text-primary">
//           <ImSpinner9 className="w-16 h-16 text-blue-600" />
//         </div>
        
//         <div className="mt-4 text-center">
//           <h2 className="text-xl font-semibold text-gray-800 mb-2">
//             Finding Your Perfect Ride
//           </h2>
//           <p className="text-gray-600">
//             We're preparing the best vehicles for you...
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoadingSpinner;


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
          <h2 className="text-xl font-bold text-gray-100">
          Welcome to Our Car Rental Service
          </h2>
          <p className="text-lg text-gray-100">
          Loading the best rides just for you...
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;