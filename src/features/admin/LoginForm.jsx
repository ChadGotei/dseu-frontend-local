import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { login } from "../../utils/apiservice";
import { showErrorToast, showSuccessToast } from "../../utils/toasts";

import Logo from "../../Component/Reusable/Logo";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const role = sessionStorage.getItem("currentRole");

    if (token && role === "Admin") {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data.role === "Admin") {
        showSuccessToast("Logged in successfully!");
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("currentRole", data.role);
        sessionStorage.removeItem("email");
        navigate("/admin/dashboard");
      } else {
        showErrorToast("This user isn't an admin.");
        setEmail("");
        setPassword("");
        sessionStorage.clear();
      }
    },
    onError: () => {
      showErrorToast("Invalid credentials");
    },
  });

  const handleShowPassword = () => {
    if (!password) return;

    setShowPassword(prev => {
      return !prev;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen md:min-h-[90vh] flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8 md:p-10"
      >
        <div className="flex justify-center mb-6">
          <Logo cn={"w-20 h-auto"} />
        </div>

        <h2 className="text-2xl font-bold text-center text-[#333] mb-6">
          Admin Login
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-blue-600 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            autoFocus
            className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6 relative">
          <label className="block text-sm font-medium text-blue-600 mb-1">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full px-4 py-2 pr-10 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={handleShowPassword}
            className="absolute top-9 right-3 text-gray-500 hover:text-blue-600 focus:outline-none"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className={`w-full py-2 rounded-lg text-white font-semibold transition-colors duration-300
            disabled:cursor-not-allowed
            ${mutation.isPending
              ? "bg-blue-400 cursor-not-allowed opacity-70"
              : "bg-blue-600 hover:bg-orange-400"
            }`}
        >
          {mutation.isPending ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
