
const mongoose = require('mongoose');

const PermissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

const Permission = mongoose.model('Permission', PermissionSchema);

module.exports = Permission;
