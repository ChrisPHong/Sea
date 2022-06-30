from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user, UserMixin
from app.models import db, Transaction, User
from app.forms import TransactionForm
from datetime import date
import json

from app.models.company import Company

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
# @transaction_routes.route('/', methods=['POST'])
# def get_transactions():
#     user_id = request.json['userId']
#     print('------userID', user_id)
#     allTransactions = Transaction.query.all()
#     print('-----ALL TRANSACTIONS---', allTransactions)
#     return user_id;
    # transactions = Transaction.query.filter(Transaction.user_id == int(user_id)).all()
    # print('this is transactions in the backend', transactions)
    # return jsonify([transaction.to_dict() for transaction in transactions])

# get all transaction companies' tickers
@transaction_routes.route('/', methods=['POST'])
def get_transactions_comp_tickers(companyId):
    companies = Company.query.filter(Company.id == companyId)
    print('-----COMPANIES TRANSACTION', companies)
    return jsonify([company.to_dict() for company in companies])

# Return a list of previous transactions
@transaction_routes.route('/')
def get_all_transactions():
    allTransactions = Transaction.query.all()
    print('-----GET ALL TRANSACTIONS---', allTransactions)
    return jsonify([transaction.to_dict() for transaction in allTransactions])

# Users can buy or sell stocks
    # FORM WILL BE IN THE FRONT END COMPONENT
# Can we pass in the companyid?
@transaction_routes.route('/update', methods=['POST'])
def update_transactions():
    form = TransactionForm

    jsonData = request.get_json()
    data = jsonData['data']

    if form.validate_on_submit():
        transaction = Transaction(
            price=form.data['price'],
            shares=form.data['shares'],
            type=form.data['type'],
            date=date.today(),
            user_id=request.json['userId'],
            company_id=request.json['companyId']
        )

    # transaction_data = {
    #     'price':data['price'],
    #     'shares':data['shares'],
    #     'type':data['type'],
    #     'date':date.today(),
    #     'userId':current_user.get_id(),
    #     'companyId':data['companyId']
    # }

    # user = User.query.filter(User.id == data['user_id']).one()
    # user.balance = data['balance']
        db.session.add(transaction)
        # db.session.add(user)
        db.sesssion.commit()

        return transaction.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
