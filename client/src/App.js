import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import DriverList from "./components/DriverList";
import CreateDriver from "./components/CreateDriver";
import Navbar from "./components/Navbar";
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/drivers" element={<DriverList />} />
        <Route path="/create-driver" element={<CreateDriver />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
