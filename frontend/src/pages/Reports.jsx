import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/reports.css";

function Reports() {

  const reportData = [
    { title: "Total Clients", value: 120 },
    { title: "Total Estimates", value: 45 },
    { title: "Total Invoices", value: 38 },
    { title: "Total Payments", value: 30 },
    { title: "Total Revenue", value: "₹8,50,000" },
    { title: "Pending Invoices", value: 8 },
  ];

  return (
    <div className="dashboard-layout">

      <Sidebar />

      <div className="dashboard-content">

        <Navbar />

        <div className="page-content">

          <div className="page-header">

            <h2>Reports</h2>

            <button className="add-btn">
              Download Report
            </button>

          </div>

          <div className="report-grid">

            {reportData.map((item, index) => (

              <div className="report-card" key={index}>

                <h3>{item.title}</h3>

                <h1>{item.value}</h1>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Reports;