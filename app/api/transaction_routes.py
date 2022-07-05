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

@transaction_routes.route('/<int:userId>/bought_transactions')
def get_bought_transactions(userId):
    bought_transactions = Transaction.query.filter(Transaction.type == 'buy', Transaction.user_id == int(userId)).all()
    return jsonify([transaction.to_dict() for transaction in bought_transactions])

# Users can buy or sell stocks
    # FORM WILL BE IN THE FRONT END COMPONENT

# WE HIT THIS ROUTE IF COMPANY IS NOT IN TRANSACTION DATABASE
@transaction_routes.route('/post', methods=['POST'])
@login_required
def add_new_transaction():
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
        new_transaction_dict = transaction.to_dict()
        new_transaction_dict['balance'] = user.balance
        return new_transaction_dict
    return {'errors': validation_errors_to_error_messages(form.errors)}, 402

@transaction_routes.route('/<int:company_id>/update', methods=['PATCH'])
@login_required
def update_transactions(company_id):
    form = TransactionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    user_id = request.json['user_id']
    todays_date = datetime.today()

    # Get a specific transaction under specific user
    transaction = Transaction.query.filter(Transaction.company_id == company_id, Transaction.user_id == int(user_id), Transaction.type == 'buy').first()


    if form.validate_on_submit():

        price=form.data['price'],
        shares=form.data['shares'],
        type=form.data['type']
        # shares is a tuple in the database, so have to key into the first index
        transaction.shares += shares[0]
        total_amount = price * int(shares[0])

        transaction.price = transaction.price + total_amount[0]
        final_price = transaction.price / transaction.shares
        transaction.price = final_price

        user = User.query.filter(User.id == int(user_id)).first()
        user.balance = request.json['balance']

        db.session.commit()
        new_transaction_dict = transaction.to_dict()
        new_transaction_dict['balance'] = user.balance
        return new_transaction_dict
    return {'errors': validation_errors_to_error_messages(form.errors)}, 402


@transaction_routes.route('/<int:company_id>/sell', methods=['PATCH'])
@login_required
def sell_transaction(company_id):
    form = TransactionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    user_id = request.json['user_id']
    todays_date = datetime.today()

    # Get a specific transaction under specific user
    transaction = Transaction.query.filter(Transaction.company_id == company_id, Transaction.user_id == int(user_id), Transaction.type == 'buy').first()


    if form.validate_on_submit():

        price=form.data['price'],
        shares=form.data['shares'],
        type=form.data['type']
        balance=request.json['balance']

        asset_balance = price[0] * transaction.shares
        print('---------------------- THIS IS HOW MUCH VALUE WE HAVE RIGHT NOW ----------------------', asset_balance)
        # shares is a tuple in the database, so have to key into the first index
        transaction.shares -= shares[0]

        if transaction.shares <= 0:
            transaction.type == 'sell'

        # selling amount: The market price * the shares the user selected # 220
        transaction_amount = price[0] * int(shares[0])
        print('---------------------- THIS IS WHAT WE SOLD THE SHARES FOR ----------------------', transaction_amount)
        print('---------------------- NEW BALANCE BUT NIKE ----------------------', price)
        # Asset balance = number of shares owned * market price

        # Set transaction price by taking the difference of the asset balance and transaction amount
        transaction.price = (asset_balance - transaction_amount) / 4
        print('---------------------- THIS IS WHAT WE HAVE AFTER SELLING ----------------------', transaction.price)

        user = User.query.filter(User.id == int(user_id)).first()
        user.balance += transaction_amount

        db.session.commit()
        return transaction.to_dict()
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
