import { useState } from 'react';
// import 'Projects.css'

const AddProjectForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    status: '',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Project added successfully:', data);
      })
      .catch(error => console.error('Error adding project:', error));
  };

  return (
    <div>
      <h2>Add Project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <label>
          Status:
          <input type="text" name="status" value={formData.status} onChange={handleChange} />
        </label>
        {/* Add more input fields for other project details */}
        <button type="submit">Add Project</button>
      </form>
    </div>
  );
};

export default AddProjectForm;
