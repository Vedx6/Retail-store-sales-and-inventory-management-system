import { useState } from "react";
import { LoginPage } from "./components/LoginPage";
import { DashboardLayout } from "./components/DashboardLayout";
import { DashboardPage } from "./components/DashboardPage";
import { ProductsPage } from "./components/ProductsPage";
import { SalesPage } from "./components/SalesPage";
import { ReportsPage } from "./components/ReportsPage";
import { UsersPage } from "./components/UsersPage";
import { RegistrationPage } from "./components/RegistrationPage";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [authPage, setAuthPage] = useState<"login" | "register">("login");

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setCurrentPage("dashboard");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardPage />;
      case "products":
        return <ProductsPage />;
      case "sales":
        return <SalesPage />;
      case "reports":
        return <ReportsPage />;
      case "users":
        return <UsersPage />;
      case "register":
        return <RegistrationPage />;
      default:
        return <DashboardPage />;
    }
  };

  if (!isLoggedIn) {
    return authPage === "login" ? (
      <LoginPage onLogin={handleLogin} onGoRegister={() => setAuthPage("register")} />
    ) : (
      <RegistrationPage onGoLogin={() => setAuthPage("login")} />
    );
  }

  return (
    <div className="dark">
      <DashboardLayout
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onLogout={handleLogout}
      >
        {renderPage()}
      </DashboardLayout>
    </div>
  );
}
