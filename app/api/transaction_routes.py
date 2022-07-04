from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user, UserMixin
from app.models import db, Transaction, User
from app.forms import TransactionForm
from app.forms import UserBalanceForm
from datetime import datetime, timedelta
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
    # print('-----COMPANIES TRANSACTION', companies)
    return jsonify([company.to_dict() for company in companies])

# Return a list of previous transactions
@transaction_routes.route('/')
def get_all_transactions():
    allTransactions = Transaction.query.all()
    # print('-----GET ALL TRANSACTIONS---', allTransactions)
    return jsonify([transaction.to_dict() for transaction in allTransactions])

# Users can buy or sell stocks
    # FORM WILL BE IN THE FRONT END COMPONENT
# Can we pass in the companyid?
@transaction_routes.route('/update', methods=['POST'])
@login_required
def update_transactions():
    form = TransactionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    todays_date = datetime.today()

    if form.validate_on_submit():
        transaction = Transaction(
            price=form.data['price'],
            shares=form.data['shares'],
            type=form.data['type'],
            date=todays_date.strftime('%Y-%m-%d'),
            user_id=form.data['user_id'],
            company_id=form.data['company_id']
        )
        user = User.query.filter(User.id == form.data['user_id']).first()
        user.balance = request.json['balance']

        db.session.add(transaction)
        db.session.commit()
        return {'transaction': transaction.to_dict(), 'balance': user.balance}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 402


@transaction_routes.route('/add', methods=['PATCH'])
@login_required
def add_money_current_balance():
    form = UserBalanceForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        # We find the user and we add the buying power to the balance
        user = User.query.get(request.json['userId'])
        user.balance += int(request.json['balance'])


        db.session.commit()
        return jsonify({'balance': user.balance, 'user': user.to_dict(), 'id':user.id})
    return {'errors': validation_errors_to_error_messages(form.errors)}, 402
