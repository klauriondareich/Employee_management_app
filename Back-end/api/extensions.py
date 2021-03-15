from flask_sqlalchemy import SQLAlchemy
import pymysql
import yaml

pymysql.install_as_MySQLdb()

db = SQLAlchemy()

config_file = open('api/config.yaml')
conf = yaml.load(config_file, Loader = yaml.FullLoader)

# functions
def set_db_config(app):

    connection = '{0}://{1}:{2}@{3}:{4}/{5}'.format(
        conf['db_connector'], conf['db_user'],
        conf['db_password'], conf['db_host'],
        conf['db_port'], conf['db_name']
    )
    app.config['SQLALCHEMY_DATABASE_URI'] = connection