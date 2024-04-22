import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'Projects.css'

const EditProjectForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    status: '',
  });

  useEffect(() => {
    fetch(`/api/projects/${id}`)
      .then(response => response.json())
      .then(data => setFormData(data))
      .catch(error => console.error('Error fetching project details:', error));
  }, [id]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetch(`/api/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Project updated successfully:', data);
        // Optionally, redirect to the project details or show a success message
      })
      .catch(error => console.error('Error updating project:', error));
  };

  return (
    <div>
      <h2>Edit Project</h2>
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
        <button type="submit">Update Project</button>
      </form>
    </div>
  );
};

export default EditProjectForm;
