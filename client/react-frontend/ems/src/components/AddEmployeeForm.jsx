import { useState } from 'react';
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
    DOB: new Date(),
    employee_availability_status: '',
    join_date: new Date(),
    salary: '',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (name, date) => {
    setFormData({ ...formData, [name]: date });
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetch('http://127.0.0.1:5555/api/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Employee added successfully:', data);
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
          Salary:
          <input type="text" name="salary" value={formData.salary} onChange={handleChange} />
        </label>
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployeeForm;
