import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { useEffect } from "react";


 const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
  })

  const useAxiosSecure = () => {
    const navigate = useNavigate()
    const { signOutUser} = useAuth()
    useEffect(() => {
      axiosSecure.interceptors.response.use(
        res => {
          return res
        },
        async error => {

          if (error.response.status === 401 || error.response.status === 403) {
            // logout 
            signOutUser()
            // navigate to login
            navigate('/login')
          }
        }
      )
    }, [signOutUser,, navigate])

    return axiosSecure
  }
  
  export default useAxiosSecure