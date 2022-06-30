from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField, FloatField
from wtforms.validators import DataRequired, ValidationError
from app.models import Transaction
from flask_login import current_user

class TransactionForm(FlaskForm):
    price = FloatField('price', validators=[DataRequired()])
    shares = StringField('shares', validators=[DataRequired()])
    type = StringField('type', validators=[DataRequired()])
    date = DateField('date', validators=[DataRequired()])
