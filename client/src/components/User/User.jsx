// UserTable.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, addUser, updateUser, deleteUser, fetchRoles } from '../../actions/userActions';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserTable = () => {
  const dispatch = useDispatch();
  const { users, roles } = useSelector((state) => state);
  const [selectedUser, setSelectedUser] = useState(null);
  const [status, setStatus] = useState('active');
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });
  const [selectedRoles, setSelectedRoles] = useState([]);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchRoles());
  }, [dispatch]);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setNewUser({ name: user.name, email: user.email, password: user.password });
    setStatus(user.status);
    setSelectedRoles(user.roles ? user.roles.map((role) => role._id) : []);
    setEditing(true);
    setAdding(false);
  };

  const handleAddClick = () => {
    setAdding(true);
    setNewUser({ name: '', email: '', password: '' });
    setSelectedRoles([]);
    setEditing(false);
  };

  const handleUpdate = () => {
    const updatedUser = { ...newUser, status, roles: selectedRoles };
    dispatch(updateUser(selectedUser._id, updatedUser));
    setEditing(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const handleAddUser = () => {
    const userWithRoles = { ...newUser, status, roles: selectedRoles };
    dispatch(addUser(userWithRoles));
    setAdding(false);
  };

  const handleRoleSelectChange = (selectedOptions) => {
    setSelectedRoles(selectedOptions ? selectedOptions.map((opt) => opt.value) : []);
  };

  const roleOptions = roles.map((role) => ({ value: role._id, label: role.name }));

  return (
    <div className="container mt-4">
      <h2>User Management</h2>
      <button className="btn btn-primary" onClick={handleAddClick}>
        <FontAwesomeIcon icon={faPlus} /> Add User
      </button>

      {editing && (
        <div className="edit-container mt-3">
          <h3>Edit User</h3>
          <button className="btn-close" onClick={() => setEditing(false)}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <input
            className="form-control mt-2"
            type="text"
            name="name"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            required
          />
          <input
            className="form-control mt-2"
            type="email"
            name="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            required
          />
          <input
            className="form-control mt-2"
            type="password"
            name="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            required
          />
          <Select
            isMulti
            value={roleOptions.filter((option) => selectedRoles.includes(option.value))}
            onChange={handleRoleSelectChange}
            options={roleOptions}
            className="mt-2"
          />
          <button className="btn btn-success mt-2" onClick={handleUpdate}>
            Update
          </button>
        </div>
      )}

      {adding && (
        <div className="edit-container mt-3">
          <h3>Add New User</h3>
          <button className="btn-close" onClick={() => setAdding(false)}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <input
            className="form-control mt-2"
            type="text"
            name="name"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            required
          />
          <input
            className="form-control mt-2"
            type="email"
            name="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            required
          />
          <input
            className="form-control mt-2"
            type="password"
            name="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            required
          />
          <Select
            isMulti
            value={roleOptions.filter((option) => selectedRoles.includes(option.value))}
            onChange={handleRoleSelectChange}
            options={roleOptions}
            className="mt-2"
          />
          <button className="btn btn-success mt-2" onClick={handleAddUser}>
            Add User
          </button>
        </div>
      )}

      <table className="table mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.status}</td>
              <td>
                <button className="btn btn-warning" onClick={() => handleEditClick(user)}>
                  <FontAwesomeIcon icon={faPen} /> Edit
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(user._id)}>
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
