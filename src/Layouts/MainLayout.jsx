import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import  { Toaster } from 'react-hot-toast';

const MainLayout = () => {
    return (
        <div>
             <Toaster />
           <div>
           <Navbar></Navbar>
           </div>
           <div className="min-h-[calc(100vh-417px)]">
             <Outlet></Outlet>
             </div>
           <div>
           <Footer></Footer>
           </div>
        </div>
    );
};

export default MainLayout;