import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/users.css";

function Users() {

  const users = [
    {
      id: 1,
      name: "Admin User",
      email: "admin@nexusims.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      role: "Sales Person",
      status: "Active",
    },
    {
      id: 3,
      name: "Priya Singh",
      email: "priya@gmail.com",
      role: "Sales Person",
      status: "Inactive",
    },
  ];

  return (
    <div className="dashboard-layout">

      <Sidebar />

      <div className="dashboard-content">

        <Navbar />

        <div className="page-content">

          <div className="page-header">
            <h2>Users</h2>

            <button className="add-btn">
              + Add User
            </button>
          </div>

          <div className="search-box">
            <input
              type="text"
              placeholder="Search User..."
            />
          </div>

          <div className="table-container">

            <table>

              <thead>

                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>

              </thead>

              <tbody>

                {users.map((user) => (

                  <tr key={user.id}>

                    <td>{user.id}</td>

                    <td>{user.name}</td>

                    <td>{user.email}</td>

                    <td>{user.role}</td>

                    <td>

                      <span
                        className={
                          user.status === "Active"
                            ? "status active"
                            : "status inactive"
                        }
                      >
                        {user.status}
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

        </div>

      </div>

    </div>
  );
}

export default Users;