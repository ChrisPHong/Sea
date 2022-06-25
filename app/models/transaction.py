from .db import db

class Transaction(db.Model):
    __tablename__ = "transactions"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    price = db.Column(db.Float) # Price of ONE share
    shares = db.Column(db.Float, nullable=False)
    type = db.Column(db.String(10), nullable=False) # Buy or sell
    date = db.Column(db.Date, nullable=False)
    user_id = db.Column(db.Integer, nullable=False, db.ForeignKey('users.id'))
    company_id = db.Column(db.Integer, nullable=False, db.ForeignKey('companies.id'))

    # Many-to-One relationship with Users
    users = db.relationship('User', back_populates='transactions')

    # Many-to-One relationship with Companies
    companies = db.relationship('Company', back_populates='transactions')


    def to_dict(self):
    return {
        'id': self.id,
        'price': self.price,
        'shares': self.shares,
        'type': self.type,
        'date': self.date,
        'userId': self.user_id,
        'companyId': self.company_id
    }
