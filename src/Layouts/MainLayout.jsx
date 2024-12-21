import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import  { Toaster } from 'react-hot-toast';

const MainLayout = () => {
    return (
        <div>
             <Toaster />
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;