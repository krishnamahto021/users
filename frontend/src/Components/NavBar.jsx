import React, { useState } from "react";
import { MdSearch, MdList } from "react-icons/md"; // Import the MdList icon
import { RiUserAddLine, RiTeamFill } from "react-icons/ri";
import UserForm from "./UserForm";
import TeamForm from "./TeamForm";
import TeamList from "../Pages/TeamList";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserForm, setShowUserForm] = useState(false);
  const [showTeamForm, setShowTeamForm] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showTeamListModal, setShowTeamListModal] = useState(false); // State for team list modal

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    // Perform search based on searchQuery
  };

  const openUserForm = () => {
    setShowUserForm(true);
  };

  const openTeamForm = () => {
    setShowTeamForm(true);
  };

  const openTeamListModal = () => {
    setShowTeamListModal(true);
  };

  return (
    <nav className="bg-gradient-to-r from-[#0077b6] to-[#0096c7] p-2 max-w-[100vw] flex justify-center gap-8 items-center  ">
      <div className="flex items-center ">
        <MdSearch
          className="cursor-pointer text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl shadow-xl p-2 rounded-full hover:scale-125 duration-500 "
          onClick={() => setShowSearchModal(true)}
        />
      </div>
      <div className="flex items-center gap-10">
        <RiUserAddLine
          className="cursor-pointer text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl shadow-xl p-2 rounded-full hover:scale-125  duration-500"
          onClick={openUserForm}
        />
        <RiTeamFill
          className="cursor-pointer text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl shadow-xl p-2 rounded-full hover:scale-125 duration-500"
          onClick={openTeamForm}
        />
        <MdList // Add the MdList icon for the team list
          className="cursor-pointer text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl shadow-xl p-2 rounded-full hover:scale-125 duration-500"
          onClick={openTeamListModal}
        />
      </div>
      {showSearchModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-md shadow-lg">
            <div className="text-gray-900">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search..."
                className="px-3 py-1 rounded-md mr-4 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            <button
              onClick={() => setShowSearchModal(false)}
              className="px-4 w-full py-2 font-semibold text-sm  bg-cyan-500 text-white rounded-full shadow-sm mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {showUserForm && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-md shadow-lg w-1/2">
            <UserForm setShowUserForm={setShowUserForm} />
            <button
              onClick={() => setShowUserForm(false)}
              className="px-4 w-full py-2 font-semibold text-sm  bg-cyan-500 text-white rounded-full shadow-sm mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {showTeamForm && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-md shadow-lg w-1/2">
            <TeamForm setShowTeamForm={setShowTeamForm} />
            <button
              onClick={() => setShowTeamForm(false)}
              className="px-4 w-full py-2 font-semibold text-sm  bg-cyan-500 text-white rounded-full shadow-sm mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {showTeamListModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-md shadow-lg w-1/2">
            <TeamList setShowTeamListModal={setShowTeamListModal} />
            <button
              onClick={() => setShowTeamListModal(false)}
              className="px-4 w-full py-2 font-semibold text-sm  bg-cyan-500 text-white rounded-full shadow-sm mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
