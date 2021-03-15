from flask import Flask
from .extensions import db, set_db_config, conf

def create_app():
    app = Flask(__name__)
    set_db_config(app)
    app.config['SECRET_KEY'] = conf['secret_key']
    db.init_app(app)
    return app
