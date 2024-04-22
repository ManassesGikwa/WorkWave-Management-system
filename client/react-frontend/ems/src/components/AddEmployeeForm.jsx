import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddEmployeeForm = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    role: '',
    phone_number: '',
    email: '',
    city: '',
    DOB: new Date(), // Set default date to today
    employee_availability_status: '',
    join_date: new Date(), // Set default date to today
    department_id: '', // Initialize as empty string
    salary: '',
    // Add more fields as needed
  });

  const [departmentId, setDepartmentId] = useState('');

  // Simulate fetching the number of employees in the department
  useEffect(() => {
    // Simulate API call to fetch number of employees in department
    // For demonstration, we're just setting a random number
    const randomEmployeeCount = Math.floor(Math.random() * 100) + 1; // Generate random number between 1 and 100
    setDepartmentId(randomEmployeeCount.toString());
  }, []); // Run only once on component mount

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (name, date) => {
    setFormData({ ...formData, [name]: date });
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetch('/api/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Employee added successfully:', data);
        // Optionally, redirect to the employee list or show a success message
      })
      .catch(error => console.error('Error adding employee:', error));
  };

  return (
    <div>
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
        </label>
        <label>
          Last Name:
          <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
        </label>
        <label>
          Role:
          <input type="text" name="role" value={formData.role} onChange={handleChange} />
        </label>
        <label>
          Phone Number:
          <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <label>
          City:
          <input type="text" name="city" value={formData.city} onChange={handleChange} />
        </label>
        <label>
          Date of Birth:
          <DatePicker
            name="DOB"
            selected={formData.DOB}
            onChange={date => handleDateChange('DOB', date)}
          />
        </label>
        <label>
          Availability Status:
          <input type="text" name="employee_availability_status" value={formData.employee_availability_status} onChange={handleChange} />
        </label>
        <label>
          Join Date:
          <DatePicker
            name="join_date"
            selected={formData.join_date}
            onChange={date => handleDateChange('join_date', date)}
          />
        </label>
        <label>
          Department ID:
          <input type="text" name="department_id" value={departmentId} onChange={handleChange} readOnly />
        </label>
        <label>
          Salary:
          <input type="text" name="salary" value={formData.salary} onChange={handleChange} />
        </label>
        {/* Add more fields here as needed */}
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployeeForm;
