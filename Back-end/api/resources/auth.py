from flask import Blueprint, request, jsonify

auth = Blueprint('auth', __name__, url_prefix = '/api/v1')

@auth.route('/signup', methods = ['POST'])
def signup():
    # 1- Récuperer les données du formulaire
    # 2 - Valider les données du formulaire
    # 3 - Générer le token
    # 4 - Enregistrer l'utilisateur dans la base de données
    # 5 - Envoyer le mail
    return 'Yeah signup'

@auth.route('/login', methods = ['POST'])
def login():
    return 'Yeah login'

@auth.route('/logout', methods = ['POST'])
def logout():
    return 'Yeah logout'
