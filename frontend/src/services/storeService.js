import api from "./api";

export const getAllStores = async () => {
  const res = await api.get("/stores");
  return res.data;
};

export const getStoresByOwner = async () => {
  const res = await api.get("/stores/owner/my-stores");
  return res.data;
};

export const deleteStore = async (id) => {
  const res = await api.delete(`/stores/${id}`);
  return res.data;
};
