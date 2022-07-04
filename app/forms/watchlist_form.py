from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Watchlist
from flask_login import current_user

# name must be unique
def watchlist_validator(form, field):
    name = field.data
    user_id = current_user.get_id()
    watchlists = Watchlist.query.filter(Watchlist.user_id == user_id).all()

    for watchlist in watchlists:
        if watchlist.name == name:
            raise ValidationError(f"The watchlist '{name}' already exists.")

class WatchlistForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), watchlist_validator])
