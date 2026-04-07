import React, { useState, useEffect } from "react";
import { getStoresByOwner } from "../services/storeService";
import { getRatingsByStore } from "../services/ratingService";

const OwnerDashboard = () => {
  const [stores, setStores] = useState([]);
  const [ratings, setRatings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStoresAndRatings = async () => {
      try {
        const storesData = await getStoresByOwner();
        setStores(storesData);

        const allRatings = {};
        for (const store of storesData) {
          try {
            const storeRatings = await getRatingsByStore(store.id || store._id);
            allRatings[store.id || store._id] = storeRatings;
          } catch {
            allRatings[store.id || store._id] = [];
          }
        }
        setRatings(allRatings);
      } catch (err) {
        setError("Failed to load stores");
      } finally {
        setLoading(false);
      }
    };

    fetchStoresAndRatings();
  }, []);

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
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          🏪 Owner Dashboard
        </h1>
        <p className="text-gray-500 mt-2">
          View your stores and customer ratings
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-lg">
          ⚠️ {error}
        </div>
      )}

      {stores.length === 0 ? (
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-16 text-center">
          <p className="text-gray-500 text-xl">😕 No stores found</p>
        </div>
      ) : (
        <div className="space-y-8">
          {stores.map((store) => {
            const storeId = store.id || store._id;
            const storeRatings = ratings[storeId] || [];
            const avgRating =
              storeRatings.length > 0
                ? (
                    storeRatings.reduce((sum, r) => sum + r.rating, 0) /
                    storeRatings.length
                  ).toFixed(1)
                : store.averageRating || "N/A";

            return (
              <div
                key={storeId}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition"
              >
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    🏪 {store.name}
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-gray-600">📍 Address</p>
                      <p className="font-semibold text-gray-800">
                        {store.address}
                      </p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <p className="text-gray-600">⭐ Average Rating</p>
                      <p className="text-3xl font-bold text-yellow-600">
                        {avgRating}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    💬 Customer Ratings
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {storeRatings.length}
                    </span>
                  </h3>

                  {storeRatings.length === 0 ? (
                    <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <p className="text-gray-500">No ratings yet</p>
                    </div>
                  ) : (
                    <div className="grid gap-3">
                      {storeRatings.map((rating, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200 hover:shadow-md transition"
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-semibold text-gray-800">
                                👤 {rating.name || rating.user_id}
                              </p>
                            </div>
                            <div className="text-right">
                              <p>
                                <span className="text-3xl">⭐</span>
                                <span className="font-bold text-yellow-600 ml-1 text-xl">
                                  {rating.rating}/5
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OwnerDashboard;
