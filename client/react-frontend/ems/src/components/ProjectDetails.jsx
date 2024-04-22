import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'Projects.css'

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    fetch(`/api/projects/${id}`)
      .then(response => response.json())
      .then(data => setProject(data))
      .catch(error => console.error('Error fetching project details:', error));
  }, [id]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Project Details</h2>
      <p>Name: {project.name}</p>
      <p>Status: {project.status}</p>
      {/* Display more project details as needed */}
    </div>
  );
};

export default ProjectDetails;
