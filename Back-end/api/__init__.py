from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from .utils import init_app

app = init_app()
db = SQLAlchemy(app)

