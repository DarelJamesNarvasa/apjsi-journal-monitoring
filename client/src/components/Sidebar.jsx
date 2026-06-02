import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import {
  LayoutDashboard,
  FileText,
  Download,
  Settings,
  Logs,
  Info,
  BookOpen,
} from "lucide-react";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <img src={logo} alt="APJSI Logo" className="sidebar-logo" />

        <div>
            <h2>APJSI</h2>
            <p>Monitoring System</p>
        </div>
        </div>

      <nav className="sidebar-menu">
        <NavLink to="/" end>
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink to="/submissions">
          <FileText size={20} />
          Submissions
        </NavLink>

        <NavLink to="/export">
          <Download size={20} />
          Export
        </NavLink>

        <NavLink to="/settings">
          <Settings size={20} />
          Settings
        </NavLink>

        <NavLink to="/logs">
          <Logs size={20} />
          Logs
        </NavLink>

        <NavLink to="/about">
          <Info size={20} />
          About
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;