import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/estimates.css";
import { useState, useEffect } from "react";
import { estimateService } from "../services/estimateService";

function Estimates() {
  const [estimates, setEstimates] = useState([]);
  const [filteredEstimates, setFilteredEstimates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    chainId: "",
    groupName: "",
    brandName: "",
    zoneName: "",
    service: "",
    qty: "",
    costPerUnit: "",
    totalCost: "",
    deliveryDate: "",
    deliveryDetails: "",
  });

  useEffect(() => {
    loadEstimates();
  }, []);

  useEffect(() => {
    const filtered = estimates.filter((e) =>
      (e.service || "").toLowerCase().includes(search.toLowerCase()) ||
      (e.groupName || "").toLowerCase().includes(search.toLowerCase()) ||
      (e.brandName || "").toLowerCase().includes(search.toLowerCase())
    );
    setFilteredEstimates(filtered);
  }, [search, estimates]);

  const loadEstimates = async () => {
    setLoading(true);
    setError(null);
    setMessage("");
    try {
      console.log('📋 Loading estimates...');
      const data = await estimateService.getAllEstimates();

      if (!Array.isArray(data)) {
        throw new Error("Unexpected response from estimates API");
      }

      const ui = data.map((e) => ({
        id: e?.estimatedId ?? e?.id ?? null,
        estimatedId: e?.estimatedId ?? e?.id ?? null,
        chainId: e?.chainId ?? "",
        groupName: e?.groupName ?? "",
        brandName: e?.brandName ?? "",
        zoneName: e?.zoneName ?? "",
        service: e?.service ?? "",
        qty: e?.qty ?? 0,
        costPerUnit: e?.costPerUnit ?? 0,
        totalCost: e?.totalCost ?? 0,
        deliveryDate: e?.deliveryDate ?? "",
        deliveryDetails: e?.deliveryDetails ?? "",
        createdAt: e?.createdAt ?? "",
        updatedAt: e?.updatedAt ?? "",
      }));

      setEstimates(ui);
      setFilteredEstimates(ui);
      console.log('✅ Estimates loaded:', ui.length);
    } catch (err) {
      console.error("❌ Error loading estimates:", err);
      setError(err.message || "Failed to load estimates");
      setEstimates([]);
      setFilteredEstimates([]);
    } finally {
      setLoading(false);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!id) return;
    if (!window.confirm("Delete this estimate?")) return;
    try {
      await estimateService.deleteEstimate(id);
      setMessage("Estimate deleted successfully");
      loadEstimates();
    } catch (err) {
      console.error("Delete estimate failed:", err);
      const serverMessage = err?.response?.data?.message || err?.response?.data?.error || "Delete failed";
      setMessage(serverMessage);
    }
  };

  // RESET FORM
  const resetForm = () => {
    setFormData({
      chainId: "",
      groupName: "",
      brandName: "",
      zoneName: "",
      service: "",
      qty: "",
      costPerUnit: "",
      totalCost: "",
      deliveryDate: "",
      deliveryDetails: "",
    });
    setEditingId(null);
  };

  // OPEN CREATE MODAL
  const openCreateModal = () => {
    resetForm();
    setShowModal(true);
  };

  // OPEN EDIT MODAL
  const openEditModal = (estimate) => {
    setEditingId(estimate.id);
    setFormData({
      chainId: estimate.chainId,
      groupName: estimate.groupName,
      brandName: estimate.brandName,
      zoneName: estimate.zoneName,
      service: estimate.service,
      qty: estimate.qty,
      costPerUnit: estimate.costPerUnit,
      totalCost: estimate.totalCost,
      deliveryDate: estimate.deliveryDate,
      deliveryDetails: estimate.deliveryDetails,
    });
    setShowModal(true);
  };

  // SAVE (CREATE / UPDATE)
  const handleSave = async () => {
    const serviceName = formData.service.trim();
    
    if (!serviceName) {
      setMessage("Service name is required");
      return;
    }

    try {
      const payload = {
        chainId: formData.chainId ? Number(formData.chainId) : null,
        groupName: formData.groupName,
        brandName: formData.brandName,
        zoneName: formData.zoneName,
        service: serviceName,
        qty: formData.qty ? Number(formData.qty) : 0,
        costPerUnit: formData.costPerUnit ? Number(formData.costPerUnit) : 0,
        totalCost: formData.totalCost ? Number(formData.totalCost) : 0,
        deliveryDate: formData.deliveryDate,
        deliveryDetails: formData.deliveryDetails,
      };

      if (editingId) {
        await estimateService.updateEstimate(editingId, payload);
        setMessage("Estimate updated successfully");
      } else {
        await estimateService.createEstimate(payload);
        setMessage("Estimate created successfully");
      }

      setShowModal(false);
      resetForm();
      loadEstimates();
    } catch (err) {
      console.error("Save estimate failed:", err);
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
            <h2>Estimates</h2>
            <button className="add-btn" onClick={openCreateModal}>
              + Add Estimate
            </button>
          </div>

          {/* SEARCH */}
          <div className="search-box">
            <input
              type="text"
              placeholder="Search Estimate..."
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
                <button onClick={loadEstimates} style={{ marginTop: 10 }}>Retry</button>
              </div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Service</th>
                    <th>Qty</th>
                    <th>Cost/Unit</th>
                    <th>Total</th>
                    <th>Delivery Date</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {/* Empty State */}
                  {filteredEstimates.length === 0 && (
                    <tr>
                      <td colSpan="7" style={{ textAlign: "center", padding: 20 }}>
                        No estimates found
                      </td>
                    </tr>
                  )}

                  {/* Data */}
                  {filteredEstimates.map((estimate) => (
                    <tr key={estimate.id || estimate.service}>
                      <td>{estimate.id ?? "—"}</td>
                      <td>{estimate.service}</td>
                      <td>{estimate.qty}</td>
                      <td>₹{estimate.costPerUnit}</td>
                      <td>₹{estimate.totalCost}</td>
                      <td>{estimate.deliveryDate}</td>

                      <td>
                        <button className="edit-btn" onClick={() => openEditModal(estimate)}>
                          Edit
                        </button>
                        <button className="delete-btn" onClick={() => handleDelete(estimate.id)}>
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
                <h2>{editingId ? "Edit Estimate" : "Add Estimate"}</h2>

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
                  placeholder="Group Name"
                  value={formData.groupName}
                  onChange={(e) =>
                    setFormData({ ...formData, groupName: e.target.value })
                  }
                />

                <input
                  type="text"
                  placeholder="Brand Name"
                  value={formData.brandName}
                  onChange={(e) =>
                    setFormData({ ...formData, brandName: e.target.value })
                  }
                />

                <input
                  type="text"
                  placeholder="Zone Name"
                  value={formData.zoneName}
                  onChange={(e) =>
                    setFormData({ ...formData, zoneName: e.target.value })
                  }
                />

                <input
                  type="text"
                  placeholder="Service"
                  value={formData.service}
                  onChange={(e) =>
                    setFormData({ ...formData, service: e.target.value })
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
                  placeholder="Cost Per Unit"
                  value={formData.costPerUnit}
                  onChange={(e) =>
                    setFormData({ ...formData, costPerUnit: e.target.value })
                  }
                />

                <input
                  type="number"
                  step="0.01"
                  placeholder="Total Cost"
                  value={formData.totalCost}
                  onChange={(e) =>
                    setFormData({ ...formData, totalCost: e.target.value })
                  }
                />

                <input
                  type="date"
                  placeholder="Delivery Date"
                  value={formData.deliveryDate}
                  onChange={(e) =>
                    setFormData({ ...formData, deliveryDate: e.target.value })
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

export default Estimates;