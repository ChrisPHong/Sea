from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.forms import WatchlistForm
from app.models import Watchlist, db

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
# @watchlist_routes.route('/<int:id>', methods=['PUT'])
# def put_watchlists(id):
#     form = WatchlistForm()
#     # form = UpdateWatchListForm() # Do we need UpdateWatchListForm?
#     watchlist = Watchlist.query.filter(Watchlist.id == id).first()

#     if form.validate_on_submit():
#         watchlist.name = form.data['name']
#         db.session.add(watchlist)
#         db.session.commit()
#         return watchlist.to_dict()
#     return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# Users can delete their watchlist
@watchlist_routes.route('/<int:id>', methods=['DELETE'])
def delete_watchlists(id):
    watchlist = Watchlist.query.filter(Watchlist.id == id).first()
    db.session.delete(watchlist)
    db.session.commit()
    # Are we returning the the updated list after a list has been deleted?
    return watchlist.to_dict()
