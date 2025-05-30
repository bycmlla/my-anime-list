import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import AddWorkForm from "../components/AddWorkForm/AddWorkForm";
import WorkDetails from "../pages/WorkDetails/WorkDetails";
import Login from "../components/Login";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<AddWorkForm />} />
      <Route path="/obras/:id" element={<WorkDetails/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
  );
};

export default AppRoutes;
