import sys
import os
import random
from datetime import datetime, timedelta
from faker import Faker

from flask import Flask
from flask_sqlalchemy import SQLAlchemy

# Get the parent directory of the 'server' module
parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
# Add the parent directory to sys.path
sys.path.append(parent_dir)

# Local library imports
from server import create_app
from server.models import db, Manager, Department, Project, Employee, EmployeeProject

# Create a Faker instance for generating fake data
fake = Faker()

def clear_tables(session):
    """Clear all rows from each table."""
    session.query(Employee).delete()
    session.query(Department).delete()
    session.query(Project).delete()
    session.query(EmployeeProject).delete()
    session.query(Manager).delete()

def random_date(start_date, end_date):
    """Generate a random date between start_date and end_date."""
    return start_date + (end_date - start_date) * random.random()

def generate_phone_number():
    """Generate a random phone number."""
    return fake.phone_number()

def create_employees(num_employees, departments):
    """Create sample employees."""
    employees = []
    for i in range(num_employees):
        if i == 0:  # First employee is admin
            employee = Employee(
                first_name="Admin",
                last_name="User",
                email="admin.user@workwave.com",  # Admin email
                phone_number=generate_phone_number(),  # Generate random phone number
                city="New York",
                DOB=datetime(1990, 1, 1),
                employee_availability_status="Available",
                role="Admin",
                join_date=datetime(2022, 1, 1),
                department=random.choice(departments),  # Randomly assign department
                salary=random.randint(50000, 100000)  # Random salary amount
            )
        else:
            employee = Employee(
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                email=f"employee{i}@workwave.com",  # Regular employee email
                phone_number=generate_phone_number(),  # Generate random phone number
                city=fake.city(),
                DOB=fake.date_of_birth(minimum_age=18, maximum_age=65),  # Random date of birth between 18 and 65 years ago
                employee_availability_status=random.choice(["Available", "On Leave", "Busy"]),  # Randomly assign availability status
                role="Employee",
                join_date=random_date(datetime(2015, 1, 1), datetime.now()),  # Random join date in the past 10 years
                department=random.choice(departments),  # Randomly assign department
                salary=random.randint(50000, 100000)  # Random salary amount
            )
        employee.set_password("password123")  
        employees.append(employee)
    return employees

def create_departments():
    """Create sample departments."""
    departments = [
        Department(name="Engineering", create_date=datetime(2016, 1, 1)),
        Department(name="Marketing", create_date=datetime(2017, 1, 1)),
        Department(name="Finance", create_date=datetime(2016, 8, 1))
    ]
    return departments

def create_projects(num_projects):
    """Create sample projects."""
    projects = []
    for _ in range(num_projects):
        status = random.choice(["Active", "Inactive", "Completed"])
        project = Project(
            name=f"Project{_}",
            status=status
        )
        projects.append(project)
    return projects

def create_managers(departments, employees):
    managers = []
    for department in departments:
        manager_employee = random.choice(employees)  # Choose a random employee as manager
        manager_salary = manager_employee.salary if manager_employee.salary else random.randint(80000, 150000)
        manager = Manager(
            first_name=manager_employee.first_name,  # Use the employee's first name as the manager's first name
            last_name=manager_employee.last_name,  # Use the employee's last name as the manager's last name
            email=manager_employee.email,  # Use the employee's email as the manager's email
            phone_number=manager_employee.phone_number,  # Use the employee's phone number as the manager's phone number
            join_date=manager_employee.join_date,  # Use the employee's join date as the manager's join date
           
        )
        # Assign the manager to the department
        department.managers.append(manager)
        managers.append(manager)
    return managers


def assign_employees_to_projects(employees, projects):
    """Assign employees to projects with realistic start and end dates."""
    for employee in employees:
        if employee.employee_availability_status == "Available":
            num_projects_assigned = random.randint(1, 3)  # Assigning each employee to 1-3 projects
            projects_to_assign = random.sample(projects, num_projects_assigned)
            for project in projects_to_assign:
                if not EmployeeProject.query.filter_by(employee=employee, project=project).first():
                    start_date, end_date = get_project_dates(project.status)
                    employee_project = EmployeeProject(
                        employee=employee,
                        project=project,
                        start_date=start_date,
                        end_date=end_date
                    )
                    db.session.add(employee_project)
    db.session.commit()

def get_project_dates(status):
    """Calculate realistic start and end dates based on project status."""
    if status == "Active":
        start_date = datetime.now()  # Active projects can have recent start dates
        end_date = None  # No end date for ongoing projects
    elif status == "Inactive":
        max_inactive_days = (datetime.now() - datetime(2023, 1, 1)).days
        inactive_offset = int(max_inactive_days * random.random())
        start_date = datetime(2023, 1, 1) + timedelta(days=inactive_offset)
        end_date = datetime.now()  # Project becomes inactive on a random date
    else:  # status is "Completed"
        max_completion_days = (datetime.now() - datetime(2020, 1, 1)).days
        completion_offset = int(max_completion_days * random.random())
        start_date = datetime(2020, 1, 1) + timedelta(days=completion_offset)
        project_duration = int((datetime.now() - start_date).days * random.random())
        end_date = start_date + timedelta(days=project_duration)
    return start_date, end_date

def seed():
    """Seed the database with sample data."""
    app = create_app()
    with app.app_context():
        with db.session.begin():
            clear_tables(db.session)
            
        departments = create_departments()
        db.session.add_all(departments)
        db.session.commit()

        employees = create_employees(10, departments) 
        db.session.add_all(employees)
        db.session.commit()

        managers = create_managers(departments, employees)
        db.session.add_all(managers)
        db.session.commit()

        projects = create_projects(5) 
        db.session.add_all(projects)
        db.session.commit()

        assign_employees_to_projects(employees, projects)
        db.session.commit()

        print("Database seeded successfully!")

if __name__ == "__main__":
    seed()
