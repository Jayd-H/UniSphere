import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import HomePage from './Pages/HomePage';
import EventsPage from './Pages/EventsPage';
import SocietiesPage from './Pages/SocietiesPage';
import UserSettingsPage from './Pages/UserSettingsPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<LoginForm />} />
        <Route path="/events" element={<EventsPage/>} />
        <Route path="/societies" element={<SocietiesPage />} />
        <Route path="/settings" element={<UserSettingsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
