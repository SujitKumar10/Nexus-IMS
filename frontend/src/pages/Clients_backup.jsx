import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/clients.css";
import { useState, useEffect } from "react";
import { clientService } from "../services/clientService";

function Clients() {

  const [clients, setClients] = useState([]);
  {
    id: 1,
    name: "ABC Pvt Ltd",
    email: "abc@gmail.com",
    company: "ABC Group",
    status: "Active",
  },
  {
    id: 2,
    name: "XYZ Industries",
    email: "xyz@gmail.com",
    company: "XYZ Chain",
    status: "Active",
  },
  {
    id: 3,
    name: "Tech Solutions",
    email: "tech@gmail.com",
    company: "Tech Brand",
    status: "Inactive",
  },
]);

const [showModal, setShowModal] = useState(false);

const [newClient, setNewClient] = useState({
  name: "",
  email: "",
  company: "",
  status: "Active",
});

  return (
    <div className="dashboard-layout">

      <Sidebar />

      <div className="dashboard-content">

        <Navbar />

        <div className="page-content">

          <div className="page-header">

            <div>
                <h2>Clients</h2>
                <p style={{ color: "#6b7280", marginTop: "5px" }}>
                Manage all your clients from one place.
                </p>
            </div>

            <button
                 className="add-btn"
                 onClick={() => setShowModal(true)}
            >
            + Add Client
            </button>

          </div>

          <div className="search-box">

            <input
              type="text"
              placeholder="Search Client..."
            />

          </div>

          <div className="table-container">
            
            <table>

              <thead>

                <tr>
                  <th>ID</th>
                  <th>Client Name</th>
                  <th>Email</th>
                  <th>Company</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>

              </thead>

              <tbody>

                {clients.map((client) => (

                  <tr key={client.id}>

                    <td>{client.id}</td>

                    <td>{client.name}</td>

                    <td>{client.email}</td>

                    <td>{client.company}</td>

                    <td>

                      <span
                        className={
                          client.status === "Active"
                            ? "status active"
                            : "status inactive"
                        }
                      >
                        {client.status}
                      </span>

                    </td>

                    <td>

                      <button className="edit-btn">
                        Edit
                      </button>

                      <button className="delete-btn">
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

      <h2>Add Client</h2>

      <input
        type="text"
        placeholder="Client Name"
        value={newClient.name}
        onChange={(e) =>
          setNewClient({
            ...newClient,
            name: e.target.value,
          })
        }
      />

      <input
        type="email"
        placeholder="Email"
        value={newClient.email}
        onChange={(e) =>
          setNewClient({
            ...newClient,
            email: e.target.value,
          })
        }
      />

      <input
        type="text"
        placeholder="Company"
        value={newClient.company}
        onChange={(e) =>
          setNewClient({
            ...newClient,
            company: e.target.value,
          })
        }
      />

      <select
        value={newClient.status}
        onChange={(e) =>
          setNewClient({
            ...newClient,
            status: e.target.value,
          })
        }
      >
        <option>Active</option>
        <option>Inactive</option>
      </select>

      <div className="modal-buttons">

        <button
          className="save-btn"
           onClick={() => {

if(
newClient.name === "" ||
newClient.email === "" ||
newClient.company === ""
){
alert("Please fill all fields");
return;
}

setClients([
...clients,
{
id: clients.length + 1,
...newClient,
},
]);

setShowModal(false);

setNewClient({
name:"",
email:"",
company:"",
status:"Active",
});

}}
        >
          Save
        </button>

        <button
          className="cancel-btn"
          onClick={() => setShowModal(false)}
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

export default Clients;
