import React, { useEffect, useState } from "react";
import InputBox from "../common/InputBox";
import { addUser, editUser, getUsers } from "../../services/user/UserService";
import type { UserAddType } from "../../types/userTypes";

function AddUser() {
  const [form, setForm] = useState({ firstName: "", lastName: "", age: 0 });
  const [users, setUsers] = useState<UserAddType[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserAddType | null>(null);
  const [skip, setSkip] = useState(0);
  const limit = 5;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedUser) {
        edit();
      } else {
        const res = await addUser(form);
        console.log(res);
        setForm({ firstName: "", lastName: "", age: 0 });
      }
    } catch (err) {}
  };

  const getAllUsers = async (limit: number, skip: number) => {
    const res = await getUsers(limit, skip);
    setUsers(res?.users);
  };

  const handleEdit = (user: UserAddType) => {
    setSelectedUser(user);
    setForm({
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
    });
  };

  const edit = async () => {
    if (!selectedUser) return;
    const res = await editUser(form, selectedUser.id);

    setUsers((prev) =>
      prev.map((item) =>
        item?.id === selectedUser.id ? { ...item, ...res } : item
      )
    );
    setSelectedUser(null);
  };

  useEffect(() => {
    getAllUsers(limit, skip);
  }, [skip]);

  return (
    <div className=" shadow-lg mt-10 p-[20px]  max-w-md mx-auto">
      {/* <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <InputBox
          label="First Name"
          name="firstName"
          value={form.firstName}
          placeholder="First Name"
          onChange={handleChange}
        />
        <InputBox
          label="Last Name"
          name="lastName"
          value={form.lastName}
          placeholder="Last Name"
          onChange={handleChange}
        />
        <InputBox
          label="Age"
          name="age"
          type="number"
          value={form.age}
          placeholder="Age"
          onChange={handleChange}
        />
        <button className="bg-[#4c7bea] rounded-[10px] cursor-pointer text-[#fff] p-[10px]">
          Submit
        </button>
      </form> */}

      {users?.map((item) => (
        <div className="shadow-lg">
          <p>
            {item?.firstName} , {item.lastName}
          </p>
        </div>
      ))}

      <button onClick={() => setSkip((prev) => prev + limit)}> Next </button>
    </div>
  );
}

export default AddUser;
