import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDomains,
  fetchUsersByDomain,
  teamSelector,
} from "../redux/teamReducer";
import axios from "axios";
import { toast } from "react-toastify";

const TeamForm = ({ setShowTeamForm }) => {
  const dispatch = useDispatch();
  const { domains, users, loadingDomains, loadingUsers } =
    useSelector(teamSelector);
  const [teamName, setTeamName] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    dispatch(fetchDomains());
  }, [dispatch]);

  useEffect(() => {
    if (selectedDomain) {
      dispatch(fetchUsersByDomain({ selectedDomain, pageNumber }));
    }
  }, [dispatch, selectedDomain]);

  const handleDomainChange = (e) => {
    const domain = e.target.value;
    setSelectedDomain(domain);
    setPageNumber(1);
  };

  const handleCheckboxChange = (e) => {
    const userId = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      const filteredUsers = selectedUsers.filter((id) => id !== userId);
      setSelectedUsers(filteredUsers);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/team/create", {
        name: teamName,
        userIds: selectedUsers,
      });
      if (response.data.success) {
        toast.success(response.data.message);
      }
      setTeamName("");
      setSelectedDomain("");
      setSelectedUsers([]);
      setShowTeamForm(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const loadMore = () => {
    setCurrentPage((p) => p + 1);
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Add New Team</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="teamName" className="block mb-1">
            Team Name:
          </label>
          <input
            type="text"
            id="teamName"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
        </div>
        <div className="mb-4 flex items-center">
          <label htmlFor="domain" className="block mr-2">
            Domain:
          </label>
          <select
            id="domain"
            value={selectedDomain}
            onChange={handleDomainChange}
            className="border border-gray-300 rounded-md p-2"
            required
          >
            <option value="">Select Domain</option>
            {loadingDomains ? (
              <option disabled>Loading...</option>
            ) : (
              domains.map((domain) => (
                <option
                  key={domain}
                  value={domain}
                  className="inline cursor-pointer"
                >
                  {domain}
                </option>
              ))
            )}
          </select>
        </div>
        <div className="mb-4 max-h-40 overflow-y-auto">
          <p className="font-semibold mb-2">Select Users:</p>
          {loadingUsers ? (
            <p>Loading users...</p>
          ) : (
            <ul className="">
              {users.map((user) => (
                <li key={user._id} className="flex items-center mb-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="cursor-pointer mr-2"
                      value={user._id}
                      onChange={handleCheckboxChange}
                      checked={selectedUsers.includes(user._id)}
                    />
                    <img
                      src={user.avatar}
                      alt={`${user.first_name} ${user.last_name}`}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <span>{`${user.first_name} ${user.last_name} - ${user.email}`}</span>
                  </label>
                </li>
              ))}
            </ul>
          )}

          <button
            className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md mt-4"
            onClick={loadMore}
          >
            Load More
          </button>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md mt-4"
        >
          Add Team
        </button>
      </form>
    </div>
  );
};

export default TeamForm;
