import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Landing } from './pages/Landing';
import { TodayMarket } from './pages/TodayMarket';
import { Result } from './pages/Result';
import { Leaderboard } from './pages/Leaderboard';
import { Profile } from './pages/Profile';
import { Toaster } from './components/ui/sonner';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useApp();
  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
}

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/today"
          element={
            <ProtectedRoute>
              <TodayMarket />
            </ProtectedRoute>
          }
        />
        <Route
          path="/result"
          element={
            <ProtectedRoute>
              <Result />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/me"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster position="top-center" />
    </Router>
  );
}

export default function App() {
  return (
    <AppProvider>
      <div className="dark">
        <AppRoutes />
      </div>
    </AppProvider>
  );
}
