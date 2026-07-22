import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/dashboard.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaFileInvoice,
  FaMoneyBillWave,
  FaPlusCircle,
  FaClipboardList,
  FaLayerGroup,
  FaProjectDiagram,
  FaMapMarkedAlt,
  FaUserPlus,
  FaCreditCard,
} from "react-icons/fa";
import { brandService } from "../services/brandService";
import { chainService } from "../services/chainService";
import { groupService } from "../services/groupService";
import { subzoneService } from "../services/subzoneService";
import { estimateService } from "../services/estimateService";
import { invoiceService } from "../services/invoiceService";

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalBrands: 0,
    totalChains: 0,
    totalGroups: 0,
    totalSubzones: 0,
    totalEstimates: 0,
    totalInvoices: 0,
    estimatesPending: 0,
    invoicesPaid: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
      return;
    }

    const fetchDashboardStats = async () => {
      try {
        setLoading(true);

        const [brands, chains, groups, subzones, estimates, invoices] = await Promise.all([
          brandService.getAllBrands(),
          chainService.getAllChains(),
          groupService.getAllGroups(),
          subzoneService.getAllSubzones(),
          estimateService.getAllEstimates(),
          invoiceService.getAllInvoices(),
        ]);

        const estimatesPending = Array.isArray(estimates)
          ? estimates.filter(
              (e) => e.status === "PENDING" || e.status === "pending"
            ).length
          : 0;

        const invoicesPaid = Array.isArray(invoices)
          ? invoices.filter(
              (i) => i.status === "PAID" || i.status === "paid"
            ).length
          : 0;

        setStats({
          totalBrands: Array.isArray(brands) ? brands.length : 0,
          totalChains: Array.isArray(chains) ? chains.length : 0,
          totalGroups: Array.isArray(groups) ? groups.length : 0,
          totalSubzones: Array.isArray(subzones) ? subzones.length : 0,
          totalEstimates: Array.isArray(estimates) ? estimates.length : 0,
          totalInvoices: Array.isArray(invoices) ? invoices.length : 0,
          estimatesPending,
          invoicesPaid,
        });

        setError(null);
      } catch (err) {
        console.error("❌ Error fetching dashboard stats:", err);
        setError(err.response?.data?.message || "Failed to load dashboard data");

        // Set default values on error
        setStats({
          totalBrands: 0,
          totalChains: 0,
          totalGroups: 0,
          totalSubzones: 0,
          totalEstimates: 0,
          totalInvoices: 0,
          estimatesPending: 0,
          invoicesPaid: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  const handleQuickAction = (action) => {
    console.log("📌 Quick action clicked:", action);
    // Add navigation logic here later
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-content">
        <Navbar />

        <div className="dashboard-body">
          <h2>Welcome Back 👋</h2>

          <p>Here's what's happening in Nexus IMS today.</p>

          {error && (
            <div className="error-message" style={{ color: "red", margin: "10px 0" }}>
              ⚠️ {error}
            </div>
          )}

          {loading ? (
            <div style={{ padding: "20px", textAlign: "center" }}>
              ⏳ Loading dashboard...
            </div>
          ) : (
            <>
              <div className="cards">
                <div className="card">
                  <div className="card-icon blue">
                    <FaLayerGroup />
                  </div>

                  <h3>Total Brands</h3>

                  <h1>{stats.totalBrands}</h1>

                  <span>Brand records from backend</span>
                </div>

                <div className="card">
                  <div className="card-icon orange">
                    <FaProjectDiagram />
                  </div>

                  <h3>Total Chains</h3>

                  <h1>{stats.totalChains}</h1>

                  <span>Chain records from backend</span>
                </div>

                <div className="card">
                  <div className="card-icon green">
                    <FaFileInvoice />
                  </div>
                  <h3>Total Invoices</h3>
                  <h1>{stats.totalInvoices}</h1>
                  <span>{stats.invoicesPaid} Paid</span>
                </div>

                <div className="card">
                  <div className="card-icon red">
                    <FaMapMarkedAlt />
                  </div>
                  <h3>Total Subzones</h3>
                  <h1>{stats.totalSubzones}</h1>
                  <span>Subzone records from backend</span>
                </div>
              </div>

              {/* Dashboard Grid */}

              <div className="dashboard-grid">
                <div className="dashboard-box">
                  <h3>⚡ Quick Actions</h3>

                  <button onClick={() => handleQuickAction("addClient")}>
                    <FaUserPlus />
                    Add Client
                  </button>

                  <button onClick={() => handleQuickAction("createEstimate")}>
                    <FaPlusCircle />
                    Create Estimate
                  </button>

                  <button onClick={() => handleQuickAction("generateInvoice")}>
                    <FaFileInvoice />
                    Generate Invoice
                  </button>

                  <button onClick={() => handleQuickAction("addPayment")}>
                    <FaCreditCard />
                    Add Payment
                  </button>
                </div>

                <div className="dashboard-box">
                  <h3>
                    <FaClipboardList />
                    Recent Activities
                  </h3>

                  <ul>
                    <li>✅ Dashboard loaded successfully</li>

                    <li>📄 {stats.totalInvoices} Total Invoices</li>

                    <li>💳 {stats.totalPayments} Payments Processed</li>

                    <li>👤 {stats.totalUsers} Active Users</li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;