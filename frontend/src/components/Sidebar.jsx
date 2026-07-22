import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaLayerGroup,
  FaBuilding,
  FaTags,
  FaMapMarkerAlt,
  FaFileInvoiceDollar,
  FaFileInvoice,
  FaMoneyCheckAlt,
  FaUserShield,
  FaChartBar,
  FaSignOutAlt,
} from "react-icons/fa";

import "../styles/Sidebar.css";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
    { name: "Groups", path: "/groups", icon: <FaLayerGroup /> },
    { name: "Chains", path: "/chains", icon: <FaBuilding /> },
    { name: "Brands", path: "/brands", icon: <FaTags /> },
    { name: "Subzones", path: "/subzones", icon: <FaMapMarkerAlt /> },
    { name: "Estimates", path: "/estimates", icon: <FaFileInvoiceDollar /> },
    { name: "Invoices", path: "/invoices", icon: <FaFileInvoice /> },
  ];

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <aside className="sidebar">

      <div>

        <div className="sidebar-logo">
          <h2>Nexus IMS</h2>
          <p>Management System</p>
        </div>

        <ul className="sidebar-menu">

          {menuItems.map((item) => (

            <li key={item.path}>

              <Link
                to={item.path}
                className={location.pathname === item.path ? "active" : ""}
              >

                <span className="menu-icon">
                  {item.icon}
                </span>

                {item.name}

              </Link>

            </li>

          ))}

        </ul>

      </div>

      <div className="sidebar-footer">

        <button
          className="logout-btn"
          onClick={handleLogout}
        >

          <FaSignOutAlt />

          Logout

        </button>

      </div>

    </aside>
  );
}

export default Sidebar;