// EditEmployeeForm.js
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import './EditEmployeeForm.css';

const EditEmployeeForm = ({ employeeId }) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/employees/${employeeId}`)
      .then(response => response.json())
      .then(data => {
        setFormData(data);
        setLoading(false);
      })
      .catch(error => console.error(`Error fetching employee with ID ${employeeId}:`, error));
  }, [employeeId]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetch(`/api/employees/${employeeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Employee updated successfully:', data);
        // Optionally, redirect to the employee details page or show a success message
      })
      .catch(error => console.error('Error updating employee:', error));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="edit-employee-container">
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit} className="edit-employee-form">
        <label className="edit-label">
          First Name:
          <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} className="edit-employee-input" />
        </label>
        <label className="edit-label">
          Last Name:
          <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} className="edit-employee-input" />
        </label>
        <label className="edit-label">
          Role:
          <input type="text" name="role" value={formData.role} onChange={handleChange} className="edit-employee-input" />
        </label>
        <button type="submit" className="edit-employee-save">Update Employee</button>
      </form>
    </div>
  );
};

EditEmployeeForm.propTypes = {
  employeeId: PropTypes.number.isRequired,
};

export default EditEmployeeForm;
