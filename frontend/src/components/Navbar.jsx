import {
  FaBell,
  FaChevronDown,
} from "react-icons/fa";

import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      {/* Left */}
      <div className="navbar-left">

        <div className="page-title">
          <h2>Dashboard</h2>
          <p>Welcome back 👋</p>
        </div>

      </div>

      {/* Right */}
      <div className="navbar-right">



        {/* Notification */}

        <button
            className="icon-btn"
            onClick={() => alert("No new notifications")}
        >
        <FaBell />
        <span className="notification-dot"></span>
        </button>

        

        {/* Profile */}

        <div className="profile">

          <div className="avatar">
            A
          </div>

          <div className="profile-info">

            <h4>Admin</h4>

            <span>Administrator</span>

          </div>

          <FaChevronDown className="down-icon"/>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;