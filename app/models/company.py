from .db import db

class Company(db.Model):
    __tablename__ = "companies"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    ticker = db.Column(db.String(10), nullable=False)
    description = db.Column(db.Text, nullable=False)
    ceo = db.Column(db.String(50), nullable=False)
    employees = db.Column(db.Integer, nullable=False)
    headquarters = db.Column(db.String(100), nullable=False)
    founded = db.Column(db.Integer, nullable=False)
    base_price = db.Column(db.Integer, nullable=False)
    watchlist_id = db.Column(db.Integer, nullable=False, db.ForeignKey('watchlists.id'))

    # One-to-Many relationship with Transactions
    transactions = db.relationship('Transaction', back_populates='companies')

    # Many-to-Many relationship with Watchlists
    comp_wl = db.relationship('Watchlist', secondary=watchlists, back_populates='watch_comps', cascade='all, delete')