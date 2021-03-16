from api import db
from datetime import datetime

class Employee(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(80), unique = True, nullable = False)
    email = db.Column(db.String(120), unique = True, nullable = False)
    password = db.Column(db.String(255), nullable = False)
    name = db.Column(db.String(120))
    phone = db.Column(db.String(25), unique = True)
    email_verified = db.Column(db.Boolean, default = False)
    token = db.Column(db.String(60))
    created_at = db.Column(db.DateTime, default = datetime.utcnow())