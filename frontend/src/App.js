import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SignUpPage from "./Pages/SignUpPage";
import SignInPage from "./Pages/SignInPage";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
      </Routes>
    </>
  );
}

export default App;
