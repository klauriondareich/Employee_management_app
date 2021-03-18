from flask import request, jsonify
from .utils import conf
from .models import Employee
import jwt
from functools import wraps

# check if the user is connected
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']

        if not token:
            return jsonify({'message' : 'Token is missing!'}), 401
        try:
            data = jwt.decode(token, conf['secret_key'], algorithms="HS256")
            current_user = Employee.query.filter_by(id = data['id']).first()
        except jwt.ExpiredSignatureError:
            return jsonify({'message' : "Token expired !"}), 401
        
        if not current_user:
            return jsonify({'message' : "Token is invalid !"}), 401

        return f(*args, **kwargs)

    return decorated