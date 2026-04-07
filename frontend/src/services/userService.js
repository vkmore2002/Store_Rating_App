import api from "./api";

export const getAllUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};

export const deleteUser = async (id) => {
  const res = await api.delete(`/users/${id}`);
  return res.data;
};
