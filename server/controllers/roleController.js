
const Role = require('../models/Role');
const Permission = require('../models/Permission');

// Fetch all roles
exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.find().populate("permissions","_id name");
    res.json(roles);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch roles" });
  }
};

// Add a new role
exports.addRole = async (req, res) => {
  const { newRole, permissions } = req.body;

  if (!newRole) {
    return res.status(400).json({ error: "Role name is required" });
  }

  try {
    const newRoleEntry = new Role({
      name: newRole,
      permissions: permissions || [],
      active: true,
    });

    const savedRole = await newRoleEntry.save();
    res.status(201).json(savedRole);
  } catch (err) {
    console.error("Error adding role:", err);
    res.status(500).json({ error: "Failed to add role" });
  }
};

// Update an existing role
exports.updateRole = async (req, res) => {
  const roleId = req.params.roleId;
  const { newRole, permissions } = req.body;

  console.log("Payload received:", req.body); // Log incoming payload

  if (!newRole || !Array.isArray(permissions)) {
    return res.status(400).json({ error: "New role name and permissions are required" });
  }

  try {
    const role = await Role.findByIdAndUpdate(
      roleId,
      { name: newRole, permissions },
      { new: true }
    );

    if (!role) {
      return res.status(404).json({ error: "Role not found" });
    }

    res.json({ message: "Role updated successfully", role });
  } catch (err) {
    console.error("Error updating role:", err);
    res.status(500).json({ error: "Failed to update role" });
  }
};

// Delete a role
exports.deleteRole = async (req, res) => {
  const roleId = req.params.id;
  if (!roleId) return res.status(400).json({ error: "Role ID is required" });

  try {
    const deletedRole = await Role.findByIdAndDelete(roleId);
    if (!deletedRole) return res.status(404).json({ error: "Role not found" });

    res.json({ message: "Role deleted successfully", role: deletedRole });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete role" });
  }
};

// Toggle role active/inactive
exports.toggleRole = async (req, res) => {
  const roleId = req.params.roleId;

  try {
    const role = await Role.findById(roleId);
    if (!role) {
      return res.status(404).json({ error: "Role not found" });
    }

    role.active = !role.active;
    await role.save();

    res.json({ message: "Role toggled successfully", role });
  } catch (err) {
    console.error("Error toggling role:", err);
    res.status(500).json({ error: "Failed to toggle role" });
  }
};

// Get Permissions for Role Section
exports.getRolePermissions = async (req, res) => {
  try {
    const activePermissions = await Permission.find({ active: true });
    res.json(activePermissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
