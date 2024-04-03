import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";
import LoginForm from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import EventsPage from "./Pages/EventsPage";
import SocietiesPage from "./Pages/SocietiesPage";
import UserSettingsPage from "./Pages/UserSettingsPage";
import RegisterForm from "./Pages/RegisterPage";
import SplashPage from "./Pages/SplashPage";
import NotFoundPage from "./Pages/NotFoundPage";
import { UserProvider } from "./UserContext";
import LayoutWithNavbar from "./Components/LayoutWithNavbar";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Separate routes for pages outside the main authenticated layout */}
          <Route path="/" element={<SplashPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="*" element={<NotFoundPage />} />

          {/* Wrap the layout route with ProtectedRoute to protect all child routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<LayoutWithNavbar />}>
              <Route path="/home" element={<HomePage />} />
              <Route path="/societies" element={<SocietiesPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/settings" element={<UserSettingsPage />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
