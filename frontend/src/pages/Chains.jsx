import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { chainService } from "../services/chainService";
import "../styles/chains.css";

function Chains() {
  const [chains, setChains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    company_name: "",
    gst_no: "",
    is_active: true,
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const loadChains = async () => {
    try {
      setLoading(true);
      const data = await chainService.getAllChains();
      setChains(Array.isArray(data) ? data : []);
    } catch (error) {
      const serverMessage = error?.response?.data?.message || error?.response?.data?.error || "Failed to load chains";
      setMessage(serverMessage);
      setChains([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadChains();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setForm({ company_name: "", gst_no: "", is_active: true });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    try {
      const payload = {
        company_name: form.company_name?.trim(),
        gst_no: form.gst_no?.trim(),
        is_active: Boolean(form.is_active),
      };

      if (!payload.company_name) {
        setMessage("Company name is required");
        return;
      }

      if (editingId) {
        await chainService.updateChain(editingId, payload);
        setMessage("Chain updated successfully");
      } else {
        await chainService.createChain(payload);
        setMessage("Chain created successfully");
      }
      resetForm();
      await loadChains();
    } catch (error) {
      const serverMessage = error?.response?.data?.message || error?.response?.data?.error || "Operation failed";
      setMessage(serverMessage);
    }
  };

  const handleAddChain = async () => {
    await handleSubmit();
  };

  const handleEdit = (chain) => {
    setEditingId(chain.chain_id);
    setForm({
      company_name: chain.company_name || "",
      gst_no: chain.gst_no || "",
      is_active: chain.is_active ?? true,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this chain?")) return;
    try {
      await chainService.deleteChain(id);
      setMessage("Chain deleted successfully");
      await loadChains();
    } catch (error) {
      const serverMessage = error?.response?.data?.message || error?.response?.data?.error || "Delete failed";
      setMessage(serverMessage);
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-content">
        <Navbar />

        <div className="page-content">
          <div className="page-header">
            <h2>Chains</h2>
            <button type="button" className="add-btn" onClick={handleAddChain}>
              + Add Chain
            </button>
          </div>

          {message && <p className="status-message">{message}</p>}

          <form className="search-box" onSubmit={handleSubmit}>
            <input
              type="text"
              name="company_name"
              placeholder="Company name"
              value={form.company_name ?? ""}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="gst_no"
              placeholder="GST number"
              value={form.gst_no ?? ""}
              onChange={handleChange}
            />
            <label>
              <input
                type="checkbox"
                name="is_active"
                checked={Boolean(form.is_active)}
                onChange={handleChange}
              />
              Active
            </label>
            <button type="submit" className="add-btn">
              {editingId ? "Update" : "Save"}
            </button>
          </form>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Company Name</th>
                  <th>GST No</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Updated</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7">Loading...</td>
                  </tr>
                ) : chains.length === 0 ? (
                  <tr>
                    <td colSpan="7">No chains found</td>
                  </tr>
                ) : (
                  chains.map((chain) => (
                    <tr key={chain.chain_id}>
                      <td>{chain.chain_id}</td>
                      <td>{chain.company_name}</td>
                      <td>{chain.gst_no || "-"}</td>
                      <td>
                        <span className={chain.is_active ? "status active" : "status inactive"}>
                          {chain.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td>{chain.created_at ? new Date(chain.created_at).toLocaleString() : "-"}</td>
                      <td>{chain.updated_at ? new Date(chain.updated_at).toLocaleString() : "-"}</td>
                      <td>
                        <button className="edit-btn" onClick={() => handleEdit(chain)}>
                          Edit
                        </button>
                        <button className="delete-btn" onClick={() => handleDelete(chain.chain_id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chains;