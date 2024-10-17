// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   status:{
//   type:String,
//   enum:['pending','rejected','active','inactive'],
//   default:'pending'
//   },
//   roles:[{
//     type:mongoose.Schema.Types.ObjectId,
//     ref:'Role'
//   }]
// });

// const User = mongoose.model('User', userSchema);
// module.exports = User;

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'rejected', 'active', 'inactive'],
    default: 'pending',
  },
  roles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
  }],
});

const User = mongoose.model('User', userSchema);
module.exports = User;
