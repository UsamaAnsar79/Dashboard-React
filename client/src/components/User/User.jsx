
import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [status, setStatus] = useState("active");
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });
  const [selectedRoles, setSelectedRoles] = useState([]);

  // Fetch users from the database
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch roles from the database
  const fetchRoles = async () => {
    try {
      const response = await axios.get("http://localhost:5000/roles");
      console.log("Fetched roles:", response.data);
      setRoles(response.data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const handleEditClick = (user) => {
    if (adding) setAdding(false);
    setSelectedUser(user);
    setNewUser({ name: user.name, email: user.email, password: "" });
    setStatus(user.status);
    setSelectedRoles(user.roles ? user.roles.map((role) => role._id) : []);
    setEditing(true);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleUpdate = async () => {
    const updatedUser = {
      ...selectedUser,
      ...newUser,
      status,
      roles: selectedRoles,
    };
  
    // Remove password field if it's empty or not being updated
    if (!updatedUser.password) {
      delete updatedUser.password;
    }
  
    console.log("Updating user:", updatedUser);
  
    try {
      const response = await axios.put(`http://localhost:5000/api/users/${updatedUser._id}`, updatedUser);
      console.log("Update response:", response.data);
      const updatedUserFromResponse = response.data.user;
  
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user._id === updatedUserFromResponse._id ? updatedUserFromResponse : user))
      );
    } catch (error) {
      if (error.response && error.response.data) {
        // Log the specific error response from the backend
        console.error("Error updating user:", error.response.data.errors);
      } else {
        console.error("Error updating user:", error.message);
      }
    }
  
    setEditing(false);
    setNewUser({ name: "", email: "", password: "" });
    setSelectedRoles([]);
  };
  

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleAddClick = () => {
    if (editing) setEditing(false);
    setAdding(true);
    setNewUser({ name: "", email: "", password: "" });
    setStatus("active"); 
    setSelectedRoles([]); 
  };

  const handleAddUser = async () => {
    const newUserWithRoles = {
      ...newUser,
      status,
      roles: selectedRoles,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/users", newUserWithRoles);
      
      // Optionally update the local state immediately
      setUsers((prevUsers) => [...prevUsers, response.data]);
      
      // Fetch users again to ensure the latest data
      await fetchUsers(); // Ensure to refetch users after adding
    } catch (error) {
      console.error("Error adding user:", error);
    }

    setAdding(false);
    setNewUser({ name: "", email: "", password: "" });
    setSelectedRoles([]);
  };

  const handleRoleSelectChange = (selectedOptions) => {
    setSelectedRoles(selectedOptions ? selectedOptions.map((opt) => opt.value) : []);
  };

  const roleOptions = roles.map((role) => ({
    value: role._id,
    label: role.name,
  }));

  return (
    <div className="container mt-4">
      <div className="position-relative">
        {editing && (
          <div className="edit-container card p-3">
            <button className="close-btn btn btn-close" onClick={() => setEditing(false)} />
            <h3>Edit User</h3>
            <div className="mb-3">
              <input
                className="form-control"
                type="text"
                name="name"
                placeholder="Name"
                value={newUser.name}
                onChange={handleNewUserChange}
                required
              />
              <select
                value={status}
                onChange={handleStatusChange}
                className="form-select mt-2"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <input
              className="form-control mb-2"
              type="email"
              name="email"
              placeholder="Email"
              value={newUser.email}
              onChange={handleNewUserChange}
              required
            />
            <input
              className="form-control mb-2"
              type="password"
              name="password"
              placeholder="Password"
              value={newUser.password}
              onChange={handleNewUserChange}
            />
            <div className="select-roles mb-3">
              <h5>Select Roles</h5>
              <Select
                isMulti
                value={roleOptions.filter((option) => selectedRoles.includes(option.value))}
                onChange={handleRoleSelectChange}
                options={roleOptions}
              />
            </div>
            <div className="btn-group">
              <button className="btn btn-primary" onClick={handleUpdate}>Update</button>
              <button className="btn btn-secondary" onClick={() => setEditing(false)}>Cancel</button>
            </div>
          </div>
        )}

        {adding && (
          <div className="edit-container card p-3">
            <button className="close-btn btn btn-close" onClick={() => setAdding(false)} />
            <h3>Add New User</h3>
            <div className="mb-3">
              <input
                className="form-control"
                type="text"
                name="name"
                placeholder="Name"
                value={newUser.name}
                onChange={handleNewUserChange}
                required
              />
              <select
                value={status}
                onChange={handleStatusChange}
                className="form-select mt-2"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <input
              className="form-control mb-2"
              type="email"
              name="email"
              placeholder="Email"
              value={newUser.email}
              onChange={handleNewUserChange}
              required
            />
            <input
              className="form-control mb-2"
              type="password"
              name="password"
              placeholder="Password"
              value={newUser.password}
              onChange={handleNewUserChange}
            />
            <div className="select-roles mb-3">
              <h5>Select Roles</h5>
              <Select
                isMulti
                value={roleOptions.filter((option) => selectedRoles.includes(option.value))}
                onChange={handleRoleSelectChange}
                options={roleOptions}
              />
            </div>
            <div className="btn-group">
              <button className="btn btn-primary" onClick={handleAddUser}>Add User</button>
              <button className="btn btn-secondary" onClick={() => setAdding(false)}>Cancel</button>
            </div>
          </div>
        )}

        <button className="btn btn-success mb-3" onClick={handleAddClick}>
          <FontAwesomeIcon icon={faPlus} /> Add User
        </button>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Roles</th> {/* Added column for Roles */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.status}</td>
                <td>{user.roles ? user.roles.map(role => role.name).join(', ') : 'None'}</td> {/* Displaying roles */}
                <td>
                  <button onClick={() => handleEditClick(user)} className="btn btn-warning me-2">
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                  <button onClick={() => handleDelete(user._id)} className="btn btn-danger">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
