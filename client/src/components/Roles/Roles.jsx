
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchRoles,
//   fetchPermissions,
//   addRole,
//   updateRole,
//   deleteRole,
//   toggleRole,
// } from "../../actions/rolesActions";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faPlus,
//   faPen,
//   faTrash,
//   faToggleOn,
//   faToggleOff,
//   faTimes,
// } from "@fortawesome/free-solid-svg-icons";
// import Select from "react-select";
// import { Button, Modal, Form } from "react-bootstrap";

// export default function Roles() {
//   const dispatch = useDispatch();
//   const roles = useSelector((state) => state.roles.roles);
//   const permissions = useSelector((state) => state.roles.permissions); // Corrected permissions state selection
//   const loading = useSelector((state) => state.roles.loading); // Add loading state to your reducer
//   const permissionsError = useSelector((state) => state.roles.permissionsError); // Permissions error state
//   const [isModalActive, setIsModalActive] = useState(false);
//   const [newRole, setNewRole] = useState("");
//   const [editMode, setEditMode] = useState(false);
//   const [roleToEdit, setRoleToEdit] = useState(null);
//   const [selectedPermissions, setSelectedPermissions] = useState([]);

//   // Fetch roles and permissions on component mount
//   useEffect(() => {
//     dispatch(fetchRoles());
//     dispatch(fetchPermissions());
//   }, [dispatch]);

//   // Debugging permissions fetched from API
//   useEffect(() => {
//     if (permissions.length > 0) {
//       console.log("Fetched Permissions:", permissions);
//     } else {
//       console.warn("Fetched Permissions: No permissions available");
//     }
//   }, [permissions]);

//   // Function to handle modal show for adding or editing a role
//   const handleModalShow = (role = {}) => {
//     setIsModalActive(true);
//     setNewRole(role.name || "");
//     setRoleToEdit(role._id || null);
//     setEditMode(!!role.name);
//     setSelectedPermissions(
//       role.permissions
//         ? permissions.filter((p) => role.permissions.includes(p.value))
//         : []
//     );
//   };

//   // Function to close the modal
//   const handleModalClose = () => {
//     setIsModalActive(false);
//     setNewRole("");
//     setEditMode(false);
//     setRoleToEdit(null);
//     setSelectedPermissions([]);
//   };

//   // Function to save or update role
//   const handleSaveRole = () => {
//     if (!newRole) {
//       alert("Please enter a role");
//       return;
//     }

//     const payload = {
//       newRole,
//       permissions: selectedPermissions.map((p) => p.value),
//     };

//     if (editMode) {
//       dispatch(updateRole(roleToEdit, payload));
//     } else {
//       dispatch(addRole(payload));
//     }
//     handleModalClose();
//   };

//   // Function to delete a role
//   const handleDeleteRole = (roleId) => {
//     if (window.confirm("Are you sure you want to delete this role?")) {
//       dispatch(deleteRole(roleId));
//     }
//   };

//   // Function to toggle role status
//   const handleToggleRole = (role) => {
//     dispatch(toggleRole(role._id, !role.active)); // Toggle the active status
//   };

//   const renderPermissions = (permissionsIds) => {
//     console.log("Permissions IDs for Role:", permissionsIds);
  
//     return permissionsIds
//       .map((p) => {
//         const permissionId = p._id || p; // If it's an object, get the `_id`, otherwise use the raw ID
//         const permission = permissions.find((perm) => perm.value === permissionId); // Match permission by ID
//         console.log("Matched Permission:", permission); // Check which permissions are matched
//         return permission ? permission.label : null;
//       })
//       .filter(Boolean) // Filter out null values
//       .join(", ") || "No permissions"; // Default text if no permissions
//   };

//   // Show loading indicator if roles or permissions are being loaded
//   if (loading) {
//     return <div>Loading...</div>; 
//   }

//   // Show error message if permissions fail to load
//   if (permissionsError) {
//     return <div>Error fetching permissions: {permissionsError}</div>;
//   }

//   return (
//     <div className="container">
//       <div className="d-flex justify-content-between align-items-center my-3">
//         <h2>Roles</h2>
//         <Button onClick={() => handleModalShow()}>
//           <FontAwesomeIcon icon={faPlus} /> Add Role
//         </Button>
//       </div>
//       <div className="table-responsive">
//         <table className="table table-custom">
//           <thead>
//             <tr>
//               <th>Role</th>
//               <th>Permissions</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Array.isArray(roles) && roles.length > 0 ? (
//               roles.map((role, index) => (
//                 <tr key={index}>
//                   <td>{role.name}</td>
//                   <td>{renderPermissions(role.permissions)}</td> {/* Updated renderPermissions */}
//                   <td>
//                     <FontAwesomeIcon
//                       icon={faPen}
//                       className="me-2"
//                       onClick={() => handleModalShow(role)}
//                     />
//                     <FontAwesomeIcon
//                       icon={faTrash}
//                       className="me-2"
//                       onClick={() => handleDeleteRole(role._id)}
//                     />
//                     <FontAwesomeIcon
//                       icon={role.active ? faToggleOn : faToggleOff}
//                       onClick={() => handleToggleRole(role)}
//                       title={role.active ? "Disable Role" : "Enable Role"}
//                     />
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="3">No roles available</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal for adding or editing a role */}
//       <Modal show={isModalActive} onHide={handleModalClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>{editMode ? "Edit Role" : "Add Role"}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form.Group className="mb-3">
//             <Form.Label>Role</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter role"
//               value={newRole}
//               onChange={(e) => setNewRole(e.target.value)}
//             />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>Permissions</Form.Label>
//             <Select
//               isMulti
//               options={permissions}
//               value={selectedPermissions}
//               onChange={setSelectedPermissions}
//               isDisabled={permissions.length === 0}
//             />
//           </Form.Group>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleModalClose}>
//             <FontAwesomeIcon icon={faTimes} /> Close
//           </Button>
//           <Button variant="primary" onClick={handleSaveRole}>
//             {editMode ? "Update Role" : "Add Role"}
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRoles,
  fetchPermissions,
  addRole,
  updateRole,
  deleteRole,
  toggleRole,
} from "../../actions/rolesActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPen,
  faTrash,
  faToggleOn,
  faToggleOff,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import { Button, Modal, Form } from "react-bootstrap";

export default function Roles() {
  const dispatch = useDispatch();
  const roles = useSelector((state) => state.roles.roles);
  const permissions = useSelector((state) => state.roles.permissions);
  const loading = useSelector((state) => state.roles.loading);
  const permissionsError = useSelector((state) => state.roles.permissionsError);
  const [isModalActive, setIsModalActive] = useState(false);
  const [newRole, setNewRole] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [roleToEdit, setRoleToEdit] = useState(null);
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  useEffect(() => {
    dispatch(fetchRoles());
    dispatch(fetchPermissions());
  }, [dispatch]);

  const handleModalShow = (role = {}) => {
    setIsModalActive(true);
    setNewRole(role.name || "");
    setRoleToEdit(role._id || null);
    setEditMode(!!role.name);
    setSelectedPermissions(
      role.permissions
        ? permissions.filter((p) => role.permissions.includes(p.value))
        : []
    );
  };

  const handleModalClose = () => {
    setIsModalActive(false);
    setNewRole("");
    setEditMode(false);
    setRoleToEdit(null);
    setSelectedPermissions([]);
  };

  const handleSaveRole = () => {
    if (!newRole) {
      alert("Please enter a role");
      return;
    }

    const payload = {
      newRole,
      permissions: selectedPermissions.map((p) => p.value),
    };

    if (editMode) {
      dispatch(updateRole(roleToEdit, payload));
    } else {
      dispatch(addRole(payload));
    }
    handleModalClose();
  };

  const handleDeleteRole = (roleId) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      dispatch(deleteRole(roleId));
    }
  };

  const handleToggleRole = (role) => {
    dispatch(toggleRole(role._id, !role.active));
  };

  const renderPermissions = (permissionsIds) => {
    return permissionsIds
      .map((p) => {
        const permissionId = p._id || p;
        const permission = permissions.find((perm) => perm.value === permissionId);
        return permission ? permission.label : null;
      })
      .filter(Boolean)
      .join(", ") || "No permissions";
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (permissionsError) {
    return <div>Error fetching permissions: {permissionsError}</div>;
  }

  // Disable selected permissions in the select dropdown
  const optionsWithDisabled = permissions.map((perm) => ({
    ...perm,
    isDisabled: selectedPermissions.some((selected) => selected.value === perm.value),
  }));

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center my-3">
        <h2>Roles</h2>
        <Button onClick={() => handleModalShow()}>
          <FontAwesomeIcon icon={faPlus} /> Add Role
        </Button>
      </div>
      <div className="table-responsive">
        <table className="table table-custom">
          <thead>
            <tr>
              <th>Role</th>
              <th>Permissions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(roles) && roles.length > 0 ? (
              roles.map((role, index) => (
                <tr key={index}>
                  <td>{role.name}</td>
                  <td>{renderPermissions(role.permissions)}</td>
                  <td>
                    <FontAwesomeIcon
                      icon={faPen}
                      className="me-2"
                      onClick={() => handleModalShow(role)}
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="me-2"
                      onClick={() => handleDeleteRole(role._id)}
                    />
                    <FontAwesomeIcon
                      icon={role.active ? faToggleOn : faToggleOff}
                      onClick={() => handleToggleRole(role)}
                      title={role.active ? "Disable Role" : "Enable Role"}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No roles available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal show={isModalActive} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? "Edit Role" : "Add Role"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter role"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Permissions</Form.Label>
            <Select
              isMulti
              options={optionsWithDisabled}
              value={selectedPermissions}
              onChange={setSelectedPermissions}
              isDisabled={permissions.length === 0}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            <FontAwesomeIcon icon={faTimes} /> Close
          </Button>
          <Button variant="primary" onClick={handleSaveRole}>
            {editMode ? "Update Role" : "Add Role"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
