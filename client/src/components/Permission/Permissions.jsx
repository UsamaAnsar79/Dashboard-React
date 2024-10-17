


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  fetchPermissions,
  addPermission,
  updatePermission,
  deletePermission,
  togglePermission,
} from "../../actions/permissionActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPen,
  faTrash,
  faToggleOn,
  faToggleOff,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const Permissions = () => {
  const dispatch = useDispatch();
  const permissions = useSelector((state) => state.permissions.permissions);
  const [isModalActive, setIsModalActive] = useState(false);
  const [newPermission, setNewPermission] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [permissionToEdit, setPermissionToEdit] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/permissions");
        dispatch(fetchPermissions(response.data));
      } catch (error) {
        console.error("Error fetching permissions:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  const handleModalShow = (permission = "") => {
    if (permission && !permissions.find((perm) => perm.name === permission).active) {
      alert("You cannot edit a disabled permission.");
      return;
    }

    setIsModalActive(true);
    setNewPermission(permission);
    setPermissionToEdit(permission);
    setEditMode(!!permission);
  };

  const handleModalClose = () => {
    setIsModalActive(false);
    setNewPermission("");
    setEditMode(false);
    setPermissionToEdit("");
  };

  const handleSavePermission = async () => {
    if (!newPermission) {
      alert("Please enter a permission");
      return;
    }

    try {
      if (editMode) {
        await axios.put("http://localhost:5000/api/updatePermission", {
          oldPermission: permissionToEdit,
          newPermission,
        });
        dispatch(updatePermission(permissionToEdit, newPermission));
      } else {
        await axios.post("http://localhost:5000/api/addPermission", {
          permission: newPermission,
        });
        dispatch(addPermission({ name: newPermission, active: true }));
      }
      handleModalClose();
    } catch (error) {
      console.error("Error saving permission:", error);
      alert("Failed to save permission. Please try again.");
    }
  };

  const handleDeletePermission = async (permission) => {
    try {
      await axios.delete("http://localhost:5000/api/deletePermission", {
        data: { permission: permission.name },
      });
      dispatch(deletePermission(permission.name));
    } catch (error) {
      console.error("Error deleting permission:", error);
      alert("Failed to delete permission. Please try again.");
    }
  };

  const handleTogglePermission = async (permission) => {
    const updatedPermission = { ...permission, active: !permission.active };
    try {
      await axios.put("http://localhost:5000/api/togglePermission", {
        permission: updatedPermission,
      });
      dispatch(togglePermission(updatedPermission));
    } catch (error) {
      console.error("Error toggling permission:", error);
      alert("Failed to toggle permission. Please try again.");
    }
  };

  return (
    <div className="permissions-main">
      <div className="container permissions-container">
        <div className="row permissions-header">
          <div className="col-sm-5">Permissions</div>
          <div className="col-sm-4">Actions</div>
          <div className="col-sm-3">
            <FontAwesomeIcon
              icon={faPlus}
              className="addPermission-icon"
              onClick={() => handleModalShow()}
            />
          </div>
        </div>

        {permissions.length > 0 ? (
          permissions.map((permission, index) => (
            <div
              className={`row permission-content-display ${
                permission.active ? "active-permission" : "inactive-permission"
              }`}
              key={index}
            >
              <div className="col-sm-5 p-3">{permission.name}</div>
              <div className="col-sm-4 p-3 permission-actions">
                {/* Prevent editing if permission is inactive */}
                {permission.active ? (
                  <FontAwesomeIcon
                    icon={faPen}
                    className="editPermission-icon"
                    onClick={() => handleModalShow(permission.name)}
                  />
                ) : (
                  <span className="editPermission-icon-disabled">
                    <FontAwesomeIcon
                    icon={faPen}
                    />
                  </span>
                )}
                <FontAwesomeIcon
                  icon={faTrash}
                  className="deletePermission-icon"
                  onClick={() => handleDeletePermission(permission)}
                />
                <FontAwesomeIcon
                  icon={permission.active ? faToggleOn : faToggleOff}
                  className="togglePermission-icon"
                  onClick={() => handleTogglePermission(permission)}
                  title={
                    permission.active
                      ? "Disable Permission"
                      : "Enable Permission"
                  }
                />
              </div>
            </div>
          ))
        ) : (
          <p>No permissions found</p>
        )}
      </div>

      {isModalActive && (
        <div className="modal-permission">
          <div className="modal-header">
            <h5 className="modal-heading">
              {editMode ? "Edit Permission" : "Add Permission"}
            </h5>
            <FontAwesomeIcon
              icon={faTimes}
              className="permission-modal-close"
              onClick={handleModalClose}
            />
          </div>
          <div className="modal-content">
            <div className="modal-container">
              <h5>Permission:</h5>
              <input
                type="text"
                value={newPermission}
                onChange={(e) => setNewPermission(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-save-permission">
            <button onClick={handleSavePermission}>
              {editMode ? "Update" : "Save"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Permissions;
