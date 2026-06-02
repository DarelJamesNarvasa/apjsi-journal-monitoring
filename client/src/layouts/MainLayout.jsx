import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function MainLayout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Header />
        <section className="page-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default MainLayout;