from flask import Flask

from .resources.auth import auth
from .resources.employee import employee

import yaml
import pymysql

pymysql.install_as_MySQLdb()

def parse_yaml_data():
    config_file = open('api/config.yaml')
    return yaml.load(config_file, Loader = yaml.FullLoader)

conf = parse_yaml_data()

def set_db_config(app):
    connection = '{0}://{1}:{2}@{3}:{4}/{5}'.format(
        conf['db_connector'], conf['db_user'],
        conf['db_password'], conf['db_host'],
        conf['db_port'], conf['db_name']
    )
    app.config['SQLALCHEMY_DATABASE_URI'] = connection

def init_app():
    app = Flask(__name__)
    set_db_config(app)
    app.config['SECRET_KEY'] = conf['secret_key']
    return app

def load_routes(app):
    app.register_blueprint(auth)
    app.register_blueprint(employee)