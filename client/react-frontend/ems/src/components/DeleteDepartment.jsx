import PropTypes from 'prop-types'; 

const DeleteDepartment = ({ id }) => {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      fetch(`http://127.0.0.1:5555/api/departments/${id}`, {
        method: 'DELETE',
      })
        .then(response => response.json())
        .then(data => {
          console.log('Department deleted successfully:', data);
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
