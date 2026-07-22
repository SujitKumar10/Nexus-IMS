import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/invoices.css";
import { useState, useEffect } from "react";
import { invoiceService } from "../services/invoiceService";

function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    invoiceNo: "",
    estimatedId: "",
    chainId: "",
    serviceDetails: "",
    qty: "",
    costPerQty: "",
    amountPayable: "",
    balance: "",
    dateOfPayment: "",
    dateOfService: "",
    deliveryDetails: "",
    emailId: "",
  });

  useEffect(() => {
    loadInvoices();
  }, []);

  useEffect(() => {
    const filtered = invoices.filter((inv) =>
      (inv.serviceDetails || "").toLowerCase().includes(search.toLowerCase()) ||
      (inv.invoiceNo || "").toString().includes(search) ||
      (inv.emailId || "").toLowerCase().includes(search.toLowerCase())
    );
    setFilteredInvoices(filtered);
  }, [search, invoices]);

  const loadInvoices = async () => {
    setLoading(true);
    setError(null);
    setMessage("");
    try {
      console.log('📋 Loading invoices...');
      const data = await invoiceService.getAllInvoices();

      if (!Array.isArray(data)) {
        throw new Error("Unexpected response from invoices API");
      }

      const ui = data.map((inv) => ({
        id: inv?.id ?? null,
        invoiceNo: inv?.invoiceNo ?? "",
        estimatedId: inv?.estimatedId ?? "",
        chainId: inv?.chainId ?? "",
        serviceDetails: inv?.serviceDetails ?? "",
        qty: inv?.qty ?? 0,
        costPerQty: inv?.costPerQty ?? 0,
        amountPayable: inv?.amountPayable ?? 0,
        balance: inv?.balance ?? 0,
        dateOfPayment: inv?.dateOfPayment ?? "",
        dateOfService: inv?.dateOfService ?? "",
        deliveryDetails: inv?.deliveryDetails ?? "",
        emailId: inv?.emailId ?? "",
        createdAt: inv?.createdAt ?? "",
        updatedAt: inv?.updatedAt ?? "",
      }));

      setInvoices(ui);
      setFilteredInvoices(ui);
      console.log('✅ Invoices loaded:', ui.length);
    } catch (err) {
      console.error("❌ Error loading invoices:", err);
      setError(err.message || "Failed to load invoices");
      setInvoices([]);
      setFilteredInvoices([]);
    } finally {
      setLoading(false);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!id) return;
    if (!window.confirm("Delete this invoice?")) return;
    try {
      await invoiceService.deleteInvoice(id);
      setMessage("Invoice deleted successfully");
      loadInvoices();
    } catch (err) {
      console.error("Delete invoice failed:", err);
      const serverMessage = err?.response?.data?.message || err?.response?.data?.error || "Delete failed";
      setMessage(serverMessage);
    }
  };

  // RESET FORM
  const resetForm = () => {
    setFormData({
      invoiceNo: "",
      estimatedId: "",
      chainId: "",
      serviceDetails: "",
      qty: "",
      costPerQty: "",
      amountPayable: "",
      balance: "",
      dateOfPayment: "",
      dateOfService: "",
      deliveryDetails: "",
      emailId: "",
    });
    setEditingId(null);
  };

  // OPEN CREATE MODAL
  const openCreateModal = () => {
    resetForm();
    setShowModal(true);
  };

  // OPEN EDIT MODAL
  const openEditModal = (invoice) => {
    setEditingId(invoice.id);
    setFormData({
      invoiceNo: invoice.invoiceNo,
      estimatedId: invoice.estimatedId,
      chainId: invoice.chainId,
      serviceDetails: invoice.serviceDetails,
      qty: invoice.qty,
      costPerQty: invoice.costPerQty,
      amountPayable: invoice.amountPayable,
      balance: invoice.balance,
      dateOfPayment: invoice.dateOfPayment,
      dateOfService: invoice.dateOfService,
      deliveryDetails: invoice.deliveryDetails,
      emailId: invoice.emailId,
    });
    setShowModal(true);
  };

  // SAVE (CREATE / UPDATE)
  const handleSave = async () => {
    const serviceDetails = formData.serviceDetails.trim();
    
    if (!serviceDetails) {
      setMessage("Service details are required");
      return;
    }

    try {
      const payload = {
        invoiceNo: formData.invoiceNo ? Number(formData.invoiceNo) : null,
        estimatedId: formData.estimatedId ? Number(formData.estimatedId) : null,
        chainId: formData.chainId ? Number(formData.chainId) : null,
        serviceDetails: serviceDetails,
        qty: formData.qty ? Number(formData.qty) : 0,
        costPerQty: formData.costPerQty ? Number(formData.costPerQty) : 0,
        amountPayable: formData.amountPayable ? Number(formData.amountPayable) : 0,
        balance: formData.balance ? Number(formData.balance) : 0,
        dateOfPayment: formData.dateOfPayment,
        dateOfService: formData.dateOfService,
        deliveryDetails: formData.deliveryDetails,
        emailId: formData.emailId,
      };

      if (editingId) {
        await invoiceService.updateInvoice(editingId, payload);
        setMessage("Invoice updated successfully");
      } else {
        await invoiceService.createInvoice(payload);
        setMessage("Invoice created successfully");
      }

      setShowModal(false);
      resetForm();
      loadInvoices();
    } catch (err) {
      console.error("Save invoice failed:", err);
      const serverMessage = err?.response?.data?.message || err?.response?.data?.error || "Save failed";
      setMessage(serverMessage);
    }
  };

  // CLOSE MODAL
  const handleCancel = () => {
    setShowModal(false);
    resetForm();
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-content">
        <Navbar />

        <div className="page-content">

          {/* MESSAGE */}
          {message && (
            <p className="status-message" style={{ color: message.includes("successfully") ? "green" : "crimson" }}>
              {message}
            </p>
          )}

          {/* HEADER */}
          <div className="page-header">
            <h2>Invoices</h2>
            <button className="add-btn" onClick={openCreateModal}>
              + Add Invoice
            </button>
          </div>

          {/* SEARCH */}
          <div className="search-box">
            <input
              type="text"
              placeholder="Search Invoice..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* TABLE */}
          <div className="table-container">

            {loading ? (
              <div style={{ padding: 16 }}>Loading...</div>
            ) : error ? (
              <div style={{ padding: 16, color: "crimson" }}>
                Error: {error}
                <br />
                <button onClick={loadInvoices} style={{ marginTop: 10 }}>Retry</button>
              </div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Invoice No</th>
                    <th>Service</th>
                    <th>Qty</th>
                    <th>Amount</th>
                    <th>Balance</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {/* Empty State */}
                  {filteredInvoices.length === 0 && (
                    <tr>
                      <td colSpan="8" style={{ textAlign: "center", padding: 20 }}>
                        No invoices found
                      </td>
                    </tr>
                  )}

                  {/* Data */}
                  {filteredInvoices.map((invoice) => (
                    <tr key={invoice.id || invoice.invoiceNo}>
                      <td>{invoice.id ?? "—"}</td>
                      <td>{invoice.invoiceNo ?? "—"}</td>
                      <td>{invoice.serviceDetails}</td>
                      <td>{invoice.qty}</td>
                      <td>₹{invoice.amountPayable}</td>
                      <td>₹{invoice.balance}</td>
                      <td>{invoice.dateOfPayment || invoice.dateOfService}</td>

                      <td>
                        <button className="edit-btn" onClick={() => openEditModal(invoice)}>
                          Edit
                        </button>
                        <button className="delete-btn" onClick={() => handleDelete(invoice.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

          </div>

          {/* MODAL */}
          {showModal && (
            <div className="modal-overlay">
              <div className="modal">
                <h2>{editingId ? "Edit Invoice" : "Add Invoice"}</h2>

                <input
                  type="number"
                  placeholder="Invoice No"
                  value={formData.invoiceNo}
                  onChange={(e) =>
                    setFormData({ ...formData, invoiceNo: e.target.value })
                  }
                />

                <input
                  type="number"
                  placeholder="Estimated ID"
                  value={formData.estimatedId}
                  onChange={(e) =>
                    setFormData({ ...formData, estimatedId: e.target.value })
                  }
                />

                <input
                  type="number"
                  placeholder="Chain ID"
                  value={formData.chainId}
                  onChange={(e) =>
                    setFormData({ ...formData, chainId: e.target.value })
                  }
                />

                <input
                  type="text"
                  placeholder="Service Details"
                  value={formData.serviceDetails}
                  onChange={(e) =>
                    setFormData({ ...formData, serviceDetails: e.target.value })
                  }
                />

                <input
                  type="number"
                  placeholder="Quantity"
                  value={formData.qty}
                  onChange={(e) =>
                    setFormData({ ...formData, qty: e.target.value })
                  }
                />

                <input
                  type="number"
                  step="0.01"
                  placeholder="Cost Per Quantity"
                  value={formData.costPerQty}
                  onChange={(e) =>
                    setFormData({ ...formData, costPerQty: e.target.value })
                  }
                />

                <input
                  type="number"
                  step="0.01"
                  placeholder="Amount Payable"
                  value={formData.amountPayable}
                  onChange={(e) =>
                    setFormData({ ...formData, amountPayable: e.target.value })
                  }
                />

                <input
                  type="number"
                  step="0.01"
                  placeholder="Balance"
                  value={formData.balance}
                  onChange={(e) =>
                    setFormData({ ...formData, balance: e.target.value })
                  }
                />

                <input
                  type="datetime-local"
                  placeholder="Date of Payment"
                  value={formData.dateOfPayment}
                  onChange={(e) =>
                    setFormData({ ...formData, dateOfPayment: e.target.value })
                  }
                />

                <input
                  type="date"
                  placeholder="Date of Service"
                  value={formData.dateOfService}
                  onChange={(e) =>
                    setFormData({ ...formData, dateOfService: e.target.value })
                  }
                />

                <input
                  type="text"
                  placeholder="Delivery Details"
                  value={formData.deliveryDetails}
                  onChange={(e) =>
                    setFormData({ ...formData, deliveryDetails: e.target.value })
                  }
                />

                <input
                  type="email"
                  placeholder="Email ID"
                  value={formData.emailId}
                  onChange={(e) =>
                    setFormData({ ...formData, emailId: e.target.value })
                  }
                />

                <div className="modal-buttons">
                  <button className="save-btn" onClick={handleSave}>
                    {editingId ? "Update" : "Save"}
                  </button>
                  <button className="cancel-btn" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}

export default Invoices;