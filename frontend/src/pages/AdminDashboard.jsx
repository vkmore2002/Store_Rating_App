import React, { useState, useEffect } from "react";
import { getAllUsers, deleteUser } from "../services/userService";
import { getAllStores, deleteStore } from "../services/storeService";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getAllUsers();
        const storesData = await getAllStores();
        setUsers(usersData);
        setStores(storesData);
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  const handleDeleteStore = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await deleteStore(id);
      setStores(stores.filter((store) => store.id !== id));
    } catch (err) {
      alert("Failed to delete store");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          👨‍💼 Admin Dashboard
        </h1>
        <p className="text-gray-500 mt-2">Manage users and stores</p>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-lg">
          ⚠️ {error}
        </div>
      )}

      {/* Users Section */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-3xl font-bold text-gray-800">👥 Users</h2>
          <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">
            {users.length}
          </span>
        </div>

        {users.length === 0 ? (
          <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
            <p className="text-gray-500 text-lg">No users found</p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition transform hover:scale-105"
              >
                <h3 className="font-bold text-lg text-gray-800 mb-3">
                  {user.name}
                </h3>
                <div className="space-y-2 mb-4">
                  <p className="text-gray-600">
                    <span className="font-semibold">📧 Email:</span>
                    <br />
                    <span className="text-sm">{user.email}</span>
                  </p>
                  <p>
                    <span className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {user.role.toUpperCase()}
                    </span>
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition shadow-md transform hover:scale-105"
                >
                  🗑️ Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Stores Section */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-3xl font-bold text-gray-800">🏪 Stores</h2>
          <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">
            {stores.length}
          </span>
        </div>

        {stores.length === 0 ? (
          <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
            <p className="text-gray-500 text-lg">No stores found</p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {stores.map((store) => (
              <div
                key={store.id}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition transform hover:scale-105"
              >
                <h3 className="font-bold text-lg text-gray-800 mb-3">
                  {store.name}
                </h3>
                <div className="space-y-2 mb-4">
                  <p className="text-gray-600">
                    <span className="font-semibold">📧 Email:</span>
                    <br />
                    <span className="text-sm">{store.email}</span>
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">📍 Address:</span>
                    <br />
                    <span className="text-sm">{store.address}</span>
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteStore(store.id)}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition shadow-md transform hover:scale-105"
                >
                  🗑️ Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
