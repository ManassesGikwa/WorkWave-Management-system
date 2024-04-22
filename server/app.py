from flask import jsonify, request, make_response
from flask_cors import CORS
from . import db, create_app  # Assuming `create_app` is correctly defined in `__init__.py`
from server.models import Manager, Department, Project, Employee

app = create_app()

# Enable CORS
CORS(app)

@app.route('/')
def index():
    return 'Hello, World!'

# Employee Management Routes
@app.route('/api/employees', methods=['GET'])
def get_employees():
    employees = Employee.query.all()
    result = [emp.to_dict() for emp in employees]
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

@app.route('/api/employees/<int:id>', methods=['GET'])
def get_employee_by_id(id):
    employee = Employee.query.get(id)
    if not employee:
        raise ValueError('Employee not found')
    employee_data = employee.to_dict()
    return jsonify(employee_data), 200

# Update employee route
@app.route('/api/employees/<int:id>', methods=['PUT'])
def update_employee(id):
    employee = Employee.query.get(id)
    if not employee:
        raise ValueError('Employee not found')
    data = request.json
    for key, value in data.items():
        setattr(employee, key, value)
    db.session.commit()
    return jsonify({'message': 'Employee updated successfully'})

# Delete employee route
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
    result = [dep.to_dict() for dep in departments]
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

@app.route('/api/departments/<int:id>', methods=['GET'])
def get_department(id):
    department = Department.query.get(id)
    if not department:
        raise ValueError('Department not found')
    return jsonify(department.to_dict()), 200

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
        result = [project.to_dict() for project in projects]
        return jsonify(result)
    elif request.method == 'POST':
        data = request.json
        if not all(key in data for key in ['name', 'status', 'employee_id']):
            raise ValueError('Missing required fields')
        new_project = Project(**data)
        db.session.add(new_project)
        db.session.commit()
        return jsonify({'message': 'Project added successfully'}), 201

@app.route('/api/projects/<int:id>', methods=['GET'])
def get_project(id):
    project = Project.query.get(id)
    if not project:
        raise ValueError('Project not found')
    return jsonify(project.to_dict()), 200

@app.route('/api/projects/<int:id>', methods=['PUT'])
def update_project(id):
    project = Project.query.get(id)
    if not project:
        raise ValueError('Project not found')
    data = request.json
    project.update(data)
    db.session.commit()
    return jsonify({'message': 'Project updated successfully'})

@app.route('/api/projects/<int:id>', methods=['DELETE'])
def delete_project(id):
    project = Project.query.get(id)
    if not project:
        raise ValueError('Project not found')
    db.session.delete(project)
    db.session.commit()
    return jsonify({'message': 'Project deleted successfully'})

# Route to get employees by department
@app.route('/api/departments/<int:id>/employees', methods=['GET'])
def get_employees_by_department(id):
    employees = Employee.query.filter_by(department_id=id).all()
    if not employees:
        return make_response(jsonify({'error': 'No employees found for this department'}), 404)
    result = [emp.to_dict() for emp in employees]
    return jsonify(result), 200

# Route to get employees by project
@app.route('/api/projects/<int:id>/employees', methods=['GET'])
def get_employees_by_project(id):
    employees = Employee.query.join(Employee.employee_projects).filter_by(project_id=id).all()
    if not employees:
        return make_response(jsonify({'error': 'No employees found for this project'}), 404)
    result = [emp.to_dict() for emp in employees]
    return jsonify(result), 200

# Route to get employees by availability status
@app.route('/api/employees/availability/<status>', methods=['GET'])
def get_employees_by_availability(status):
    employees = Employee.query.filter_by(employee_availability_status=status).all()
    if not employees:
        return make_response(jsonify({'error': 'No employees found with this availability status'}), 404)
    result = [emp.to_dict() for emp in employees]
    return jsonify(result), 200

# Route to get employees by manager
@app.route('/api/managers/<int:id>/employees', methods=['GET'])
def get_employees_by_manager(id):
    employees = Employee.query.filter_by(manager_id=id).all()
    if not employees:
        return make_response(jsonify({'error': 'No employees found for this manager'}), 404)
    result = [emp.to_dict() for emp in employees]
    return jsonify(result), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)