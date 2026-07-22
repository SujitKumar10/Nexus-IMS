import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/brands.css";
import { useState, useEffect } from "react";
import { brandService } from "../services/brandService";

function Brands() {
  const [brands, setBrands] = useState([]);
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newBrand, setNewBrand] = useState({
    brand_name: "",
    chain_id: "",
    is_active: true,
  });

  useEffect(() => {
    loadBrands();
  }, []);

  useEffect(() => {
    const filtered = brands.filter((b) =>
      b.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredBrands(filtered);
  }, [search, brands]);

  const loadBrands = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await brandService.getAllBrands();

      if (!Array.isArray(data)) {
        throw new Error("Unexpected response from brands API");
      }

      const ui = data.map((b) => ({
        id: b?.brand_id ?? b?.id ?? null,
        name: b?.brand_name ?? b?.name ?? "",
        chain: b?.chain_id
          ? `Chain #${b.chain_id}`
          : b?.chain ?? "—",
        status:
          b?.is_active === true ||
          (typeof b?.status === "string" &&
            b.status.toLowerCase() === "active")
            ? "Active"
            : "Inactive",
      }));

      setBrands(ui);
      setFilteredBrands(ui);
    } catch (err) {
      console.error("Error loading brands:", err);
      setError(err.message || "Something went wrong");
      setBrands([]);
      setFilteredBrands([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!id) return;
    const confirmDelete = window.confirm("Delete this brand?");
    if (!confirmDelete) return;

    try {
      await brandService.deleteBrand(id);
      loadBrands();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const handleCreateBrand = async () => {
    if (!newBrand.brand_name) {
      alert("Brand name is required");
      return;
    }

    try {
      await brandService.createBrand({
        brand_name: newBrand.brand_name,
        chain_id: newBrand.chain_id ? Number(newBrand.chain_id) : null,
        is_active: newBrand.is_active,
      });
      setShowModal(false);
      setNewBrand({ brand_name: "", chain_id: "", is_active: true });
      loadBrands();
    } catch (err) {
      console.error("Create brand failed", err);
      alert("Create brand failed");
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setNewBrand({ brand_name: "", chain_id: "", is_active: true });
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-content">
        <Navbar />

        <div className="page-content">
          <div className="page-header">
            <h2>Brands</h2>
            <button className="add-btn" onClick={() => setShowModal(true)}>
              + Add Brand
            </button>
          </div>

          <div className="search-box">
            <input
              type="text"
              placeholder="Search Brand..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="table-container">
            {/* Loading */}
            {loading && (
              <div style={{ padding: 16 }}>Loading brands...</div>
            )}

            {/* Error */}
            {error && (
              <div style={{ padding: 16, color: "crimson" }}>
                Error: {error}
                <br />
                <button onClick={loadBrands}>Retry</button>
              </div>
            )}

            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Brand Name</th>
                  <th>Chain</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {/* Empty State */}
                {filteredBrands.length === 0 && !loading && (
                  <tr>
                    <td
                      colSpan="5"
                      style={{
                        textAlign: "center",
                        padding: 20,
                      }}
                    >
                      No brands found
                    </td>
                  </tr>
                )}

                {/* Data */}
                {filteredBrands.map((brand) => (
                  <tr key={brand.id || brand.name}>
                    <td>{brand.id ?? "—"}</td>
                    <td>{brand.name}</td>
                    <td>{brand.chain}</td>

                    <td>
                      <span
                        className={
                          brand.status === "Active"
                            ? "status active"
                            : "status inactive"
                        }
                      >
                        {brand.status}
                      </span>
                    </td>

                    <td>
                      <button className="edit-btn">Edit</button>

                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(brand.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {showModal && (
            <div className="modal-overlay">
              <div className="modal">
                <h2>Add Brand</h2>
                <input
                  type="text"
                  placeholder="Brand Name"
                  value={newBrand.brand_name}
                  onChange={(e) =>
                    setNewBrand({ ...newBrand, brand_name: e.target.value })
                  }
                />
                <input
                  type="number"
                  placeholder="Chain ID"
                  value={newBrand.chain_id}
                  onChange={(e) =>
                    setNewBrand({ ...newBrand, chain_id: e.target.value })
                  }
                />
                <select
                  value={newBrand.is_active ? "active" : "inactive"}
                  onChange={(e) =>
                    setNewBrand({
                      ...newBrand,
                      is_active: e.target.value === "active",
                    })
                  }
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <div className="modal-buttons">
                  <button className="save-btn" onClick={handleCreateBrand}>
                    Save
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

export default Brands;