import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Table, Container, Row, Col } from 'react-bootstrap';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchDepartment, setSearchDepartment] = useState('');
  const [searchPosition, setSearchPosition] = useState('');
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/employees');
      setEmployees(response.data);
      setFilteredEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      alert('Failed to fetch employees');
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/employees/${id}`);
      alert('Employee deleted successfully!');
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
      alert('Failed to delete employee');
    }
  };

  const handleSearch = () => {
    let filtered = employees;
    if (searchDepartment) {
      filtered = filtered.filter((employee) =>
        employee.department.toLowerCase().includes(searchDepartment.toLowerCase())
      );
    }
    if (searchPosition) {
      filtered = filtered.filter((employee) =>
        employee.position.toLowerCase().includes(searchPosition.toLowerCase())
      );
    }
    setFilteredEmployees(filtered);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logged out successfully!');
    navigate('/');
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <Container fluid className="mt-5" style={{ backgroundColor: '#f1f3f6' }}>
      <Row className="mb-4 d-flex justify-content-between align-items-center">
        <Col>
          <h1 className="text-dark font-weight-bold">Employee List</h1>
        </Col>
        <Col className="text-right">
          <Button
            className="btn-lg btn-success me-2"
            onClick={() => navigate('/employees/add')}
          >
            Add Employee
          </Button>
          <Button
            className="btn-lg btn-outline-danger"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col lg={4} md={6} sm={12} className="mb-2">
          <Form.Control
            type="text"
            placeholder="Search by Department"
            value={searchDepartment}
            onChange={(e) => setSearchDepartment(e.target.value)}
            style={{ padding: '10px' }}
          />
        </Col>
        <Col lg={4} md={6} sm={12} className="mb-2">
          <Form.Control
            type="text"
            placeholder="Search by Position"
            value={searchPosition}
            onChange={(e) => setSearchPosition(e.target.value)}
            style={{ padding: '10px' }}
          />
        </Col>
        <Col lg={2} md={4} sm={12} className="mb-2">
          <Button
            className="btn-lg btn-primary w-100"
            onClick={handleSearch}
            style={{ padding: '10px' }}
          >
            Search
          </Button>
        </Col>
      </Row>

      <div className="table-responsive">
        <Table striped bordered hover variant="light">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Position</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee, index) => (
              <tr key={employee._id} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#fafafa' }}>
                <td>{employee.name}</td>
                <td>{employee.department}</td>
                <td>{employee.position}</td>
                <td>{employee.salary}</td>
                <td>
                  <Button
                    className="btn-sm btn-info me-2"
                    onClick={() => navigate(`/employees/view/${employee._id}`)}
                  >
                    View
                  </Button>
                  <Button
                    className="btn-sm btn-warning me-2"
                    onClick={() => navigate(`/employees/update/${employee._id}`)}
                  >
                    Update
                  </Button>
                  <Button
                    className="btn-sm btn-danger"
                    onClick={() => deleteEmployee(employee._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
}

export default EmployeeList;
