import { axiosInstance } from "../../api/axiosInstance";
import type { UserAddType } from "../../types/userTypes";

export const addUser = async (payload: UserAddType) => {
  try {
    const res = await axiosInstance.post("/users/add", payload);
    return res.data;
  } catch (err) {
    console.error("add user error", err);
  }
};

export const editUser = async (payload: UserAddType, id: string| number | undefined) => {
  try {
    const res = await axiosInstance.put(
      `https://dummyjson.com/users/${id}`,
      payload
    );
    return res.data;
  } catch (err) {
    console.error("Edit user error", err);
  }
};

export const getUsers = async () => {
  try {
    const res = await axiosInstance.get(`https://dummyjson.com/users?limit=10`);
    return res.data;
  } catch (err) {
    console.error("get User error", err);
  }
};
