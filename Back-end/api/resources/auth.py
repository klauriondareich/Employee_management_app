from flask import Blueprint, request, jsonify, url_for, redirect
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

# Sign up the user
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
    
    if inputs['confirm_password'] != inputs['password']:
        return jsonify({'error': 'Your password confirmation does not match'})


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

    # Send the mail
    msg = Message('Mail confirmation', sender = conf['mail_username'], recipients = [inputs['email_address']])
    link = url_for('auth.mail_verify', token = inputs['token'], _external = True)
    msg.body = "Please, activate your account by clicking this link: {}".format(link)
    mail.send(msg)
    return jsonify({'message': 'Your account has been created successfully.', 'info': "Please, check your email to activate your account", 'status': 201}), 201

# Email activation
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
        return 'All the fields are required', 401

    user = Employee.query.filter(
        (Employee.email == authentication.username) | (Employee.username == authentication.username)).first()

    # password or email incorrect
    if not user:
        return 'Username or password incorrect.', 401

    # account not activated
    if not user.email_verified:
        return 'Your account is not activated. Check your mails', 401

    password_encoded = authentication.password.encode('utf-8')
    hashed_password  = user.password.encode('utf-8')

    # Generate the jwt token if password match
    if bcrypt.checkpw(password_encoded, hashed_password):
        token = jwt.encode({'public_id' : user.public_id, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, conf['secret_key'], algorithm="HS256")

        return jsonify({'token' : token, 'user': {'email': user.email, 'name': user.name, 'public_id': user.public_id, 'username': user.username}})
    
    return 'Could not verify', 401