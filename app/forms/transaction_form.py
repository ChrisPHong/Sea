from flask_wtf import FlaskForm
from wtforms import StringField, DateField, FloatField, IntegerField
from wtforms.validators import DataRequired, ValidationError
# from app.models import Transaction
# from flask_login import current_user

class TransactionForm(FlaskForm):
    price = FloatField('price', validators=[DataRequired()])
    shares = FloatField('shares')
    type = StringField('type', validators=[DataRequired()])
    user_id = IntegerField('user_id', validators=[DataRequired()])
    company_id = IntegerField('company_id', validators=[DataRequired()])
