const Permission = require('../models/Permission');

// Fetch all permissions
exports.getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find();
    res.json(permissions);
  } catch (error) {
    console.error("Error fetching permissions:", error);
    res.status(500).json({ message: 'Error fetching permissions' });
  }
};

// Add a new permission
exports.addPermission = async (req, res) => {
  const { permission } = req.body;
  if (!permission) {
    return res.status(400).json({ message: 'Permission name is required' });
  }
  try {
    const newPermission = new Permission({ name: permission, active: true });
    await newPermission.save();
    res.status(201).json(newPermission);
  } catch (error) {
    console.error("Error adding permission:", error);
    res.status(500).json({ message: 'Error adding permission' });
  }
};

// Update permission
exports.updatePermission = async (req, res) => {
  const { oldPermission, newPermission } = req.body;
  try {
    const updatedPermission = await Permission.findOneAndUpdate(
      { name: oldPermission },
      { name: newPermission },
      { new: true }
    );
    if (!updatedPermission) {
      return res.status(404).json({ message: 'Permission not found' });
    }
    res.json(updatedPermission);
  } catch (error) {
    console.error("Error updating permission:", error);
    res.status(500).json({ message: 'Error updating permission' });
  }
};

// Delete permission
exports.deletePermission = async (req, res) => {
  const { permission } = req.body;
  try {
    const deletedPermission = await Permission.findOneAndDelete({ name: permission });
    if (!deletedPermission) {
      return res.status(404).json({ message: 'Permission not found' });
    }
    res.json({ message: 'Permission deleted successfully' });
  } catch (error) {
    console.error("Error deleting permission:", error);
    res.status(500).json({ message: 'Error deleting permission' });
  }
};

// Toggle permission active status
exports.togglePermission = async (req, res) => {
  const { permission } = req.body;
  try {
    const updatedPermission = await Permission.findOneAndUpdate(
      { name: permission.name },
      { active: permission.active },
      { new: true }
    );
    if (!updatedPermission) {
      return res.status(404).json({ message: 'Permission not found' });
    }
    res.json(updatedPermission);
  } catch (error) {
    console.error("Error toggling permission status:", error);
    res.status(500).json({ message: 'Error toggling permission status' });
  }
};
