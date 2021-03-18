# EMPLOYEE MANAGEMENT SYSTEM

# Functionnalities
1. List all employees
2. Display one employee
4. Sign up an employee
5. Login an employee

## Installation of the application
1. Create a virtual environnement 
```bat 
python -m venv venv 
venv/Scripts/activate
```
2. Install all the dependencies by typing in the console: ```bat python install -r requirements.txt```
3. Rename config.example.yaml to config.yaml
4. configure the config.yaml
5. By using python command line enter: 
```python 
from app import db
db.create_all()
```
```python 
db.create_all()
```
5. Execute the application

```bat
flask run
```

Documentation link https://documenter.getpostman.com/view/9654230/Tz5tYbCk