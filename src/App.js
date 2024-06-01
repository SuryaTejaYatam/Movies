import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import UserSignIn from "./UserSignIn";
import UserSignUp from "./UserSignUp";
import HomePage from "./HomePage";
import ListOfSelectedMovies from "./ListOfSelectedMovies";

const App = () => {
  return (
    <HashRouter>
      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<UserSignIn />} />
          <Route path="/userSignIn" element={<UserSignIn />} />
          <Route path="/userSignUp" element={<UserSignUp />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/listOfSelectedMovies" element={<ListOfSelectedMovies />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;
