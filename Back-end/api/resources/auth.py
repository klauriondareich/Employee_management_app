from flask import Blueprint

auth = Blueprint('auth', __name__)

@auth.route('/signup', methods = ['POST'])
def signup():
    return 'Yeah signup'

@auth.route('/login', methods = ['POST'])
def login():
    return 'Yeah login'

@auth.route('/logout', methods = ['POST'])
def signup():
    return 'Yeah logout'
