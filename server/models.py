#models 
# Remote library imports
from sqlalchemy import MetaData
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from . import db
from werkzeug.security import generate_password_hash, check_password_hash  


# Define metadata
metadata = MetaData(
    naming_convention={
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    }
)
    
# EmployeeProject association object
class EmployeeProject(db.Model, SerializerMixin):
    _tablename_ = 'employee_project'  # Corrected typo here
    
    # Specify extend_existing=True
    _table_args_ = {'extend_existing': True}
    
    # Foreign keys
    employee_id = db.Column(db.Integer, db.ForeignKey('employees.id', ondelete='CASCADE'), primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id', ondelete='CASCADE'), primary_key=True)
    
    # Additional columns
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=True)
    
    # Relationships
    employee = db.relationship("Employee", back_populates="employee_projects")
    project = db.relationship("Project", back_populates="project_employees")




class Employee(db.Model, SerializerMixin):
    _tablename_ = "employees"
    
    # Specify extend_existing=True
    _table_args_ = {'extend_existing': True}
    
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    phone_number = db.Column(db.String(20))
    email = db.Column(db.String(100), unique=True, nullable=False)
    city = db.Column(db.String(100))
    DOB = db.Column(db.Date)
    employee_availability_status = db.Column(db.String(255), default='Available')
    role = db.Column(db.String(50), nullable=False, default='Employee')
    join_date = db.Column(db.Date)
    department_id = db.Column(db.Integer, db.ForeignKey('departments.id', ondelete='CASCADE'))
    
    manager_id = db.Column(db.Integer, db.ForeignKey('managers.id'))
    manager = db.relationship("Manager", back_populates="employees", foreign_keys=[manager_id], primaryjoin="Employee.manager_id == Manager.id")

    
    salary = db.Column(db.Float)
    
    department = db.relationship("Department", back_populates="employees")
    employee_projects = db.relationship("EmployeeProject", back_populates="employee")
    projects = association_proxy('employee_projects', 'project')
    
    serialize = ['id', 'first_name', 'last_name', 'email', 'city', 'DOB', 'employee_availability_status', 'role', 'join_date', 'department_id', 'salary']



# Department model
class Department(db.Model, SerializerMixin):
    _tablename_ = "departments"
    
    # Specify extend_existing=True
    _table_args_ = {'extend_existing': True}
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    create_date = db.Column(db.Date, nullable=False)
    
    employees = db.relationship("Employee", back_populates="department", lazy='dynamic', cascade="all, delete-orphan")
    
    serialize = ['id', 'name', 'create_date']

# Project model
class Project(db.Model, SerializerMixin):
    _tablename_ = "projects"
    
    # Specify extend_existing=True
    _table_args_ = {'extend_existing': True}
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(20), nullable=False)
    
    project_employees = db.relationship("EmployeeProject", back_populates="project")
    employees = association_proxy('project_employees', 'employee')
    
    serialize = ['id', 'name', 'status']

    
class Manager(db.Model, SerializerMixin):
    _tablename_ = "managers"

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    phone_number = db.Column(db.String(20))
    join_date = db.Column(db.Date)
    
    # Remove department_id
    
    employee_id = db.Column(db.Integer, db.ForeignKey('employees.id'), nullable=False)
    
    # Define the relationship with Employee model
    employees = db.relationship("Employee", back_populates="manager", foreign_keys="[Employee.manager_id]")