import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import JobDetail from './pages/JobDetail';
import MapView from './pages/MapView';
import JobHistory from './pages/JobHistory';
import Profile from './pages/Profile';
import Wallet from './pages/Wallet';
import Notifications from './pages/Notifications';
import BottomNav from './components/BottomNav';

const Layout = () => (
  <>
    <Outlet />
    <BottomNav />
  </>
);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Mock auth state

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/job/:id" element={<JobDetail />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/history" element={<JobHistory />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/notifications" element={<Notifications />} />
        </Route>

        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
