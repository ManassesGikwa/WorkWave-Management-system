import { useParams, useHistory } from 'react-router-dom';

// import 'Projects.css'

const DeleteProject = () => {
  const { id } = useParams();
  const history = useHistory();

  const handleDelete = () => {
    fetch(`http://127.0.0.1:5555/api/projects/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        console.log('Project deleted successfully');
        history.push('/projects');
      })
      .catch(error => console.error('Error deleting project:', error));
  };

  return (
    <div>
      <h2>Delete Project</h2>
      <p>Are you sure you want to delete this project?</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default DeleteProject;
