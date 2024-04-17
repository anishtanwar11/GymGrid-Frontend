import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./pages/Navbar/Navigation";
import Dashboard from "./pages/UserDashbord/Dashbord";
import Exercise from "./pages/Exercise/Exercise";
import Home from "./pages/Home/Home";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import TopNav from "./components/TopNav";
import Profile from "./components/Profile";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

function App() {
  return (
    <Router>
      <div className="flex flex-col">
        <TopNav />
        <div className="flex flex-row w-full">
          <div className="">
            <Navigation />
          </div>
          <div className="w-full flex pt-14  h-screen ">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<SignupForm />} />
              <Route path="/forgotPassword" element={<ForgotPassword />} />
              <Route path="/resetPassword/:token" element={<ResetPassword />} />

              <Route path="/profile/:userName" element={<Profile />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/exercise" element={<Exercise />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
