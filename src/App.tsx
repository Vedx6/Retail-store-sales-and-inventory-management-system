import { useState } from "react";
import { LoginPage } from "./components/LoginPage";
import { DashboardLayout } from "./components/DashboardLayout";
import { DashboardPage } from "./components/DashboardPage";
import { ProductsPage } from "./components/ProductsPage";
import { SalesPage } from "./components/SalesPage";
import { ReportsPage } from "./components/ReportsPage";
import { UsersPage } from "./components/UsersPage";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
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
      default:
        return <DashboardPage />;
    }
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
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
