import { useState } from 'react';
// import 'Managers.css'

const AddManagerForm = () => {
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

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetch('/api/managers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Manager added successfully:', data);
        // Optionally, redirect to the manager list or show a success message
      })
      .catch(error => console.error('Error adding manager:', error));
  };

  return (
    <div>
      <h2>Add Manager</h2>
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
        <button type="submit">Add Manager</button>
      </form>
    </div>
  );
};

export default AddManagerForm;
