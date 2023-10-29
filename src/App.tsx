import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CrudPage from "./pages/SkillsPage";
import useAuth from "./store/auth";
import AdminLayout from "./components/layout/AdminLayout";
import RegisterPage from "./pages/RegisterPage";
import PortfoliosPage from "./pages/PortfoliosPage";
import ExperiencePage from "./pages/ExperiencePage";
import EducationPage from "./pages/EducationPage";
import MessagesPage from "./pages/MessagesPage";
import DashboardPage from "./pages/DashboardPage";
import SettingsPage from "./pages/SettingsPage";
import LogOut from "./pages/LogOut";

function App() {
  // const { isAuthenticated, user } = useAuth();
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const user = useAuth((state) => state.user);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            (isAuthenticated && user?.role === "client") ||
            user?.role === "admin" ? (
              <AdminLayout />
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route path="skills" element={<CrudPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="portfolios" element={<PortfoliosPage />} />
          <Route path="experiences" element={<ExperiencePage />} />
          <Route path="education" element={<EducationPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="logout" element={<LogOut />} />
        </Route>
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
