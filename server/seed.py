import sys
import os
# Get the parent directory of the 'server' module
parent_dir = os.path.abspath(os.path.join(os.path.dirname(_file_), '..'))
# Add the parent directory to sys.path
sys.path.append(parent_dir)

# Standard library imports
import random
from datetime import datetime, timedelta

# Local library imports
from server import create_app
from server.models import db, Manager, Department, Project, Employee, EmployeeProject

# Additional imports for seeding
from faker import Faker

fake = Faker()

def clear_tables(session):
    # Delete all rows from each table
    session.query(Employee).delete()
    session.query(Department).delete()
    session.query(Project).delete()
    session.query(EmployeeProject).delete()
    session.query(Manager).delete()  # Clear Manager table

# Function to generate random date
def random_date(start_date, end_date):
    return start_date + (end_date - start_date) * random.random()

# Function to generate random phone numbers
def generate_phone_number():
    return fake.phone_number()

# Function to create sample employees
def create_employees(num_employees, departments):
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
        employees.append(employee)
    return employees

# Function to create sample departments
def create_departments():
    departments = [
        Department(name="Engineering", create_date=datetime(2016, 1, 1)),
        Department(name="Marketing", create_date=datetime(2017, 1, 1)),
        Department(name="Finance", create_date=datetime(2016, 8, 1))
    ]
    return departments

# Function to create sample projects with realistic start and end dates based on status
def create_projects(num_projects):
    projects = []
    for _ in range(num_projects):
        status = random.choice(["Active", "Inactive", "Completed"])
        project = Project(
            name=f"Project{_}",
            status=status
        )
        projects.append(project)
    return projects

# Function to create sample managers for departments
def create_managers(departments, employees):
    managers = []
    for department in departments:
        manager_employee = random.choice(employees)  # Choose a random employee as manager
        manager = Manager(
            first_name=fake.first_name(),  # Generate a random first name
            last_name=fake.last_name(),  # Generate a random last name
            email=fake.email(),  # Generate a random email
            phone_number=fake.phone_number(),  # Generate a random phone number
            join_date=fake.date_between(start_date='-5y', end_date='today'),  # Generate a random join date within the last 5 years
            #department_id=department.id,  # Pass the department id
            employee_id=manager_employee.id  # Pass the employee id
        )
        managers.append(manager)
    return managers


# Function to assign employees to projects with realistic start and end dates
def assign_employees_to_projects(employees, projects):
    for employee in employees:
        if employee.employee_availability_status == "Available":
            num_projects_assigned = random.randint(1, 3)  # Assigning each employee to 1-3 projects
            projects_to_assign = random.sample(projects, num_projects_assigned)
            for project in projects_to_assign:
                if not EmployeeProject.query.filter_by(employee=employee, project=project).first():
                    # Logic for realistic start and end dates based on project status
                    start_date, end_date = get_project_dates(project.status)
                    employee_project = EmployeeProject(
                        employee=employee,
                        project=project,
                        start_date=start_date,
                        end_date=end_date
                    )
                    db.session.add(employee_project)
    db.session.commit()

# Helper function to calculate realistic start and end dates
def get_project_dates(status):
    """Calculates realistic start and end dates based on project status."""
    if status == "Active":
        start_date = datetime.now()  # Active projects can have recent start dates
        end_date = None  # No end date for ongoing projects
    elif status == "Inactive":
        # Randomly choose a date in the past year for becoming inactive
        max_inactive_days = (datetime.now() - datetime(2023, 1, 1)).days
        inactive_offset = int(max_inactive_days * random.random())
        start_date = datetime(2023, 1, 1) + timedelta(days=inactive_offset)
        end_date = datetime.now()  # Project becomes inactive on a random date
    else:  # status is "Completed"
        # Randomly choose dates in the past for start and completion
        max_completion_days = (datetime.now() - datetime(2020, 1, 1)).days
        completion_offset = int(max_completion_days * random.random())
        start_date = datetime(2020, 1, 1) + timedelta(days=completion_offset)
        project_duration = int((datetime.now() - start_date).days * random.random())
        end_date = start_date + timedelta(days=project_duration)
    return start_date, end_date

# Main function to seed the database
def seed():
    app = create_app()
    with app.app_context():
        with db.session.begin():
            clear_tables(db.session)
            
        # Create sample departments
        departments = create_departments()
        db.session.add_all(departments)
        db.session.commit()

        # Create sample employees
        employees = create_employees(10, departments) 
        db.session.add_all(employees)
        db.session.commit()

        # Create sample managers
        managers = create_managers(departments, employees)
        db.session.add_all(managers)
        db.session.commit()

        # Create sample projects
        projects = create_projects(5) 
        db.session.add_all(projects)
        db.session.commit()

        # Assign employees to projects
        assign_employees_to_projects(employees, projects)
        db.session.commit()

        print("Database seeded successfully!")

if _name_ == "_main_":
    seed()