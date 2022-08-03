from datetime import datetime, timedelta
from app.models import db, Transaction

def seed_transactions():

    #  tech
    transaction1 = Transaction(
        price= 146.23,
        shares=1,
        type="buy",
        date=datetime.today() - timedelta(days=1),
        user_id=1,
        company_id=1,
    )
    #  tech
    transaction2 = Transaction(
        price= 282.01,
        shares=5,
        type="buy",
        date=datetime.today() - timedelta(days=2),
        user_id=1,
        company_id=2,
    )
    # tech
    transaction9 = Transaction(
        price= 100.00,
        shares=1,
        type="sell",
        date=datetime.today() - timedelta(days=2),
        user_id=1,
        company_id=2,
    )
    #  tech
    transaction3 = Transaction(
        price= 110.59,
        shares=2,
        type="buy",
        date=datetime.today() - timedelta(days=4),
        user_id=1,
        company_id=3,
    )
    #  healthcare
    transaction4 = Transaction(
        price= 157.42,
        shares=1,
        type="buy",
        date=datetime.today() - timedelta(days=5),
        user_id=1,
        company_id=8,
    )
    # healthcare
    transaction10 = Transaction(
        price= 200.89,
        shares=1,
        type="sell",
        date=datetime.today() - timedelta(days=5),
        user_id=1,
        company_id=8,
    )
    #  healthcare
    transaction5 = Transaction(
        price= 503.84,
        shares=5,
        type="buy",
        date=datetime.today() - timedelta(days=7),
        user_id=1,
        company_id=9,
    )
    #  healthcare
    transaction6 = Transaction(
        price= 52.17,
        shares=4,
        type="buy",
        date=datetime.today() - timedelta(days=13),
        user_id=1,
        company_id=18,
    )
    #  energy
    transaction7 = Transaction(
        price= 722.38,
        shares=2,
        type="buy",
        date=datetime.today() - timedelta(days=16),
        user_id=1,
        company_id=6,
    )
    #  energy
    transaction8 = Transaction(
        price= 77.65,
        shares=4,
        type="buy",
        date=datetime.today() - timedelta(days=20),
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
    db.session.add(transaction9)
    db.session.add(transaction10)
    db.session.commit()

def undo_transactions():
    db.session.execute('TRUNCATE transactions RESTART IDENTITY CASCADE;')
    db.session.commit()
