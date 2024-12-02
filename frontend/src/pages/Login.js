import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Card, Container, Row, Col } from 'react-bootstrap';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/users/login', {
        username,
        password,
      });
      localStorage.setItem('token', response.data.token);
      alert('Login successful');
      navigate('/employees');
    } catch (error) {
      console.error('Error during login:', error);
      alert(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#f4f6f9' }}>
      <Row className="w-100 justify-content-center">
        <Col lg={4} md={6} sm={8}>
          <Card className="shadow-sm border-0 rounded-4" style={{ backgroundColor: '#ffffff', padding: '30px' }}>
            <h4 className="text-center text-primary mb-4">Login</h4>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="text-muted">Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="text-muted">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button type="submit" className="w-100 btn-lg btn-primary" style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}>
                Login
              </Button>
            </Form>
            <div className="text-center mt-3">
              <p className="text-muted">
                Don't have an account?{' '}
                <a
                  href="#"
                  onClick={() => navigate('/signup')}
                  style={{ color: '#007bff', fontWeight: 'bold' }}
                >
                  Sign up here
                </a>
              </p>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
