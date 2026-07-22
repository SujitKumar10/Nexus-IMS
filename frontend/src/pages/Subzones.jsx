import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/subzones.css";
import { useState, useEffect } from "react";
import { subzoneService } from "../services/subzoneService";

function Subzones() {
  const [subzones, setSubzones] = useState([]);
  const [filteredSubzones, setFilteredSubzones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    zone_name: "",
    brand_id: "",
    is_active: true,
  });

  useEffect(() => {
    // Load subzones when component mounts
    loadSubzones();
  }, []);

  useEffect(() => {
    const filtered = subzones.filter((s) =>
      (s.name || "").toLowerCase().includes(search.toLowerCase())
    );
    setFilteredSubzones(filtered);
  }, [search, subzones]);

  const loadSubzones = async () => {
    setLoading(true);
    setError(null);
    setMessage("");
    try {
      // Debug: Check authentication state
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      console.log('📋 Subzones Loading - Auth Check:', {
        hasToken: !!token,
        hasUser: !!user,
        tokenLength: token ? token.length : 0,
        tokenPrefix: token ? token.substring(0, 30) + '...' : 'none',
        user: user ? JSON.parse(user) : null
      });

      console.log('📡 Making API call to /subzones');
      const data = await subzoneService.getAllSubzones();

      console.log('✅ Subzones API response received:', {
        dataLength: data ? data.length : 0,
        data
      });

      if (!Array.isArray(data)) {
        throw new Error("Unexpected response from subzones API");
      }

      const ui = data.map((s) => ({
        id: s?.zone_id ?? s?.id ?? null,
        name: s?.zone_name ?? s?.name ?? "",
        brand: s?.brand_id ? `Brand #${s.brand_id}` : "—",
        brand_id: s?.brand_id ?? "",
        is_active: s?.is_active ?? true,
        status: s?.is_active ? "Active" : "Inactive",
      }));

      setSubzones(ui);
      setFilteredSubzones(ui);
      console.log('✅ Subzones loaded and state updated');
    } catch (err) {
      console.error("❌ Error loading subzones:", err);
      console.error("Error details:", {
        message: err.message,
        status: err.response?.status,
        statusText: err.response?.statusText,
        data: err.response?.data
      });
      setError(err.message || "Failed to load subzones");
      setSubzones([]);
      setFilteredSubzones([]);
    } finally {
      setLoading(false);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!id) return;
    if (!window.confirm("Delete this subzone?")) return;
    try {
      await subzoneService.deleteSubzone(id);
      setMessage("Subzone deleted successfully");
      loadSubzones();
    } catch (err) {
      console.error("Delete subzone failed:", err);
      const serverMessage = err?.response?.data?.message || err?.response?.data?.error || "Delete failed";
      setMessage(serverMessage);
    }
  };

  // RESET FORM
  const resetForm = () => {
    setFormData({ zone_name: "", brand_id: "", is_active: true });
    setEditingId(null);
  };

  // OPEN CREATE MODAL
  const openCreateModal = () => {
    resetForm();
    setShowModal(true);
  };

  // OPEN EDIT MODAL
  const openEditModal = (subzone) => {
    setEditingId(subzone.id);
    setFormData({
      zone_name: subzone.name,
      brand_id: subzone.brand_id,
      is_active: subzone.is_active,
    });
    setShowModal(true);
  };

  // SAVE (CREATE / UPDATE)
  const handleSave = async () => {
    const trimmedName = formData.zone_name.trim();
    
    if (!trimmedName) {
      setMessage("Subzone name is required");
      return;
    }

    try {
      const payload = {
        zone_name: trimmedName,
        brand_id: formData.brand_id ? Number(formData.brand_id) : null,
        is_active: formData.is_active,
      };

      if (editingId) {
        await subzoneService.updateSubzone(editingId, payload);
        setMessage("Subzone updated successfully");
      } else {
        await subzoneService.createSubzone(payload);
        setMessage("Subzone created successfully");
      }

      setShowModal(false);
      resetForm();
      loadSubzones();
    } catch (err) {
      console.error("Save subzone failed:", err);
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
            <h2>Subzones</h2>
            <button className="add-btn" onClick={openCreateModal}>
              + Add Subzone
            </button>
          </div>

          {/* SEARCH */}
          <div className="search-box">
            <input
              type="text"
              placeholder="Search Subzone..."
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
                <button onClick={loadSubzones} style={{ marginTop: 10 }}>Retry</button>
              </div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Subzone</th>
                    <th>Brand</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {/* Empty State */}
                  {filteredSubzones.length === 0 && (
                    <tr>
                      <td colSpan="5" style={{ textAlign: "center", padding: 20 }}>
                        No subzones found
                      </td>
                    </tr>
                  )}

                  {/* Data */}
                  {filteredSubzones.map((subzone) => (
                    <tr key={subzone.id || subzone.name}>
                      <td>{subzone.id ?? "—"}</td>
                      <td>{subzone.name}</td>
                      <td>{subzone.brand}</td>

                      <td>
                        <span className={subzone.status === "Active" ? "status active" : "status inactive"}>
                          {subzone.status}
                        </span>
                      </td>

                      <td>
                        <button className="edit-btn" onClick={() => openEditModal(subzone)}>
                          Edit
                        </button>
                        <button className="delete-btn" onClick={() => handleDelete(subzone.id)}>
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
                <h2>{editingId ? "Edit Subzone" : "Add Subzone"}</h2>

                <input
                  type="text"
                  placeholder="Zone Name"
                  value={formData.zone_name}
                  onChange={(e) =>
                    setFormData({ ...formData, zone_name: e.target.value })
                  }
                />

                <input
                  type="number"
                  placeholder="Brand ID"
                  value={formData.brand_id}
                  onChange={(e) =>
                    setFormData({ ...formData, brand_id: e.target.value })
                  }
                />

                <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) =>
                      setFormData({ ...formData, is_active: e.target.checked })
                    }
                  />
                  Active
                </label>

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

export default Subzones;