from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user, UserMixin
from app.models import db, Transaction
# from app.forms import TransactionForm
from datetime import date

transaction_routes = Blueprint('transactions', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# Return a list of previous transactions
@transaction_routes.route('/', methods=['POST'])
def get_transactions():
    user_id = request.json['userId']
    transactions = Transaction.query.filter(Transaction.user_id == int(user_id)).all()
    return jsonify([transaction.to_dict() for transaction in transactions])

# Users can buy or sell stocks

# Can we pass in the companyid?
# @transaction_routes.route('/update', methods=['POST'])
# def update_transactions():
#     # form = TransactionForm
#     if form.validate_on_submit():
#         new_transaction = Transaction(
#             price=form.data['price'],
#             shares=form.data['shares'],
#             type=form.data['type'],
#             date=date.today(),
#             userId=current_user.get_id(),
#             companyId=form.data['companyId']
#         )
#         db.session.add(new_transaction)
#         db.sesssion.commit()
#         return new_transaction.to_dict()
#     return {'errors': validation_errors_to_error_messages(form.errors)}, 401
