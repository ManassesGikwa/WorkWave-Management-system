import { useState, useEffect } from 'react';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    // Fetch departments data from the API
    fetch('/api/departments')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch departments');
        }
        return response.json();
      })
      .then(data => setDepartments(data))
      .catch(error => console.error('Error fetching departments:', error));
  }, []);

  return (
    <div>
      <h2>Department List</h2>
      <table className="department-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {departments.map(department => (
            <tr key={department.id}>
              <td>{department.id}</td>
              <td>{department.name}</td>
              {/* Add more table cells for additional data */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentList;
