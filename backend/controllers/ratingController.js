import {
  upsertRating,
  getRatingsByStore,
  getUserRatingForStore,
  deleteRating,
} from "../models/ratingModel.js";

// add or update rating
export const submitRating = (req, res) => {
  const userId = req.user.id;
  const { store_id, rating } = req.body;

  if (!store_id || !rating) {
    return res.status(400).json({ message: "store_id and rating required" });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Rating must be between 1 and 5" });
  }

  upsertRating(userId, store_id, rating, (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "Rating submitted successfully" });
  });
};

// get ratings for a store (owner/admin)
export const getStoreRatings = (req, res) => {
  const { storeId } = req.params;

  getRatingsByStore(storeId, (err, results) => {
    if (err) return res.status(500).json(err);

    res.json(results);
  });
};

// get current user's rating for a store
export const getMyRating = (req, res) => {
  const userId = req.user.id;
  const { storeId } = req.params;

  getUserRatingForStore(userId, storeId, (err, results) => {
    if (err) return res.status(500).json(err);

    if (results.length === 0) {
      return res.json(null);
    }

    res.json(results[0]);
  });
};

// delete rating (optional)
export const removeRating = (req, res) => {
  const { id } = req.params;

  deleteRating(id, (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "Rating deleted successfully" });
  });
};
