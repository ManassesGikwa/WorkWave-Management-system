// EmployeeDetails.js
import PropTypes from 'prop-types';

import { useState, useEffect } from 'react';

const EmployeeDetails = ({ employeeId }) => {
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:5555/api/employees/${employeeId}`)
      .then(response => response.json())
      .then(data => setEmployee(data))
      .catch(error => console.error(`Error fetching employee with ID ${employeeId}:`, error));
  }, [employeeId]);

  return (
    <div>
      <h2>Employee Details</h2>
      {employee ? (
        <div>
          <p>ID: {employee.id}</p>
          <p>First Name: {employee.first_name}</p>
          <p>Last Name: {employee.last_name}</p>
          <p>Role: {employee.role}</p>
          {/* Add more details here if needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

EmployeeDetails.propTypes = {
    employeeId: PropTypes.number.isRequired,
  };

export default EmployeeDetails;
