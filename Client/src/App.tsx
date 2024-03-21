import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";
import LoginForm from "./Components/Forms/LoginForm";
import HomePage from "./Pages/HomePage";
import EventsPage from "./Pages/EventsPage";
import SocietiesPage from "./Pages/SocietiesPage";
import UserSettingsPage from "./Pages/UserSettingsPage";
import Sidebar from "./Components/Sidebar/Sidebar";
import RegisterForm from "./Components/Forms/RegisterForm";
import SplashPage from "./Pages/SplashPage";
import NotFoundPage from "./Pages/NotFoundPage";

const LayoutWithSidebar = () => {
  return (
    <div className="flex h-screen bg-luni-light-blue">
      <Sidebar />
      <div className="flex-grow p-4 overflow-auto">
        <Outlet /> {/* Render child routes */}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Separate routes for pages outside the main authenticated layout */}
        <Route path="/" element={<SplashPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="*" element={<NotFoundPage />} />

        {/* Wrap the layout route with ProtectedRoute to protect all child routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<LayoutWithSidebar />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/societies" element={<SocietiesPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/settings" element={<UserSettingsPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
