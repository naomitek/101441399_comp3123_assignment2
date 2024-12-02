const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  position: { type: String, required: true },
  salary: { type: Number, required: true, min: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);