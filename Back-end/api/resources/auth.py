from flask import Blueprint, request, jsonify, url_for, redirect, make_response
from api.utils import serialise_token, password_crypt, conf
from api.decorators import token_required
from api.models import Employee
from flask_mail import Message
from api import db, mail
import datetime
import bcrypt
import uuid
import jwt


auth = Blueprint('auth', __name__, url_prefix = '/api/v1')

@auth.route('/signup', methods = ['POST'])
def signup():

    inputs = request.get_json()

    if not inputs['email_address'] or not inputs['username'] or not inputs['password']:
        return jsonify({'error': 'You have to fill the required fields'}), 401

    employee = Employee.query.filter(
        (Employee.email == inputs['email_address'] )| 
        (Employee.username == inputs['username']) | 
        (Employee.phone == inputs['phone_number'])).first()

    if employee:
        return jsonify({'error': 'email, username or phone number is already used'})

    inputs['token'] = serialise_token(inputs['email_address'])[:60]
    inputs['password'] = password_crypt(inputs['password'])
    inputs['uuid'] = uuid.uuid4()
    new_employee = Employee(
        username = inputs['username'],
        email = inputs['email_address'],
        password = inputs['password'],
        name = inputs['name'],
        phone = inputs['phone_number'],
        token = inputs['token'],
        public_id = inputs['uuid']
    )
    db.session.add(new_employee)
    db.session.commit()

    # 5 - Envoyer le mail
    msg = Message('Mail confirmation', sender = conf['mail_username'], recipients = [inputs['email_address']])
    link = url_for('auth.mail_verify', token = inputs['token'], _external = True)
    msg.body = "Veuillez activer votre compte, lien : {}".format(link)
    mail.send(msg)
    return jsonify({'message': 'Employee created successfully'}), 201

@auth.route('/email-verification/<string:token>', methods = ['GET'])
def mail_verify(token):
    user = Employee.query.filter_by( token = token).first()
    if user.email:
        user.token = None
        user.email_verified = True
        db.session.commit()
        return "Your account has been activated"
    return "Token expired"

# Log in the user
@auth.route('/login', methods = ['POST'])
def login():

    authentication = request.authorization

    if not authentication or not authentication.username or not authentication.password:
        return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})

    user = Employee.query.filter_by(email = authentication.username).first()

    if not user:
        return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})

    password_encoded = authentication.password.encode('utf-8')
    hashed_password  = user.password.encode('utf-8')
    
    if bcrypt.checkpw(password_encoded, hashed_password):
        token = jwt.encode({'id' : user.id, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, conf['secret_key'], algorithm="HS256")

        return jsonify({'token' : token})

    return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})

@auth.route('/logout', methods = ['GET'])
# Log out the user
def logout():
    request.headers['x-access-token']
    return jsonify({token: request.headers['x-access-token']})
