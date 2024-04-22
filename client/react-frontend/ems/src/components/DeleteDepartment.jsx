import PropTypes from 'prop-types'; 

const DeleteDepartment = ({ id }) => {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      fetch(`/api/departments/${id}`, {
        method: 'DELETE',
      })
        .then(response => response.json())
        .then(data => {
          console.log('Department deleted successfully:', data);
          // Optionally, redirect to the department list or show a success message
        })
        .catch(error => console.error('Error deleting department:', error));
    }
  };

  return (
    <div>
      <h2>Delete Department</h2>
      <button onClick={handleDelete}>Delete Department</button>
    </div>
  );
};
DeleteDepartment.propTypes = {
    id: PropTypes.number.isRequired,
  };
export default DeleteDepartment;
