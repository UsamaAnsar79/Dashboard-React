
// const mongoose = require("mongoose");
// const RoleSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     unique:true,
//   },
//   active: {
//     type: Boolean,
//     default: true,
//   },
//   permissions: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Permission'
//   }]
// });

// module.exports = mongoose.model("Role", RoleSchema);
const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  permissions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Permission',
  }]
}, { timestamps: true }); // Adds createdAt and updatedAt fields

// Optional: Add indexes for performance
RoleSchema.index({ name: 1 });
RoleSchema.index({ active: 1 });

module.exports = mongoose.model("Role", RoleSchema);
