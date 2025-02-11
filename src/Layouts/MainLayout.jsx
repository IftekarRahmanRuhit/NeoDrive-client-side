// import { Outlet } from "react-router-dom";
// import Navbar from "../Components/Navbar";
// import Footer from "../Components/Footer";
// import  { Toaster } from 'react-hot-toast';

// const MainLayout = () => {
//     return (
//         <div>
//              <Toaster />
//            <div>
//            <Navbar></Navbar>
//            </div>
//            <div className="min-h-[calc(100vh-417px)]">
//              <Outlet></Outlet>
//              </div>
//            <div>
//            <Footer></Footer>
//            </div>
//         </div>
//     );
// };

// export default MainLayout;

import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Toaster } from 'react-hot-toast';
import LoadingSpinner from "../Components/LoadingSpinner";


const MainLayout = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial page load with a delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds delay - adjust as needed

    // Cleanup function
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-black ">
      <Toaster />
      
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <div className="max-w-screen-2xl mx-auto">
            <Navbar />
          </div>
          
          <main className="flex-grow min-h-[calc(100vh-148px)]">
            <Outlet />
          </main>
          
          <Footer />
        </>
      )}
    </div>
  );
};

export default MainLayout;