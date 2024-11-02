import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { HowItWorks } from './pages/HowItWorks';
import { ForMovers } from './pages/ForMovers';
import { CreateMove } from './pages/CreateMove';
import { MoveDetails } from './pages/MoveDetails';

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <Home />
          </>
        }
      />
      <Route
        path="/how-it-works"
        element={
          <>
            <Navbar />
            <HowItWorks />
          </>
        }
      />
      <Route
        path="/movers"
        element={
          <>
            <Navbar />
            <ForMovers />
          </>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/moves/new" element={<CreateMove />} />
      <Route path="/moves/:id" element={<MoveDetails />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <NotificationProvider>
          <AppRoutes />
        </NotificationProvider>
      </AuthProvider>
    </Router>
  );
}