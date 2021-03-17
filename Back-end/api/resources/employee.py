from flask import Blueprint, jsonify
from api import db
from api.models import Employee

employee = Blueprint('employee', __name__, url_prefix = '/api/v1')

# get all the employees
@employee.route('/employees', methods = ['GET'])
def get_employees():

    employees = Employee.query.all()
    employees_with_specific_fields = []

    for employee in employees:
        data = {}
        data['username'] = employee.username
        data['email'] = employee.email
        data['name'] = employee.name
        data['phone'] = employee.phone
        data['email_verified'] = employee.email_verified
        data['created_at'] = employee.created_at

        employees_with_specific_fields.append(data)

    return jsonify({'employees' : employees_with_specific_fields}), 200

# Get an employee by his username
@employee.route('/employee/<string:username>', methods = ['GET'])
def get(username):
    employee = Employee.query.filter_by(username = username).first()
    
    if not employee:
        return jsonify({'message': 'This employee does not exist'})
    output = {}
    output['id'] = employee.id
    output['username'] = employee.username
    output['name'] = employee.name
    output['email'] = employee.email
    output['phone'] = employee.email
    
    return jsonify({'employee': output}), 200

# Update an employee
@employee.route('/employee/update/<int:id>', methods = ['PUT'])
def update(id):
    return 'update one employee'
