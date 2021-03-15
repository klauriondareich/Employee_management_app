from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from .utils import init_app, load_routes

app = init_app()
db = SQLAlchemy(app)
load_routes(app)

