import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/payments.css";

function Payments() {

  const payments = [
    {
      id: 1,
      paymentId: "PAY-1001",
      invoice: "INV-1001",
      client: "ABC Pvt Ltd",
      amount: "₹25,000",
      mode: "UPI",
      status: "Success",
    },
    {
      id: 2,
      paymentId: "PAY-1002",
      invoice: "INV-1002",
      client: "XYZ Industries",
      amount: "₹40,000",
      mode: "Bank Transfer",
      status: "Pending",
    },
    {
      id: 3,
      paymentId: "PAY-1003",
      invoice: "INV-1003",
      client: "Tech Solutions",
      amount: "₹18,500",
      mode: "Cash",
      status: "Failed",
    },
  ];

  return (
    <div className="dashboard-layout">

      <Sidebar />

      <div className="dashboard-content">

        <Navbar />

        <div className="page-content">

          <div className="page-header">
            <h2>Payments</h2>
            <button className="add-btn">+ Add Payment</button>
          </div>

          <div className="search-box">
            <input type="text" placeholder="Search Payment..." />
          </div>

          <div className="table-container">

            <table>

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Payment ID</th>
                  <th>Invoice</th>
                  <th>Client</th>
                  <th>Amount</th>
                  <th>Mode</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {payments.map((payment) => (

                  <tr key={payment.id}>

                    <td>{payment.id}</td>
                    <td>{payment.paymentId}</td>
                    <td>{payment.invoice}</td>
                    <td>{payment.client}</td>
                    <td>{payment.amount}</td>
                    <td>{payment.mode}</td>

                    <td>
                      <span className={
                        payment.status === "Success"
                          ? "status approved"
                          : payment.status === "Pending"
                          ? "status pending"
                          : "status rejected"
                      }>
                        {payment.status}
                      </span>
                    </td>

                    <td>
                      <button className="edit-btn">Edit</button>
                      <button className="delete-btn">Delete</button>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Payments;