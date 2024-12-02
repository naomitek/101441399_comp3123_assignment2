import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddEmployee() {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');
  const [salary, setSalary] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/employees', {
        name,
        department,
        position,
        salary,
      });
      alert('Employee added successfully!');
      navigate('/employees');
    } catch (error) {
      console.error('Error adding employee:', error);
      alert('Failed to add employee');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg">
        <h4 className="text-center mb-4">Add Employee</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="department" className="form-label">Department</label>
            <input
              type="text"
              className="form-control"
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="position" className="form-label">Position</label>
            <input
              type="text"
              className="form-control"
              id="position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="salary" className="form-label">Salary</label>
            <input
              type="number"
              className="form-control"
              id="salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-lg w-100 mb-3"
          >
            Add Employee
          </button>
          <button
            type="button"
            className="btn btn-dark btn-lg w-100"
            onClick={() => navigate('/employees')}
          >
            Back to Employee List
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddEmployee;
