
## WorkWave Employee Management
WorkWave is an employee management system built with Flask for the backend API and React for the frontend user interface. It provides functionalities for user authentication, employee directory, department management, salary management, task assignment, and basic reporting.

## Features
# User Authentication:
- Secure login for users with different roles (admin, employee).
# Employee Directory:
- View, add, edit, and delete employee records.
# Department Management:
- Create, edit, and delete departments. Assign employees to departments.
# Salary Management:
- Set and update employee salaries.
# Task Assignment:
- Assign tasks to employees or place them in projects.
# Basic Reporting:
- Generate simple reports such as total employee count and employee count by department.
# User Interface: 
- Intuitive web interface with navigation between sections. Forms for data entry have basic validation.
# API Integration:
- Backend and frontend communicate through RESTful APIs.
## Installation
# Backend (Flask API)
1. Clone the repository.
2. Navigate to the backend directory.
3. Install dependencies: pip install -r requirements.txt.
4. Configure the database connection in config.py.
5. Run migrations: flask db upgrade.
6. Start the server: flask run.
# Frontend (React UI)
1. Navigate to the frontend directory.
2. Install dependencies: npm install.
3. Start the development server: npm start.
## Usage
1. Access the web application at http://localhost:3000 (by default).
2. Log in with your credentials.
3. Navigate through different sections using the sidebar menu.
4. Perform CRUD operations as necessary.