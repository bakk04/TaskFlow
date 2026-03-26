import { Routes, Route, Navigate } from 'react-router-dom';
//import { useAuth } from './features/auth/AuthContext';

// Composants
import Dashboard from './pages/Dashboard';
import ProjectDetail from './pages/ProjectDetail';
import ProtectedRoute from './components/ProtectedRoute';
//import LoginMUI from './features/auth/LoginMUI.tsx';
import LoginBS from './features/auth/LoginBS.tsx';

// 1. Le composant principal qui gère la navigation
export default function App() {
    return (
        <Routes>
            <Route path="/login" element={<LoginBS />} />

            <Route path="/dashboard" element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            } />

            <Route path="/projects/:id" element={
                <ProtectedRoute>
                    <ProjectDetail />
                </ProtectedRoute>
            } />

            {/* Redirections */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
    );
}