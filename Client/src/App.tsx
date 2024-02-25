import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import LoginForm from './Components/Forms/LoginForm';
import HomePage from './Pages/HomePage';
import EventsPage from './Pages/EventsPage';
import SocietiesPage from './Pages/SocietiesPage';
import UserSettingsPage from './Pages/UserSettingsPage';
import Sidebar from './Components/Sidebar/Sidebar';
import RegisterForm from './Components/Forms/RegisterForm';
import SplashPage from './Pages/SplashPage';

// Define a layout component that includes the sidebar
const LayoutWithSidebar = () => {
  return (
    <div className="flex h-screen bg-luni-light-blue">
      <Sidebar />
      <div className="flex-grow p-4 overflow-auto">
        <Outlet /> {/* This will render the content of the routed pages */}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router basename='/UniSphere'>
      <Routes>
        {/* The login form is separate and does not include the sidebar */}
        <Route path="/" element={<SplashPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        
        {/* Nested routes for the main layout with the sidebar */}
        <Route element={<LayoutWithSidebar />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/societies" element={<SocietiesPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/settings" element={<UserSettingsPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
