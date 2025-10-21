import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Programs from './pages/Programs';
import EnrolNow from './pages/EnrolNow';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Success from './pages/Success';
import Waiver from './pages/Waiver';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import CookiePolicy from './pages/CookiePolicy';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Enroll from './pages/Enroll';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/programs" element={<Programs />} />
      <Route path="/enrol" element={<EnrolNow />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/success" element={<Success />} />
      <Route path="/waiver" element={<Waiver />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/cookie-policy" element={<CookiePolicy />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/enroll" element={<Enroll />} />
    </Routes>
  );
}

export default App;