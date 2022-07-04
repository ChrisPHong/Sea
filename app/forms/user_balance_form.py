from flask_wtf import FlaskForm
from wtforms import  IntegerField
from wtforms.validators import DataRequired


class UserBalanceForm(FlaskForm):
    balance = IntegerField('balance', validators=[DataRequired()])
