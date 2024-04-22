import PropTypes from 'prop-types';
import './DeleteEmployee.css';

const DeleteEmployee = ({ employeeId }) => {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      fetch(`http://127.0.0.1:5555/api/employees/${employeeId}`, {
        method: 'DELETE',
      })
        .then(response => response.json())
        .then(data => {
          console.log('Employee deleted successfully:', data);
          // Optionally, redirect to the employee list or show a success message
        })
        .catch(error => console.error('Error deleting employee:', error));
    }
  };

  return (
    <div>
      <button onClick={handleDelete} className="delete-emp-btn">Delete Employee</button>
    </div>
  );
};

DeleteEmployee.propTypes = {
  employeeId: PropTypes.number.isRequired,
};

export default DeleteEmployee;
