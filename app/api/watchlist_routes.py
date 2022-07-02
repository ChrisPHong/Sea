from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.forms import WatchlistForm
from app.models import Watchlist, db, Company
import json

watchlist_routes = Blueprint('watchlists', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# Users can get all their watchlists
@watchlist_routes.route('/')
@login_required
def get__all_watchlists():
    watchlists = Watchlist.query.filter(Watchlist.user_id == current_user.get_id()).all()
    # print('<<<<<<<<<< watchlists >>>>>>>>>', [watchlist.to_dict() for watchlist in watchlists])
    return jsonify([watchlist.to_dict() for watchlist in watchlists])


# Users can create a new watchlist
@watchlist_routes.route('/', methods=['POST'])
# @login_required
def post_watchlists():
    form = WatchlistForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_watchlist = Watchlist(
            name=form.data['name'],
            user_id = request.json['userId']

        )
        db.session.add(new_watchlist)
        db.session.commit()
        return new_watchlist.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# Users can update their watchlist
@watchlist_routes.route('/<int:id>', methods=['PATCH'])
def patch_watchlists(id):

    form = WatchlistForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    watchlist = Watchlist.query.filter(Watchlist.id == id).first()

    print(watchlist, "INSIDE THE EDIT ROUTE AND THIS IS THE WATCHLIST")

    if form.validate_on_submit():
        watchlist.name = form.data['name']
        db.session.add(watchlist)
        db.session.commit()
        return watchlist.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}

# Users can delete their watchlist
@watchlist_routes.route('/<int:id>', methods=['DELETE'])
def delete_watchlists(id):
    watchlist = Watchlist.query.filter(Watchlist.id == id).first()
    db.session.delete(watchlist)
    db.session.commit()

    return watchlist.to_dict()

@watchlist_routes.route('/<int:id>/add', methods=['POST'])
@login_required
def post_company_watchlists(id):

    ticker = request.json['ticker']

    watchlist = Watchlist.query.filter(Watchlist.id == id).first()
    stock = Company.query.filter(Company.ticker == ticker.upper()).first()

    watchlist.watch_comps.append(stock)

    db.session.commit()
    return "Added company to watchlist"

@watchlist_routes.route('/<int:id>/delete', methods=['PATCH'])
@login_required
def delete_company_watchlists(id):

    ticker = request.json['ticker']
    # Selecting the specific watchlist and specific stock
    watchlist = Watchlist.query.filter(Watchlist.id == id).first()
    stock = Company.query.filter(Company.ticker == ticker.upper()).first()

# I think you can find the company and then find the index of the company and then remove it from the list

    # Finding that specific company within the watch_comps and then removing it from the list
    # joint_table = watchlist.watch_comps
    print('<<<<<<<<<<<< BEFORE DELETE >>>>>>>>>>>>>')
    the_list = [company for company in watchlist.watch_comps if company.id == stock.id]
    print('<<<<<<<<<<<< THE LIST >>>>>>>>>>>>>> ', the_list[0])
    # found_company = [company.to_dict() for company in joint_table if company.id == stock.id]
    # print(found_company)
    # index = joint_table.index(found_company)
    # print('<<<<<<<<<<<< output for joint_table>>>>>>>>>>>>>', [company for company in joint_table if company.id == stock.id])
    # print('<<<<<<<<<<<< index >>>>>>>>>>>>>', index)

    watchlist.watch_comps.remove(([company for company in watchlist.watch_comps if company.id == stock.id][0]))

    print('<<<<<<<<<<<< AFTER DELETE >>>>>>>>>>>>>', watchlist.watch_comps)

    db.session.commit()
    watchlists = Watchlist.query.filter(Watchlist.user_id == current_user.get_id()).all()
    return jsonify([watchlist.to_dict() for watchlist in watchlists])
