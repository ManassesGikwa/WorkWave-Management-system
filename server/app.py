from flask import Flask, request, jsonify
from models import db, Employee, Department, Project

app = Flask(__name__)

# Employee Management Routes

# Get all employees
@app.route('/api/employees', methods=['GET'])
def get_employees():
    employees = Employee.query.all()
    result = [{'id': emp.id, 'first_name': emp.first_name, 'last_name': emp.last_name,
               'role': emp.role, 'department': emp.department.name if emp.department else None} for emp in employees]
    return jsonify(result)

# Add a new employee
@app.route('/api/employees', methods=['POST'])
def add_employee():
    data = request.json
    if not all(key in data for key in ['first_name', 'last_name', 'role']):
        raise ValueError('Missing required fields')
    new_employee = Employee(**data)
    db.session.add(new_employee)
    db.session.commit()
    return jsonify({'message': 'Employee added successfully'}), 201

# Update an employee
@app.route('/api/employees/<int:id>', methods=['PUT'])
def update_employee(id):
    employee = Employee.query.get(id)
    if not employee:
        raise ValueError('Employee not found')
    data = request.json
    employee.update(data)
    db.session.commit()
    return jsonify({'message': 'Employee updated successfully'})

# Delete an employee
@app.route('/api/employees/<int:id>', methods=['DELETE'])
def delete_employee(id):
    employee = Employee.query.get(id)
    if not employee:
        raise ValueError('Employee not found')
    db.session.delete(employee)
    db.session.commit()
    return jsonify({'message': 'Employee deleted successfully'})


# Department Management Routes

# Get all departments
@app.route('/api/departments', methods=['GET'])
def get_departments():
    departments = Department.query.all()
    result = [{'id': dep.id, 'name': dep.name} for dep in departments]
    return jsonify(result)

# Add a new department
@app.route('/api/departments', methods=['POST'])
def add_department():
    data = request.json
    if 'name' not in data:
        raise ValueError('Missing department name')
    new_department = Department(**data)
    db.session.add(new_department)
    db.session.commit()
    return jsonify({'message': 'Department added successfully'}), 201

# Update a department
@app.route('/api/departments/<int:id>', methods=['PUT'])
def update_department(id):
    department = Department.query.get(id)
    if not department:
        raise ValueError('Department not found')
    data = request.json
    department.update(data)
    db.session.commit()
    return jsonify({'message': 'Department updated successfully'})

# Delete a department
@app.route('/api/departments/<int:id>', methods=['DELETE'])
def delete_department(id):
    department = Department.query.get(id)
    if not department:
        raise ValueError('Department not found')
    db.session.delete(department)
    db.session.commit()
    return jsonify({'message': 'Department deleted successfully'})
# Projects Management Routes

# Get all projects or add a new project
@app.route('/api/projects', methods=['GET', 'POST'])
def projects():
    if request.method == 'GET':
        # Get all projects
        projects = Project.query.all()
        result = [{'id': project.id, 'name': project.name, 'status': project.status,
                   'employee_id': project.employee_id} for project in projects]
        return jsonify(result)
    elif request.method == 'POST':
        # Add a new project
        data = request.json
        if not all(key in data for key in ['name', 'status', 'employee_id']):
            raise ValueError('Missing required fields')
        new_project = Project(**data)
        db.session.add(new_project)
        db.session.commit()
        return jsonify({'message': 'Project added successfully'}), 201

# Update or delete a project
@app.route('/api/projects/<int:id>', methods=['PUT', 'DELETE'])
def project(id):
    project = Project.query.get(id)
    if not project:
        raise ValueError('Project not found')

    if request.method == 'PUT':
        # Update a project
        data = request.json
        project.update(data)
        db.session.commit()
        return jsonify({'message': 'Project updated successfully'})
    elif request.method == 'DELETE':
        # Delete a project
        db.session.delete(project)
        db.session.commit()
        return jsonify({'message': 'Project deleted successfully'})

if __name__ == '__main__':
    app.run(port=5555, debug=True)


