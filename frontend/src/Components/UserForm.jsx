import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userReducer";

const UserForm = ({ setShowUserForm }) => {
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    domain: "",
    available: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("/api/users", userData);
      if (data.success) {
        toast.success(data.message);
        dispatch(addUser(data.user));
      }
    } catch (error) {
      setError(error.data.data.message);
    }
    setLoading(false);
    setShowUserForm(false);
  };

  return (
    <div className="mx-auto px-4 py-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add New User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            name="first_name"
            value={userData.first_name}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="last_name"
            value={userData.last_name}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <select
            name="gender"
            value={userData.gender}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="domain"
            value={userData.domain}
            onChange={handleChange}
            placeholder="Domain"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label>
            Available:
            <input
              type="checkbox"
              name="available"
              checked={userData.available}
              onChange={(e) =>
                setUserData({ ...userData, available: e.target.checked })
              }
              className="ml-2"
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 font-semibold text-sm  bg-cyan-500 text-white rounded-full shadow-sm"
        >
          {loading ? "Adding..." : "Add User"}
        </button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default UserForm;
