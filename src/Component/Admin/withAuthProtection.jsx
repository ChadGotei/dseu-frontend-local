import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showErrorToast } from "../../utils/toasts";

const withAuthProtection = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();
    const [checkingAuth, setCheckingAuth] = useState(true);

    useEffect(() => {
      const token = sessionStorage.getItem("token");
      const role = sessionStorage.getItem("currentRole");

      if (!token) {
        showErrorToast("Please login to access admin features")
        navigate("/admin-login");
      } else if (role !== "Admin") {
        showErrorToast("You are not an admin.");
        sessionStorage.clear();
        setCheckingAuth(false);
        navigate("/admin-login");
      } else {
        setCheckingAuth(false);
      }
    }, [navigate]);

    if (checkingAuth) {
      return (
        <div className="min-h-fit flex items-center justify-center text-white">
          Loading...
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuthProtection;
