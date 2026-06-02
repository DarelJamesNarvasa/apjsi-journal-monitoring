import { User, ChevronDown } from "lucide-react";

function Header() {
  return (
    <header className="top-header">
      <div>
        <h1>Dashboard</h1>
        <p>Retrieve and export all journal submissions</p>
      </div>

      <div className="user-profile">
        <User size={18} />
        <span>APJSI Manager MSU-IIT</span>
        <ChevronDown size={16} />
      </div>
    </header>
  );
}

export default Header;