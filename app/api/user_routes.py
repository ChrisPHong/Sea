from flask import Blueprint, jsonify
from flask_login import login_required, login_user
from app.models import User, db
from app.forms import LoginForm, SignUpForm

user_routes = Blueprint('users', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


# @user_routes.route('/')
# @login_required
# def users():
#     users = User.query.all()
#     return {'users': [user.to_dict() for user in users]}


# Users can get access to their portfolio and info
@user_routes.route('/<int:id>')
@login_required
def user(id):
    # user = User.query.get(id)
    user = User.query.filter(User.id == id).first()
    return user.to_dict()
