import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeams, teamSelector } from "../redux/teamReducer";

const TeamModal = ({ team, onClose }) => {
  const maxVisibleUsers = 10;
  const remainingUsersCount = team.users.length - maxVisibleUsers;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center p-2">
      <div className="bg-white p-4 rounded-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">{team.name}</h2>
        <div className="flex items-center mb-4 flex-wrap">
          {team.users.slice(0, maxVisibleUsers).map((user, index) => (
            <div key={index} className=" mr-5 ">
              <img
                src={user.avatar}
                alt={user.first_name}
                className="w-10 h-10 rounded-full mr-2"
              />
              <p>{user.first_name}</p>
            </div>
          ))}
          {remainingUsersCount > 0 && (
            <div className="flex items-center mr-2">
              <div className="w-10 h-10 bg-blue-500 p-1 text-white rounded-full flex items-center justify-center mr-2">
                +{remainingUsersCount}
              </div>
              <span> more</span>
            </div>
          )}
        </div>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const TeamList = () => {
  const dispatch = useDispatch();
  const { teams, loadingTeams, error } = useSelector(teamSelector);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);

  const handleOpenModal = (team) => {
    setSelectedTeam(team);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Team List</h2>
      {loadingTeams ? (
        <p>Loading teams...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {teams.map((team) => (
            <div
              key={team._id}
              className="bg-white rounded-md shadow-md p-4 flex flex-col items-center cursor-pointer"
              onClick={() => handleOpenModal(team)}
            >
              <h3 className="text-lg font-semibold mb-2">{team.name}</h3>
              <div className="flex items-center justify-center">
                {team.users.slice(0, 3).map((user, index) => (
                  <img
                    key={user._id}
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full mr-2"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      {showModal && selectedTeam && (
        <TeamModal team={selectedTeam} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default TeamList;
