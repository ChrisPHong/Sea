from .db import db

class Watchlist(db.Model):
    __tablename__ = "watchlists"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(100), nullable=False, unique=True)
    user_id = db.Column(db.Integer, nullable=False, db.ForeignKey('users.id'))

    # Many-to-One relationship with User
    users = db.relationship('User', back_populates='watchlists')

    # Many-to-Many relationship with Companies
    watch_comps = db.relationship('Company', secondary=companies, back_populates='comp_wl', cascade='all, delete')
