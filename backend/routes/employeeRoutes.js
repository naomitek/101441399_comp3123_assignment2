const express = require('express');
const {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  searchEmployees,
} = require('../controllers/employeeController');

const router = express.Router();

router.post('/', createEmployee);
router.get('/', getEmployees);
router.get('/search', searchEmployees);
router.get('/:id', getEmployeeById);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

module.exports = router;
