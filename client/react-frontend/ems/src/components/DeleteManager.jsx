import PropTypes from 'prop-types'; 
// import 'Managers.css'

const DeleteManager = ({ id }) => {
  const handleDelete = () => {
    fetch(`/api/managers/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        console.log('Manager deleted successfully:', data);
        // Optionally, redirect to the manager list or show a success message
      })
      .catch(error => console.error('Error deleting manager:', error));
  };

  return (
    <div>
      <h2>Delete Manager</h2>
      <p>Are you sure you want to delete this manager?</p>
      <button onClick={handleDelete}>Delete Manager</button>
    </div>
  );
};

DeleteManager.propTypes = {
    id: PropTypes.number.isRequired, // Assuming id is a number
  };
  

export default DeleteManager;
