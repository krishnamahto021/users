import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserList from "./Pages/UserList";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <ToastContainer />
        <UserList />
      </Provider>
    </>
  );
};

export default App;
