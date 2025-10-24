import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.assignments && user.assignments.length > 0) {
      const primaryRole = user.assignments[0].role;
      switch (primaryRole) {
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "manager":
          navigate("/manager/dashboard");
          break;
        case "receptionist":
          navigate("/receptionist/dashboard");
          break;
        case "housekeeping":
          navigate("/housekeeping/dashboard");
          break;
        default:
          // Stay on generic dashboard or handle guest
          break;
      }
    }
  }, [user, navigate]);

  return <>{user ? <></> : navigate("/login")}</>;
};

export default DashboardPage;
