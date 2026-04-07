import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold">⭐ Store Rating App</h1>

        <div className="flex gap-8 items-center">
          {user && (
            <>
              <div className="flex gap-6">
                {user.role === "admin" && (
                  <a
                    href="/admin"
                    className="hover:text-blue-200 transition font-semibold"
                  >
                    👨‍💼 Admin
                  </a>
                )}
                {user.role === "user" && (
                  <a
                    href="/user"
                    className="hover:text-blue-200 transition font-semibold"
                  >
                    👤 User
                  </a>
                )}
                {user.role === "owner" && (
                  <a
                    href="/owner"
                    className="hover:text-blue-200 transition font-semibold"
                  >
                    🏪 Owner
                  </a>
                )}
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg font-semibold transition transform hover:scale-105 shadow-md"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
