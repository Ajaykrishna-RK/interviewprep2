import React, { useState } from "react";
import InputBox from "../common/InputBox";
import { loginFunc } from "../../services/auth/auth";
import { useNavigate } from "react-router-dom";

function LoginComponent() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.username === "" || form.password === "")
      return alert("fields cant be empty ");
    try {
      const res = await loginFunc(form);
      if (res) localStorage.setItem("token", res.accessToken);
      setForm({ username: "", password: "" });
      navigate("/");
    } catch (err) {
      console.log(err, "login error");
      setForm({ username: "", password: "" });
    }
  };

  return (
    <div className=" shadow-lg mt-10 p-[20px]  max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <InputBox
          label="username"
          name="username"
          value={form.username}
          placeholder="User Name"
          onChange={handleChange}
        />
        <InputBox
          label="password"
          name="password"
          value={form.password}
          placeholder="Password"
          onChange={handleChange}
        />
        <button className="bg-[#4c7bea] rounded-[10px] cursor-pointer text-[#fff] p-[10px]">
          Submit
        </button>
      </form>
    </div>
  );
}

export default LoginComponent;
