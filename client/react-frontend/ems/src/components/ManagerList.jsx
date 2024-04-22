import { useState, useEffect } from 'react';
// import 'Managers.css'

const ManagerList = () => {
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    fetch('/api/managers')
      .then(response => response.json())
      .then(data => setManagers(data))
      .catch(error => console.error('Error fetching managers:', error));
  }, []);

  return (
    <div>
      <h1>Manager List</h1>
      <ul>
        {managers.map(manager => (
          <li key={manager.id}>
            {manager.first_name} {manager.last_name} - {manager.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManagerList;
