from flask import Blueprint, request, jsonify, url_for, redirect
from api.utils import serialise_token, password_crypt, conf
from api.models import Employee
from api import db, mail
from flask_mail import Message


auth = Blueprint('auth', __name__, url_prefix = '/api/v1')

@auth.route('/signup', methods = ['POST'])
def signup():
    inputs = request.get_json()
    # 2 - Valider les données du formulaire

    inputs['token'] = serialise_token(inputs['email_address'])[:60]
    inputs['password'] = password_crypt(inputs['password'])
    new_employee = Employee(
        username = inputs['username'],
        email = inputs['email_address'],
        password = inputs['password'],
        name = inputs['name'],
        phone = inputs['phone_number'],
        token = inputs['token']
    )
    db.session.add(new_employee)
    db.session.commit()

    # 5 - Envoyer le mail
    msg = Message('Mail confirmation', sender = conf['mail_username'], recipients = [inputs['email_address']])
    link = url_for('auth.mail_verify', token = inputs['token'], _external = True)
    msg.body = "Veuillez activer votre compte, lien : {}".format(link)
    mail.send(msg)
    return 'Employee created successfully', 201

@auth.route('/email-verification/<string:token>', methods = ['GET'])
def mail_verify(token):
    user = Employee.query.filter_by( token = token).first()
    if user.email:
        user.token = None
        user.email_verified = True
        db.session.commit()
        return "Votre compte a bien été validé"

    return "Token expired"

@auth.route('/login', methods = ['POST'])
def login():
    return 'Yeah login'

@auth.route('/logout', methods = ['POST'])
def logout():
    return 'Yeah logout'
