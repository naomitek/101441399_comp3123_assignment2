import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: '',
    department: '',
    position: '',
    salary: '',
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/employees/${id}`);
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee:', error);
        alert('Failed to fetch employee');
      }
    };
    fetchEmployee();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5001/api/employees/${id}`, employee);
      alert('Employee updated successfully!');
      navigate('/employees');
    } catch (error) {
      console.error('Error updating employee:', error);
      alert('Failed to update employee');
    }
  };

  return (
    <div className="container" style={{ marginTop: '6rem' }}>
      <div className="card shadow-lg p-4 rounded-3" style={{ backgroundColor: '#f8f9fa' }}>
        <h4 className="text-center mb-4" style={{ color: '#007bff' }}>Update Employee</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={employee.name}
              onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
              required
              style={{ fontSize: '1rem' }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="department" className="form-label">Department</label>
            <input
              type="text"
              className="form-control"
              id="department"
              value={employee.department}
              onChange={(e) => setEmployee({ ...employee, department: e.target.value })}
              required
              style={{ fontSize: '1rem' }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="position" className="form-label">Position</label>
            <input
              type="text"
              className="form-control"
              id="position"
              value={employee.position}
              onChange={(e) => setEmployee({ ...employee, position: e.target.value })}
              required
              style={{ fontSize: '1rem' }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="salary" className="form-label">Salary</label>
            <input
              type="number"
              className="form-control"
              id="salary"
              value={employee.salary}
              onChange={(e) => setEmployee({ ...employee, salary: e.target.value })}
              required
              style={{ fontSize: '1rem' }}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3" style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
            Update Employee
          </button>
        </form>
        <div className="text-center">
          <button
            className="btn btn-outline-dark w-100"
            onClick={() => navigate('/employees')}
            style={{ fontSize: '1rem', fontWeight: '600' }}
          >
            Back to Employee List
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateEmployee;
