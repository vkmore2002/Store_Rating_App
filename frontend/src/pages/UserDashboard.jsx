import React, { useState, useEffect } from "react";
import { getAllStores } from "../services/storeService";
import { submitRating, getUserRating } from "../services/ratingService";

const UserDashboard = () => {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userRatings, setUserRatings] = useState({});
  const [ratingInput, setRatingInput] = useState({});

  useEffect(() => {
    const fetchStoresAndRatings = async () => {
      try {
        const data = await getAllStores();
        setStores(data);

        const ratings = {};
        for (const store of data) {
          try {
            const storeId = store.id || store._id;
            const rating = await getUserRating(storeId);
            ratings[storeId] = rating?.rating || null;
          } catch {
            const storeId = store.id || store._id;
            ratings[storeId] = null;
          }
        }
        setUserRatings(ratings);
      } catch (err) {
        setError("Failed to load stores");
      } finally {
        setLoading(false);
      }
    };

    fetchStoresAndRatings();
  }, []);

  const handleRatingChange = (storeId, value) => {
    setRatingInput({
      ...ratingInput,
      [storeId]: parseInt(value) || 0,
    });
  };

  const handleSubmitRating = async (storeId) => {
    const rating = ratingInput[storeId];

    if (!rating || rating < 1 || rating > 5) {
      alert("Rating must be between 1 and 5");
      return;
    }

    try {
      await submitRating(storeId, rating);
      setUserRatings({
        ...userRatings,
        [storeId]: rating,
      });
      setRatingInput({
        ...ratingInput,
        [storeId]: 0,
      });
    } catch (err) {
      alert(
        "Failed to submit rating: " +
          (err.response?.data?.message || err.message),
      );
    }
  };

  const filteredStores = stores.filter((store) =>
    store.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          👤 User Dashboard
        </h1>
        <p className="text-gray-500 mt-2">
          Browse and rate your favorite stores
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-lg">
          ⚠️ {error}
        </div>
      )}

      <div className="relative">
        <input
          type="text"
          placeholder="🔍 Search stores..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-lg"
        />
      </div>

      {filteredStores.length === 0 ? (
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-16 text-center">
          <p className="text-gray-500 text-xl">😕 No stores found</p>
        </div>
      ) : (
        <div>
          <p className="text-gray-600 mb-6 font-semibold">
            Found {filteredStores.length} store
            {filteredStores.length !== 1 ? "s" : ""}
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredStores.map((store) => {
              const storeId = store.id || store._id;
              return (
                <div
                  key={storeId}
                  className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-xl transition transform hover:scale-105"
                >
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    🏪 {store.name}
                  </h3>
                  <p className="text-gray-600 mb-3">
                    <span className="font-semibold">📍 Address:</span>
                    <br />
                    <span className="text-sm">{store.address}</span>
                  </p>
                  <div className="bg-blue-50 p-3 rounded-lg mb-4">
                    <p className="text-gray-700">
                      <span className="font-bold">⭐ Average Rating:</span>
                      <br />
                      <span className="text-2xl text-blue-600 font-bold">
                        {store.averageRating || "N/A"}
                      </span>
                    </p>
                  </div>

                  <div className="border-t pt-4">
                    <label className="block text-gray-700 font-bold mb-3">
                      Your Rating:
                    </label>
                    {userRatings[storeId] && (
                      <p className="text-sm text-gray-600 mb-3 bg-green-50 p-2 rounded">
                        ✅ Current: {userRatings[storeId]} ⭐
                      </p>
                    )}
                    <div className="flex gap-2">
                      <input
                        type="number"
                        min="1"
                        max="5"
                        placeholder="1-5"
                        value={ratingInput[storeId] || ""}
                        onChange={(e) =>
                          handleRatingChange(storeId, e.target.value)
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => handleSubmitRating(storeId)}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition shadow-md transform hover:scale-105"
                      >
                        ✓
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
