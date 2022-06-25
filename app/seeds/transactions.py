from psycopg2 import Date
from app.models import db, Transaction

def seed_transactions():
    #  tech
    transaction1 = Transaction(
        shares=100,
        type="buy",
        date=Date,
        user_id=1,
        company_id=1,
    )
    #  tech
    transaction2 = Transaction(
        shares=150,
        type="sell",
        date=Date,
        user_id=1,
        company_id=2,
    )
    #  tech
    transaction3 = Transaction(
        shares=80,
        type="buy",
        date=Date,
        user_id=1,
        company_id=3,
    )
    #  healthcare
    transaction4 = Transaction(
        shares=40,
        type="sell",
        date=Date,
        user_id=1,
        company_id=8,
    )
    #  healthcare
    transaction5 = Transaction(
        shares=30,
        type="buy",
        date=Date,
        user_id=1,
        company_id=9,
    )
    #  healthcare
    transaction6 = Transaction(
        shares=60,
        type="buy",
        date=Date,
        user_id=1,
        company_id=18,
    )
    #  energy
    transaction7 = Transaction(
        shares=10,
        type="buy",
        date=Date,
        user_id=1,
        company_id=6,
    )
    #  energy
    transaction8 = Transaction(
        shares=50,
        type="buy",
        date=Date,
        user_id=1,
        company_id=11,
    )


    db.session.add(transaction1)
    db.session.add(transaction2)
    db.session.add(transaction3)
    db.session.add(transaction4)
    db.session.add(transaction5)
    db.session.add(transaction6)
    db.session.add(transaction7)
    db.session.add(transaction8)
    db.session.commit()

def undo_transactions():
    db.session.execute('TRUNCATE transactions RESTART IDENTITY CASCADE;')
    db.session.commit()
