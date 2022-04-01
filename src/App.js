import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Registration from "./pages/Registration";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import WelcomePage from "./pages/WelcomePage";

const App = () => {
  const token = useSelector((state) => state.form.token);

  return (
    <Router>
      <Header />
      <Routes>{!token && <Route path="/" element={<WelcomePage />} />}</Routes>
      <Routes>
        {!token && (
          <Route
            path="/api/users/forgotPassword"
            element={<ForgotPassword />}
          />
        )}
      </Routes>
      <Routes>
        {token && (
          <Route
            path="/api/users/resetPassword/:token"
            element={<ResetPassword />}
          />
        )}
      </Routes>
      <Routes>{token && <Route path="/api/users" element={<Home />} />}</Routes>
      <Routes>
        {!token && (
          <Route path="api/users/registration" element={<Registration />} />
        )}
      </Routes>
      <Routes>
        <Route path="api/users/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};
export default App;
