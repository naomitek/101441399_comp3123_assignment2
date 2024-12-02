import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function ViewEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/employees/${id}`);
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee details:', error);
        alert('Failed to fetch employee details');
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-info" style={{ width: '3rem', height: '3rem' }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="text-center mt-5">
        <h6 className="text-danger">Employee not found</h6>
        <button className="btn btn-outline-info mt-3" onClick={() => navigate('/employees')}>
          Back to Employee List
        </button>
      </div>
    );
  }

  return (
    <div className="container" style={{ marginTop: '6rem' }}>
      <div className="card shadow-lg p-4 rounded-3" style={{ backgroundColor: '#f8f9fa' }}>
        <h4 className="text-center mb-4" style={{ color: '#1c5d99' }}>Employee Details</h4>
        <hr />
        <div className="mb-3">
          <h5 className="font-weight-bold" style={{ color: '#495057' }}>Name:</h5>
          <p className="font-weight-light">{employee.name}</p>
        </div>
        <div className="mb-3">
          <h5 className="font-weight-bold" style={{ color: '#495057' }}>Department:</h5>
          <p className="font-weight-light">{employee.department}</p>
        </div>
        <div className="mb-3">
          <h5 className="font-weight-bold" style={{ color: '#495057' }}>Position:</h5>
          <p className="font-weight-light">{employee.position}</p>
        </div>
        <div className="mb-3">
          <h5 className="font-weight-bold" style={{ color: '#495057' }}>Salary:</h5>
          <p className="font-weight-light">${employee.salary}</p>
        </div>
        <hr />
        <div className="text-center">
          <button
            className="btn btn-primary w-100 py-2"
            onClick={() => navigate('/employees')}
            style={{ fontWeight: 'bold', backgroundColor: '#1c5d99', borderColor: '#1c5d99' }}
          >
            Back to Employee List
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewEmployee;
