from flask import Blueprint, jsonify
from api.decorators import token_required
from api import db
from api.models import Employee

employee = Blueprint('employee', __name__, url_prefix = '/api/v1')

# get all employees
@employee.route('/employees', methods = ['GET'])
@token_required
def get_employees():

    employees = Employee.query.all()
    employees_with_specific_fields = []

    for employee in employees:
        data = {}
        data['username'] = employee.username
        data['public_id'] = employee.public_id
        data['email'] = employee.email
        data['name'] = employee.name
        data['phone'] = employee.phone
        data['email_verified'] = employee.email_verified
        data['created_at'] = employee.created_at

        employees_with_specific_fields.append(data)

    return jsonify({'employees' : employees_with_specific_fields}), 200

# Get an employee by his username
@employee.route('/employee/<string:public_id>', methods = ['GET'])
@token_required
def get(public_id):
    employee = Employee.query.filter_by(public_id = public_id).first()
    
    if not employee:
        return jsonify({'message': 'This employee does not exist'})
    output = {}
    output['public_id'] = employee.public_id
    output['username'] = employee.username
    output['name'] = employee.name
    output['email'] = employee.email
    output['phone'] = employee.email
    
    return jsonify({'employee': output}), 200