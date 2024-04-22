import { useState } from 'react';
// import './Departments.css'; 

const AddDepartmentForm = () => {
  const [formData, setFormData] = useState({ name: '', createDate: '' });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Send POST request to add new department
    fetch('http://127.0.0.1:5555/api/departments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Department added successfully:', data);
      })
      .catch(error => console.error('Error adding department:', error));
  };

  return (
    <div>
      <h2>Add Department</h2>
      <form onSubmit={handleSubmit}>
        <label className="department-label">Name:</label>
        <input className="department-input" type="text" name="name" value={formData.name} onChange={handleChange} />
        <label className="department-label">Create Date:</label>
        <input className="department-input" type="date" name="createDate" value={formData.createDate} onChange={handleChange} />
        <button className="department-button" type="submit">Add Department</button>
      </form>
    </div>
  );
};

export default AddDepartmentForm;
