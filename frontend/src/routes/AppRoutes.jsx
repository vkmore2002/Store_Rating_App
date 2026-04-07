import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import AdminDashboard from "../pages/AdminDashboard";
import UserDashboard from "../pages/UserDashboard";
import OwnerDashboard from "../pages/OwnerDashboard";
import ProtectedRoute from "./ProtectedRoute";
import RoleBasedRoute from "./RoleBasedRoute";
import Navbar from "../components/Navbar";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <RoleBasedRoute allowedRoles={["admin"]}>
                    <AdminDashboard />
                  </RoleBasedRoute>
                </ProtectedRoute>
              }
            />
            <Route
              path="/user"
              element={
                <ProtectedRoute>
                  <RoleBasedRoute allowedRoles={["user"]}>
                    <UserDashboard />
                  </RoleBasedRoute>
                </ProtectedRoute>
              }
            />
            <Route
              path="/owner"
              element={
                <ProtectedRoute>
                  <RoleBasedRoute allowedRoles={["owner"]}>
                    <OwnerDashboard />
                  </RoleBasedRoute>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default AppRoutes;
