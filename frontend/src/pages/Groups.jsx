import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/groups.css";
import { useState, useEffect } from "react";
import { groupService } from "../services/groupService";

function Groups() {

  const [groups, setGroups] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null);
  const [newGroup, setNewGroup] = useState({
    srNo: "",
    name: "",
    status: "ACTIVE",
  });

  useEffect(() => {
    loadGroups();
  }, []);

  const loadGroups = async () => {
    try {
      const data = await groupService.getAllGroups();
      setGroups(data);
    } catch (error) {
      console.error("Error loading groups:", error);
    }
  };

  const handleAddGroup = async () => {
    if (newGroup.srNo === "" || newGroup.name === "") {
      alert("Please fill all fields");
      return;
    }

    try {
      await groupService.createGroup(newGroup);
      setShowModal(false);
      setNewGroup({ srNo: "", name: "", status: "ACTIVE" });
      loadGroups();
    } catch (error) {
      console.error("Error creating group:", error);
      alert("Error creating group");
    }
  };

  const handleEditGroup = async (group) => {
    setEditingGroup(group);
    setNewGroup({
      srNo: group.srNo,
      name: group.name,
      status: group.status,
    });
    setShowModal(true);
  };

  const handleUpdateGroup = async () => {
    if (newGroup.srNo === "" || newGroup.name === "") {
      alert("Please fill all fields");
      return;
    }

    try {
      await groupService.updateGroup(editingGroup.id, newGroup);
      setShowModal(false);
      setEditingGroup(null);
      setNewGroup({ srNo: "", name: "", status: "ACTIVE" });
      loadGroups();
    } catch (error) {
      console.error("Error updating group:", error);
      alert("Error updating group");
    }
  };

  const handleDeleteGroup = async (id) => {
    if (window.confirm("Are you sure you want to delete this group?")) {
      try {
        await groupService.deleteGroup(id);
        loadGroups();
      } catch (error) {
        console.error("Error deleting group:", error);
        alert("Error deleting group");
      }
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setEditingGroup(null);
    setNewGroup({ srNo: "", name: "", status: "ACTIVE" });
  };

  return (
    <div className="dashboard-layout">

      <Sidebar />

      <div className="dashboard-content">

        <Navbar />

        <div className="page-content">

          <div className="page-header">
            <h2>Groups</h2>

            <button 
              className="add-btn"
              onClick={() => {
                setEditingGroup(null);
                setNewGroup({ srNo: "", name: "", status: "ACTIVE" });
                setShowModal(true);
              }}
            >
              + Add Group
            </button>
          </div>

          <div className="search-box">
            <input
              type="text"
              placeholder="Search Group..."
            />
          </div>

          <div className="table-container">

            <table>

              <thead>
                <tr>
                  <th>Sr. No.</th>
                  <th>Group Name</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {groups.map((group) => (

                  <tr key={group.id}>

                    <td>{group.id}</td>

                    <td>{group.name}</td>

                    <td>
                      <button 
                        className="edit-btn"
                        onClick={() => handleEditGroup(group)}
                      >
                        Edit
                      </button>

                      <button 
                        className="delete-btn"
                        onClick={() => handleDeleteGroup(group.id)}
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

                <h2>{editingGroup ? "Edit Group" : "Add Group"}</h2>

                <input
                  type="number"
                  placeholder="Sr. No."
                  value={newGroup.srNo}
                  onChange={(e) =>
                    setNewGroup({
                      ...newGroup,
                      srNo: parseInt(e.target.value) || "",
                    })
                  }
                />

                <input
                  type="text"
                  placeholder="Group Name"
                  value={newGroup.name}
                  onChange={(e) =>
                    setNewGroup({
                      ...newGroup,
                      name: e.target.value,
                    })
                  }
                />

                <select
                  value={newGroup.status}
                  onChange={(e) =>
                    setNewGroup({
                      ...newGroup,
                      status: e.target.value,
                    })
                  }
                >
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>

                <div className="modal-buttons">

                  <button
                    className="save-btn"
                    onClick={editingGroup ? handleUpdateGroup : handleAddGroup}
                  >
                    {editingGroup ? "Update" : "Save"}
                  </button>

                  <button
                    className="cancel-btn"
                    onClick={handleCancel}
                  >
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

export default Groups;
