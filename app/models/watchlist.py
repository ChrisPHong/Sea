from .db import db

watchlist_company_join = db.Table(
    "watchlist_company_join",
    db.Model.metadata,
    db.Column('watchlists', db.Integer, db.ForeignKey('watchlists.id'), primary_key=True, nullable=False),
    db.Column('companies', db.Integer, db.ForeignKey('companies.id'), primary_key=True, nullable=False)
)

class Watchlist(db.Model):
    __tablename__ = "watchlists"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(100), nullable=False, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # Many-to-One relationship with User
    users = db.relationship('User', back_populates='watchlists')

    # Many-to-Many relationship with Companies
    watch_comps = db.relationship('Company', secondary=watchlist_company_join, back_populates='comp_wl', cascade='all, delete')


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'userId': self.user_id
        }
