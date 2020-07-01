const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  username: {
    type: String,
    required: true,
    select: true,
  },
  password: {
    type: String,
    required: true,
    select: true,
  },
  role: {
    type: String,
    required: true,
    select: true,
  }
});


module.exports = mongoose.model('Admin', AdminSchema);

