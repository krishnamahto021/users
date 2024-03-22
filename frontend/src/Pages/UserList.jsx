import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, userSelector } from "../redux/userReducer";
import UserCard from "../Components/UserCard";

const UserList = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector(userSelector);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    dispatch(fetchUsers(pageNumber));
  }, [dispatch, pageNumber]);

  const handleLoadMore = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  return (
    <section className="bg-gradient-to-r from-[#0077b6] to-[#0096c7]">
      <div className="grid   grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 max-w-screen-2xl m-auto p-5 ">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
        {loading && <p>Loading...</p>}
      </div>
      {!loading && (
        <div className="w-full flex items-center justify-center pb-2">
          <button
            onClick={handleLoadMore}
            className="px-4 py-2 font-semibold text-sm  bg-cyan-500 text-white rounded-full shadow-sm "
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
};

export default UserList;
