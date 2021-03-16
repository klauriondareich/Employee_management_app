from flask import Blueprint

employee = Blueprint('employee', __name__, url_prefix = '/api/v1')

@employee.route('/employees', methods = ['GET'])
def get_employees():
    return {'name': "mebale", 'age': 29, 'admin': False}

@employee.route('/employee/<int:id>', methods = ['GET'])
def get(id):
    return 'one employee'

@employee.route('/employee/update/<int:id>', methods = ['PUT'])
def update(id):
    return 'update one employee'
