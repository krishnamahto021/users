// UserCard.js

import React from "react";

const UserCard = ({ user }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-fit">
      <img
        className="w-full object-contain aspect-square"
        src={user.avatar}
        alt={`${user.first_name} ${user.last_name}`}
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">
          {user.first_name} {user.last_name}
        </h2>
        <p className="text-gray-600 mb-2">{user.email}</p>
        <p className="text-gray-600 mb-2">{user.gender}</p>
        <p className="text-gray-600 mb-2">{user.domain}</p>
        <p className="text-gray-600 mb-2">
          Available: {user.available ? "Yes" : "No"}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
