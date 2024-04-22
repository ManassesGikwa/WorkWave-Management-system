import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
// import 'Managers.css'

const EditManagerForm = ({ id }) => {
  const [manager, setManager] = useState(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    join_date: '',
    department_id: '',
    salary: '',
    // Add more fields as needed
  });

  useEffect(() => {
    fetch(`/api/managers/${id}`)
      .then(response => response.json())
      .then(data => {
        setManager(data);
        setFormData(data);
      })
      .catch(error => console.error('Error fetching manager:', error));
  }, [id]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetch(`/api/managers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Manager updated successfully:', data);
        // Optionally, redirect to the manager list or show a success message
      })
      .catch(error => console.error('Error updating manager:', error));
  };

  if (!manager) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Edit Manager</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
        </label>
        <label>
          Last Name:
          <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <label>
          Phone Number:
          <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} />
        </label>
        <label>
          Join Date:
          <input type="date" name="join_date" value={formData.join_date} onChange={handleChange} />
        </label>
        <label>
          Department ID:
          <input type="number" name="department_id" value={formData.department_id} onChange={handleChange} />
        </label>
        <label>
          Salary:
          <input type="number" name="salary" value={formData.salary} onChange={handleChange} />
        </label>
        {/* Add more fields here as needed */}
        <button type="submit">Update Manager</button>
      </form>
    </div>
  );
};

EditManagerForm.propTypes = {
    id: PropTypes.number.isRequired, // Assuming id is a number
  };

export default EditManagerForm;
