import {createBrowserRouter} from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import ErrorPage from "../Components/ErrorPage";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import AvailableCars from "../Pages/AvailableCars";
import AddCar from "../Pages/AddCar";
import MyCars from "../Pages/MyCars";
import MyBookings from "../Pages/MyBookings";
import PrivateRoute from "./PrivateRoute";
import ForgetPassword from "../Pages/Authentication/ForgetPassword";
import CarDetails from "../Pages/CarDetails";


export const routes = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
          {
              path:'/',
              element:<Home></Home>,
              
          },
          {
            path: '/login',
            element: <Login></Login>
        },
        {
            path: '/register',
            element: <Register></Register>
        },
        {
            path: '/availablecars',
            element:<AvailableCars></AvailableCars>
        },
        {
            path: '/addcar',
            element:<PrivateRoute><AddCar></AddCar></PrivateRoute>
        },
        {
            path: '/mycars',
            element:<PrivateRoute><MyCars></MyCars></PrivateRoute>
        },
        {
            path: '/mybookings',
            element:<PrivateRoute><MyBookings></MyBookings></PrivateRoute>
        },
        {
            path: '/forgetpassword',
            element: <ForgetPassword></ForgetPassword>
        },
        {
            path: '/cardetails/:id',
            element: <CarDetails></CarDetails>
        }
       
        ]
      },



 ]);
