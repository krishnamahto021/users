import React from "react";
import UserCard from "./Components/UserCard";

const App = () => {
  return (
    <>
      <UserCard
        user={{
          id: 1,
          first_name: "Anet",
          last_name: "Doe",
          email: "adoe0@comcast.net",
          gender: "Female",
          avatar:
            "https://robohash.org/sintessequaerat.png?size=50x50&set=set1",
          domain: "Sales",
          available: false,
        }}
      />
    </>
  );
};

export default App;
