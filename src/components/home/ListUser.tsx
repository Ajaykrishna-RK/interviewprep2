import React, { useEffect, useState } from "react";
import type { UserAddType } from "../../types/userTypes";
import { getUsers } from "../../services/user/UserService";

function ListUser() {
  const [users, setUsers] = useState<UserAddType[]>([]);
  const limit = 10;
  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(1);

  const itemsPerPage = 2;

  useEffect(() => {
    getAllUsers(limit, skip);
  }, [skip]);

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;

  const itemsToDisplay = users.slice(startIndex, startIndex + itemsPerPage);

  const getAllUsers = async (limit: number, skip: number) => {
    const res = await getUsers(limit, skip);
    setUsers(res?.users);
  };


  return (
    <div className="max-w-[500px]">
      {itemsToDisplay?.map((item) => (
        <div className="shadow-lg">
          <p>
            {item?.firstName} , {item.lastName}
          </p>
        </div>
      ))}
      <button
        className="text-[20px] "
        onClick={() => page > 1 && setPage((prev) => prev - 1)}
      >
        Prev
      </button>
      <button
        className="text-[20px] "
        onClick={() => page < totalPages && setPage((prev) => prev + 1)}
      >
        Next{" "}
      </button>
    </div>
  );
}

export default ListUser;
