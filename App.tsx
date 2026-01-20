
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './components/Landing';
import StudentRegister from './components/StudentRegister';
import StudentLogin from './components/StudentLogin';
import StudentDashboard from './components/StudentDashboard';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import AdmissionAssistant from './components/AdmissionAssistant';

const ProtectedRoute = ({ children, role }: { children: React.ReactNode, role: 'admin' | 'student' }) => {
  const session = sessionStorage.getItem(`${role}_session`);
  if (!session) return <Navigate to={`/${role}/login`} replace />;
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<StudentRegister />} />
          <Route path="/student/login" element={<StudentLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute role="student">
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
      <AdmissionAssistant />
    </HashRouter>
  );
};

export default App;
