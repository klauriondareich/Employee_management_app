from api.models import Employee

class EmployeeService():

    def get_by_public_id(public_id: str):
        return Employee.query.filter_by(public_id = public_id).first()

    def get_public_info(public_id):
        
        return 