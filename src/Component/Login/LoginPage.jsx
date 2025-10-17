import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import loginimage from "../../assets/pic5.jpg";
import LoginSuccessPopup from "./SucessPopUp";
import { login } from "../../utils/apiservice";
import { getFacutlyByEmail } from "../../utils/facultyApi";
import { showErrorToast, showSuccessToast } from "../../utils/toasts";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");
    if (sessionStorage.getItem("token") && storedEmail) {
      setEmail(storedEmail);
      setIsLoggedIn(true);
    }
  }, []);

  const mutation = useMutation({
    mutationFn: () => {
      // console.log("Logging in with:", { email, password });
      return login({ email, password });
    },
    onSuccess: async () => {
      const facultyData = await getFacutlyByEmail(email);

      if (!facultyData) {
        showErrorToast("No faculty found for this email.");
        return;
      }

      sessionStorage.setItem("facultyId", facultyData._id);
      sessionStorage.setItem("email", email);
      showSuccessToast("Logged in successfully!");
      setLoginSuccess(true);
    },
    onError: (error) => {
      // console.log(error?.response?.data?.message);
      console.error(error)

      showErrorToast(
        error?.response?.data?.message || "Login failed. Please try again."
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate();
  };

  const handleLogoutConfirm = () => {
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("currentRole");
    sessionStorage.removeItem("facultyId");
    setShowLogoutModal(false);
    navigate("/");
    showSuccessToast("Logged out succesfully!");
  };

  const getRedirectPath = () => {
    const role = sessionStorage.getItem("currentRole");
    const storedFacultyId = sessionStorage.getItem("facultyId");

    return `/faculty/${storedFacultyId}`;
  };

  const handleRedirect = () => {
    const redirectPath = getRedirectPath();
    navigate(redirectPath);
  };

  return (
    <>
      {loginSuccess && (
        <LoginSuccessPopup
          message="Login Successful!"
          onComplete={handleRedirect}
        />
      )}

      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl p-6 shadow-xl max-w-sm w-full text-center">
            <h3 className="text-xl font-bold mb-4">Are you sure?</h3>
            <p className="text-gray-600 mb-6">Do you really want to log out?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogoutConfirm}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex h-screen">
        <div className="hidden md:flex w-3/5 bg-gray-200">
          <img
            src={loginimage}
            alt="Login Visual"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full md:w-2/5 flex items-center justify-center">
          <div className="bg-white p-10 shadow-2xl rounded-2xl w-96">
            <h2 className="text-3xl font-extrabold text-center text-[#0073e6] mb-6">
              Faculty Login Portal
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 text-lg font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  disabled={isLoggedIn}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-blue-500 disabled:cursor-not-allowed"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-lg font-semibold">
                  Password
                </label>
                <input
                  type="password"
                  disabled={isLoggedIn}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-blue-500 disabled:cursor-not-allowed"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={mutation.isPending || isLoggedIn}
                className={`w-full text-white py-3 rounded-lg text-lg font-bold hover:opacity-90 transition ${mutation.isPending || isLoggedIn
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#0073e6] to-[#005bb5]"
                  }`}
              >
                {mutation.isPending
                  ? "Logging in..."
                  : isLoggedIn
                    ? "Already Logged In"
                    : "Login"}
              </button>

              {isLoggedIn && (
                <div className="w-full flex justify-center mt-6 flex-col gap-2">
                  <button
                    onClick={handleRedirect}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:scale-105 transition-transform duration-200"
                    type="button"
                  >
                    🚀 Go to Profile
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowLogoutModal(true)}
                    className="bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:scale-105 transition-transform duration-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
