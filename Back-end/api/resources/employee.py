from flask import Blueprint

employee = Blueprint('employee', __name__)

@employee.route('/employees', methods = ['GET'])
def get_employees():
    return 'all the employees'

@employee.route('/employee/<int:id>', ['GET'])
def get_employee(id):
    return 'one employee'

@employee.route('/update/employee/<int:id>', ['PUT'])
def get_employee(id):
    return 'one employee'
