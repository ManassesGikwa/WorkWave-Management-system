from sqlalchemy import MetaData
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from . import db
from sqlalchemy import Column, Integer, String, ForeignKey, Date, Float
from sqlalchemy.orm import relationship
from werkzeug.security import generate_password_hash, check_password_hash

metadata = MetaData(
    naming_convention={
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    }
)

class Employee(db.Model, SerializerMixin):
    __tablename__ = "employees"
    
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    phone_number = db.Column(db.String(20))
    city = db.Column(db.String(100))
    DOB = db.Column(db.Date)
    employee_availability_status = db.Column(db.String(255), default='Available')
    role = db.Column(db.String(50), nullable=False, default='Employee')
    join_date = db.Column(db.Date)
    department_id = db.Column(db.Integer, db.ForeignKey('departments.id', ondelete='CASCADE'))
    manager_id = db.Column(db.Integer, db.ForeignKey('managers.id'))
    salary = db.Column(db.Float)
    password_hash = db.Column(db.String(128))  # Add password hash column
    
    # Define relationships
    department = db.relationship("Department", back_populates="employees")
    manager = db.relationship("Manager", back_populates="employees", foreign_keys=[manager_id])
    employee_projects = db.relationship("EmployeeProject", back_populates="employee", cascade="all, delete-orphan")
    projects = association_proxy('employee_projects', 'project')
    
    serialize = ['id', 'first_name', 'last_name', 'email', 'city', 'DOB', 'employee_availability_status', 'role', 'join_date', 'department_id', 'salary']

    # Define the set_password method
    def set_password(self, password):
        """Set the password hash for the employee."""
        self.password_hash = generate_password_hash(password)

class Department(db.Model, SerializerMixin):
    __tablename__ = "departments"
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    create_date = db.Column(db.Date, nullable=False)
    
    employees = db.relationship("Employee", back_populates="department", cascade="all, delete-orphan")
    
    serialize = ['id', 'name', 'create_date']

class Project(db.Model, SerializerMixin):
    __tablename__ = "projects"
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(20), nullable=False)
    
    project_employees = db.relationship("EmployeeProject", back_populates="project", cascade="all, delete-orphan")
    employees = association_proxy('project_employees', 'employee')
    
    serialize = ['id', 'name', 'status']

class EmployeeProject(db.Model, SerializerMixin):
    __tablename__ = 'employee_project'  
    
    employee_id = db.Column(db.Integer, db.ForeignKey('employees.id', ondelete='CASCADE'), primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id', ondelete='CASCADE'), primary_key=True)
    
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=True)
    
    employee = db.relationship("Employee", back_populates="employee_projects")
    project = db.relationship("Project", back_populates="project_employees")
    


class Manager(db.Model, SerializerMixin):
    __tablename__ = "managers"

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    phone_number = db.Column(db.String(20))
    join_date = db.Column(db.Date)
    employee_id = db.Column(db.Integer, db.ForeignKey('employees.id'), nullable=False)
    
    employees = db.relationship("Employee", back_populates="manager")
