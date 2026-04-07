import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/users/login", { email, password });
      const token = res.data.token;
      const role = res.data.role || res.data.user?.role;

      if (!token || !role) {
        setError("Invalid response from server");
        return;
      }

      login(token, role);

      if (role === "admin") {
        navigate("/admin");
      } else if (role === "owner") {
        navigate("/owner");
      } else if (role === "user") {
        navigate("/user");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md border border-blue-100">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">⭐ Login</h1>
          <p className="text-gray-500 mt-2">Welcome back to Store Rating App</p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded mb-6">
            <p className="font-semibold">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              📧 Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              🔒 Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition disabled:opacity-50 shadow-md transform hover:scale-105"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-blue-600 font-bold hover:text-blue-700"
          >
            Register here
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
