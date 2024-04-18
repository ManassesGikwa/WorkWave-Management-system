#models 
# Remote library imports
from sqlalchemy import MetaData
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from . import db
from werkzeug.security import generate_password_hash, check_password_hash  # Import password hashing functions


# Define metadata
metadata = MetaData(
    naming_convention={
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    }
)
    
# EmployeeProject association object
class EmployeeProject(db.Model, SerializerMixin):
    __tablename__ = 'employee_project'  
    
    # Specify extend_existing=True
    __table_args__ = {'extend_existing': True}
    
    # Foreign keys
    employee_id = db.Column(db.Integer, db.ForeignKey('employees.id', ondelete='CASCADE'), primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id', ondelete='CASCADE'), primary_key=True)
    department_id = db.Column(db.Integer, db.ForeignKey('departments.id', ondelete='CASCADE'))
   
    # Additional columns
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=True)
    
    # Relationships
    employee = db.relationship("Employee", back_populates="employee_projects")
    project = db.relationship("Project", back_populates="project_employees")


manager_employees_association = db.Table(
    'manager_employees',
    db.Column('manager_id', db.Integer, db.ForeignKey('managers.id', ondelete='CASCADE')),
    db.Column('employee_id', db.Integer, db.ForeignKey('employees.id', ondelete='CASCADE'))
)

class Employee(db.Model, SerializerMixin):
    __tablename__ = "employees"
    
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
    salary = db.Column(db.Float)
    password_hash = db.Column(db.String(128), nullable=False)  # Store hashed password
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'phone_number': self.phone_number,
            'email': self.email,
            'city': self.city,
            'DOB': self.DOB,
            'employee_availability_status': self.employee_availability_status,
            'role': self.role,
            'join_date': self.join_date,
            'department_id': self.department_id,
            'salary': self.salary
        }
        
    department_id = db.Column(db.Integer, db.ForeignKey('departments.id', ondelete='CASCADE'))

    # Relationships
    department = db.relationship("Department", back_populates="employees")
    managers = db.relationship("Manager", secondary=manager_employees_association, back_populates="employees", single_parent=True)
    employee_projects = db.relationship("EmployeeProject", back_populates="employee")
    projects = association_proxy('employee_projects', 'project')
    
    _serialize_ = ['id', 'first_name', 'last_name', 'email', 'city', 'DOB', 'employee_availability_status', 'role', 'join_date', 'department_id', 'salary']


# Department model
class Department(db.Model, SerializerMixin):
    __tablename__ = "departments"
    
    # Specify extend_existing=True
    __table_args__ = {'extend_existing': True}
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    create_date = db.Column(db.Date, nullable=False)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'create_date': self.create_date
        }
        
    employee_projects = db.relationship("EmployeeProject", cascade="all, delete-orphan", backref="department")
    
    employees = db.relationship("Employee", back_populates="department", lazy='dynamic', cascade="all, delete-orphan")
    managers = db.relationship("Manager", back_populates="department")
    
    _serialize_ = ['id', 'name', 'create_date']


# Project model
class Project(db.Model, SerializerMixin):
    __tablename__ = "projects"
    
    # Specify extend_existing=True
    __table_args__ = {'extend_existing': True}
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(20), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'status': self.status
        }
    project_employees = db.relationship("EmployeeProject", back_populates="project", cascade="all, delete-orphan")
    employees = association_proxy('project_employees', 'employee')
    
    _serialize_ = ['id', 'name', 'status']

    
class Manager(db.Model, SerializerMixin):
    __tablename__ = "managers"

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    phone_number = db.Column(db.String(20))
    join_date = db.Column(db.Date)
    department_id = db.Column(db.Integer, db.ForeignKey('departments.id', ondelete='CASCADE'))
    salary = db.Column(db.Float)
    
    # Relationships
    department = db.relationship("Department", back_populates="managers")
    employees = db.relationship("Employee", secondary=manager_employees_association, back_populates="managers")

    _serialize_ = ['id', 'first_name', 'last_name', 'email', 'salary', 'join_date', 'department_id']

