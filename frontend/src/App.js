import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AddEmployee from './pages/AddEmployee';
import EmployeeList from './pages/EmployeeList';
import UpdateEmployee from './pages/UpdateEmployee';
import ViewEmployee from './pages/ViewEmployee';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employees/add" element={<AddEmployee />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/employees/update/:id" element={<UpdateEmployee />} />
        <Route path="/employees/view/:id" element={<ViewEmployee />} />
      </Routes>
    </Router>
  );
}

export default App;
