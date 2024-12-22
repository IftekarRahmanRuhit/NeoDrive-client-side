
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

const Register = () => {
  const { createUser, updateUserProfile,signOutUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const terms = event.target.terms.checked;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

    if (password.length < 6) {
      toast.error("Password should be 6 Characters");
      return;
    }

    if (!passwordRegex.test(password)) {
      toast.error(
        "Password should contain at least one uppercase letter, one lowercase letter, and one number. It must be at least 6 characters long."
      );
      return;
    }

    if (!terms) {
      toast.error("Please Accept Our Terms and Condition");
      return;
    }

    createUser(email, password, name)
      .then((result) => {
        updateUserProfile({ displayName: name, photoURL: photo })
          .then(() => {
            e.target.reset();
            signOutUser()
            navigate("/login");
          })
          .catch((error) => {
            toast.error("Update Failed");
          });
      })
      .catch((error) => {});
  };

  return (
    <div className="hero min-h-screen bg-slate-200 max-w-screen-2xl mx-auto">

      <div className="hero-content flex-col lg:flex-row-reverse w-full">
        <div className="card bg-white dark:bg-gray-800 w-full max-w-lg shrink-0 shadow-2xl  mb-16 mt-4">
          <form onSubmit={handleRegister} className="card-body">
            {/* <img className="w-12 h-12 mx-auto" src={register} alt="" /> */}
            <h1 className="text-3xl font-bold text-center text-[#00ADB5] mt-3">
              Create an account
            </h1>
            <p className="text-center text-gray-500 font-medium">
              Please fill in your details to create an account
            </p>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text text-lg font-semibold text-gray-700 dark:text-gray-200">
                  Name
                </span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="input input-bordered focus:outline-none focus:ring-2 focus:ring-[#00ADB5] dark:bg-gray-700 dark:text-white dark:border-gray-600"
                required
              />
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text text-lg font-semibold text-gray-700 dark:text-gray-200">
                  Photo
                </span>
              </label>
              <input
                type="text"
                name="photo"
                placeholder="Photo URL"
                className="input input-bordered focus:outline-none focus:ring-2 focus:ring-[#00ADB5] dark:bg-gray-700 dark:text-white dark:border-gray-600"
                required
              />
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text text-lg font-semibold text-gray-700 dark:text-gray-200">
                  Email
                </span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input input-bordered focus:outline-none focus:ring-2 focus:ring-[#00ADB5] dark:bg-gray-700 dark:text-white dark:border-gray-600"
                required
              />
            </div>
            <div className="form-control relative mt-4">
              <label className="label">
                <span className="label-text text-lg font-semibold text-gray-700 dark:text-gray-200">
                  Password
                </span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="input input-bordered focus:outline-none focus:ring-2 focus:ring-[#00ADB5] dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 bottom-4 text-[#00ADB5]"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="form-control mt-4 flex flex-row gap-2 items-center">
              <input
                type="checkbox"
                name="terms"
                className="checkbox dark:bg-gray-300"
                required
              />
              <span className="label-text font-semibold text-gray-700 dark:text-gray-200">
                Accept Our Terms and Conditions
              </span>
            </div>
            <div className="form-control mt-6">
              <button className="btn border-none bg-gradient-to-r from-[#00ADB5] to-[#008C8C] text-white hover:bg-gradient-to-l hover:bg-[#008C8C] transition-all duration-300 font-semibold dark:bg-gradient-to-r dark:from-[#00ADB5] dark:to-[#008C8C] dark:hover:bg-gradient-to-l dark:hover:bg-[#008C8C]">
                Register
              </button>
            </div>
            <p className="text-center mt-4 font-medium text-gray-700 dark:text-gray-300">
              Already have an account?
              <Link to="/login" className="text-[#00ADB5] underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
