
import { useContext, useRef, useState,  } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthProvider";
import google from "../../../public/google.png";


const Login = () => {
  const { signINUser, signInWithGoogle, loading, setLoading } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef();
  const navigate = useNavigate();
  const location = useLocation()
  const from = location?.state || '/'

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (password.length < 6) {
      toast.error("Password should be at least 6 characters long");
      return;
    }

    setLoading(true);
    signINUser(email, password)
      .then(() => {
        toast.success("Welcome Back!");
        e.target.reset();
        navigate(from, { replace: true })
      })
      .catch(() => {
        toast.error("Incorrect email or password. Please try again.");
        setLoading(false);
      });
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    signInWithGoogle()
      .then(() => navigate(from, { replace: true }))
      .catch(() => toast.error("Unable to sign in with Google. Please try again."))
      .finally(() => setLoading(false));
  };

  const handleForgetPassword = () => {
    const email = emailRef.current.value;

    if (!email) {
      toast.error("Please provide a valid email address");
    } else {
      navigate("/forgetpassword", { state: { email } });
    }
  };

  return (
    <div className="hero min-h-screen bg-slate-200 relative max-w-screen-2xl mx-auto">

      <div className="hero-content flex-col lg:flex-row-reverse w-full z-10 relative">
        <div className="card mt-4 bg-white dark:bg-gray-800 w-full max-w-lg shrink-0 shadow-2xl border mb-16 dark:border-gray-700">
          <form onSubmit={handleLogin} className="card-body">
          
            <h1 className="text-3xl font-bold text-center text-[#00ADB5] dark:text-[#00ADB5]">
              Welcome Back
            </h1>
            <p className="text-center text-gray-500 font-medium dark:text-gray-300">
              Please enter your details to sign in
            </p>

            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text text-lg font-semibold text-gray-700 dark:text-gray-200">
                  Email
                </span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                ref={emailRef}
                className="input input-bordered focus:outline-none focus:ring-2 focus:ring-[#00ADB5] dark:bg-gray-700 dark:text-white dark:border-gray-600"
                required
              />
            </div>

            <div className="form-control relative">
              <label className="label">
                <span className="label-text text-lg font-semibold text-gray-700 dark:text-gray-200">
                  Password
                </span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="input input-bordered focus:outline-none focus:ring-2 focus:ring-[#00ADB5] dark:bg-gray-700 dark:text-white dark:border-gray-600"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 bottom-12 text-[#00ADB5]"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              <label className="label">
                <a
                  onClick={handleForgetPassword}
                  className="label-text-alt link link-hover text-[#00ADB5] text-sm font-medium dark:text-[#00ADB5] dark:hover:text-[#00ADB5]"
                >
                  Forgot password?
                </a>
              </label>
            </div>

            <div className="form-control mt-6">
              <button
                className="btn border-none bg-gradient-to-r from-[#00ADB5] to-[#008C8C] text-white hover:bg-gradient-to-l hover:bg-[#008C8C] transition-all duration-300 font-semibold dark:bg-gradient-to-r dark:from-[#00ADB5] dark:to-[#008C8C] dark:hover:bg-gradient-to-l dark:hover:bg-[#008C8C]"
                disabled={loading}
              >
                {loading ? "Loading..." : "Login"}
              </button>
            </div>

            <p className="text-center mt-4 font-medium text-gray-700 dark:text-gray-300">
              Don't have an account?
              <Link to="/register" className="text-[#00ADB5] underline dark:text-[#00ADB5]">
                Register
              </Link>
            </p>
          </form>

          <div className="mb-5 text-center">
            <button
              onClick={handleGoogleSignIn}
              className="btn btn-ghost text-gray-700 dark:text-gray-300 dark:hover:text-white hover:text-[#00ADB5] border-gray-300 dark:border-gray-600"
              disabled={loading}
            >
              <div className="flex justify-center items-center space-x-2">
                <img className="w-5 h-5" src={google} alt=" " />
                <p className="font-bold">{loading ? "Loading..." : "Sign In with Google"}</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;