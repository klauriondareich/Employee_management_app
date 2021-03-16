from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail
from .utils import init_app

app = init_app()

# initialise database
db = SQLAlchemy(app)

# Initialise mail
mail = Mail(app)

# resources
from .resources.auth import auth
from .resources.employee import employee
# Load routes
app.register_blueprint(auth)
app.register_blueprint(employee)

