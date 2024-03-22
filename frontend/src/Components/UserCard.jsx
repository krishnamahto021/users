import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdMailOutline } from "react-icons/md";
import { FaMale, FaFemale } from "react-icons/fa";
import { CgWorkAlt } from "react-icons/cg";
import { BiEdit } from "react-icons/bi";
import { updateUser } from "../redux/userReducer";

const UserCard = ({ user }) => {
  const [editing, setEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  const dispatch = useDispatch();

  const handleUpdate = async () => {
    const userId = user._id;
    dispatch(updateUser({ userId, updateData:updatedUser }));
    setEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  return (
    <div className="bg-[#caf0f8] shadow-md rounded-lg overflow-hidden p-1 ">
      <img
        className="w-full object-contain aspect-square border border-[#caf0f8] rounded-full p-1"
        src={user.avatar}
        alt={`${user.first_name} ${user.last_name}`}
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">
          {editing ? (
            <>
              <input
                type="text"
                name="first_name"
                value={updatedUser.first_name || user.first_name}
                onChange={handleChange}
                className="bg-transparent border-b border-gray-400 mr-2"
              />
              <input
                type="text"
                name="last_name"
                value={updatedUser.last_name || user.last_name}
                onChange={handleChange}
                className="bg-transparent border-b border-gray-400"
              />
            </>
          ) : (
            `${user.first_name} ${user.last_name}`
          )}
        </h2>
        <p className="text-gray-600 mb-2">
          <MdMailOutline className="inline mr-1" />
          {editing ? (
            <input
              type="email"
              name="email"
              value={updatedUser.email || user.email}
              onChange={handleChange}
              className="bg-transparent border-b border-gray-400"
            />
          ) : (
            user.email
          )}
        </p>
        <p className="text-gray-600 mb-2">
          {user.gender === "Male" ? (
            <FaMale className="inline mr-1" />
          ) : (
            <FaFemale className="inline mr-1" />
          )}
          {user.gender}
        </p>
        <p className="text-gray-600 mb-2">
          <CgWorkAlt className="inline mr-1" />
          {editing ? (
            <input
              type="text"
              name="domain"
              value={updatedUser.domain || user.domain}
              onChange={handleChange}
              className="bg-transparent border-b border-gray-400"
            />
          ) : (
            user.domain
          )}
        </p>
        <p className="text-gray-600 mb-2">
          <span
            className={`inline-block w-3 h-3 rounded-full mx-1 ${
              user.available ? "bg-green-500" : "bg-red-500"
            }`}
          ></span>
          Available:
          {editing ? (
            <select
              name="available"
              value={updatedUser.available || user.available}
              onChange={handleChange}
              className="bg-transparent border-b border-gray-400"
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          ) : user.available ? (
            "Yes"
          ) : (
            "No"
          )}
        </p>
        {editing ? (
          <button
            onClick={handleUpdate}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
          >
            Update
          </button>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
          >
            <BiEdit className="mr-1" /> Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default UserCard;
