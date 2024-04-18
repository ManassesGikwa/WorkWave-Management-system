# app.py
from server.models import Manager,Department,Project,Employee
import sys
sys.path.append('/home/manasses/Documents/Phase4/workwave/server')

from flask_migrate import Migrate
from flask import Flask, jsonify, request
from flask_cors import CORS
from . import db  # Import db from server package

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    migrate = Migrate(app, db)

    # Enable CORS
    CORS(app)

    @app.route('/')
    def index():
        return 'Hello, World!'
    
    # Employee Management Routes
    @app.route('/api/employees', methods=['GET'])
    def get_employees():
        employees = Employee.query.all()
        result = [{'id': emp.id, 'first_name': emp.first_name, 'last_name': emp.last_name,
                   'role': emp.role, 'department': emp.department.name if emp.department else None} for emp in employees]
        return jsonify(result)

    @app.route('/api/employees', methods=['POST'])
    def add_employee():
        data = request.json
        if not all(key in data for key in ['first_name', 'last_name', 'role']):
            raise ValueError('Missing required fields')
        new_employee = Employee(**data)
        db.session.add(new_employee)
        db.session.commit()
        return jsonify({'message': 'Employee added successfully'}), 201

    @app.route('/api/employees/<int:id>', methods=['PUT'])
    def update_employee(id):
        employee = Employee.query.get(id)
        if not employee:
            raise ValueError('Employee not found')
        data = request.json
        employee.update(data)
        db.session.commit()
        return jsonify({'message': 'Employee updated successfully'})

    @app.route('/api/employees/<int:id>', methods=['DELETE'])
    def delete_employee(id):
        employee = Employee.query.get(id)
        if not employee:
            raise ValueError('Employee not found')
        db.session.delete(employee)
        db.session.commit()
        return jsonify({'message': 'Employee deleted successfully'})

    # Department Management Routes
    @app.route('/api/departments', methods=['GET'])
    def get_departments():
        departments = Department.query.all()
        result = [{'id': dep.id, 'name': dep.name} for dep in departments]
        return jsonify(result)

    @app.route('/api/departments', methods=['POST'])
    def add_department():
        data = request.json
        if 'name' not in data:
            raise ValueError('Missing department name')
        new_department = Department(**data)
        db.session.add(new_department)
        db.session.commit()
        return jsonify({'message': 'Department added successfully'}), 201

    @app.route('/api/departments/<int:id>', methods=['PUT'])
    def update_department(id):
        department = Department.query.get(id)
        if not department:
            raise ValueError('Department not found')
        data = request.json
        department.update(data)
        db.session.commit()
        return jsonify({'message': 'Department updated successfully'})

    @app.route('/api/departments/<int:id>', methods=['DELETE'])
    def delete_department(id):
        department = Department.query.get(id)
        if not department:
            raise ValueError('Department not found')
        db.session.delete(department)
        db.session.commit()
        return jsonify({'message': 'Department deleted successfully'})

    # Projects Management Routes
    @app.route('/api/projects', methods=['GET', 'POST'])
    def projects():
        if request.method == 'GET':
            projects = Project.query.all()
            result = [{'id': project.id, 'name': project.name, 'status': project.status,
                       'employee_id': project.employee_id} for project in projects]
            return jsonify(result)
        elif request.method == 'POST':
            data = request.json
            if not all(key in data for key in ['name', 'status', 'employee_id']):
                raise ValueError('Missing required fields')
            new_project = Project(**data)
            db.session.add(new_project)
            db.session.commit()
            return jsonify({'message': 'Project added successfully'}), 201

    @app.route('/api/projects/<int:id>', methods=['PUT', 'DELETE'])
    def project(id):
        project = Project.query.get(id)
        if not project:
            raise ValueError('Project not found')

        if request.method == 'PUT':
            data = request.json
            project.update(data)
            db.session.commit()
            return jsonify({'message': 'Project updated successfully'})
        elif request.method == 'DELETE':
            db.session.delete(project)
            db.session.commit()
            return jsonify({'message': 'Project deleted successfully'})
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(port=5555, debug=True) 