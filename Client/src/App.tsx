import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import ProtectedRoute from "./Components/ProtectedRoute";
import LoginForm from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import EventsPage from "./Pages/EventsPage";
import SocietiesPage from "./Pages/SocietiesPage";
import UserSettingsPage from "./Pages/UserSettingsPage";
import Navbar from "./Components/Navbar";
import RegisterForm from "./Pages/RegisterPage";
import SplashPage from "./Pages/SplashPage";
import NotFoundPage from "./Pages/NotFoundPage";

// TODO CURRENTLY NOTHING HAPPENS ON SCROLL, NAVBAR SHOULD HIDE ON SCROLL DOWN AND SHOW ON SCROLL UP
const LayoutWithSidebar = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 100], [0, -100]);

  return (
    <div className="flex h-screen bg-white">
      <motion.div style={{ y }}>
        <Navbar />
      </motion.div>
      <div className="flex-grow overflow-auto mt-16">
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
