import axios from "axios";
import { axiosInstance } from "../../api/axiosInstance";
import type { loginPayload } from "../../types/authTypes";

export const loginFunc = async (payload: loginPayload) => {
  try {
    const res = await axiosInstance.post("/user/login", payload);
    return res.data;
  } catch (err) {
    console.error("login error", err);
  }
};
