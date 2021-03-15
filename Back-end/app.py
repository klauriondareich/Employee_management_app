from api import app, db
from api import models

# db.create_all()

if __name__ == '__main__':
    app.run(debug = True)