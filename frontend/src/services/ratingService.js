import api from "./api";

export const submitRating = async (storeId, rating) => {
  console.log("Submitting rating:", { storeId, rating });
  const res = await api.post("/ratings", { store_id: storeId, rating });
  return res.data;
};

export const getUserRating = async (storeId) => {
  console.log("Fetching user rating for store:", storeId);
  try {
    const res = await api.get(`/ratings/my/${storeId}`);
    return res.data;
  } catch (err) {
    console.log("No rating found or error:", err.message);
    return null;
  }
};

export const getRatingsByStore = async (storeId) => {
  const res = await api.get(`/ratings/store/${storeId}`);
  return res.data;
};
