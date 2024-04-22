import  { useState, useEffect } from 'react';
import './Departments.css'; 
import PropTypes from 'prop-types'; 


const EditDepartmentForm = ({ id }) => {
  const [formData, setFormData] = useState({
    name: '',
    create_date: '',
  });

  useEffect(() => {
    // Fetch department data from the API based on the provided id
    fetch(`/api/departments/${id}`)
      .then(response => response.json())
      .then(data => setFormData(data))
      .catch(error => console.error('Error fetching department:', error));
  }, [id]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetch(`/api/departments/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Department updated successfully:', data);
        // Optionally, redirect to the department list or show a success message
      })
      .catch(error => console.error('Error updating department:', error));
  };

  return (
    <div>
      <h2>Edit Department</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <label>
          Created Date:
          <input type="text" name="create_date" value={formData.create_date} onChange={handleChange} />
        </label>
        {/* Add more fields here as needed */}
        <button type="submit">Update Department</button>
      </form>
    </div>
  );
};
EditDepartmentForm.propTypes = {
    id: PropTypes.number.isRequired,
  };
export default EditDepartmentForm;
