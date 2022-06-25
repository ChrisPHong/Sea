from datetime import datetime, timedelta
from app.models import db, Transaction

def seed_transactions():
    #  tech
    transaction1 = Transaction(
        shares=1,
        type="buy",
        date=datetime.today() - timedelta(days=1),
        user_id=1,
        company_id=1,
    )
    #  tech
    transaction2 = Transaction(
        shares=1,
        type="sell",
        date=datetime.today() - timedelta(days=2),
        user_id=1,
        company_id=2,
    )
    #  tech
    transaction3 = Transaction(
        shares=2,
        type="buy",
        date=datetime.today() - timedelta(days=4),
        user_id=1,
        company_id=3,
    )
    #  healthcare
    transaction4 = Transaction(
        shares=1,
        type="sell",
        date=datetime.today() - timedelta(days=5),
        user_id=1,
        company_id=8,
    )
    #  healthcare
    transaction5 = Transaction(
        shares=5,
        type="buy",
        date=datetime.today() - timedelta(days=7),
        user_id=1,
        company_id=9,
    )
    #  healthcare
    transaction6 = Transaction(
        shares=4,
        type="buy",
        date=datetime.today() - timedelta(days=13),
        user_id=1,
        company_id=18,
    )
    #  energy
    transaction7 = Transaction(
        shares=2,
        type="buy",
        date=datetime.today() - timedelta(days=16),
        user_id=1,
        company_id=6,
    )
    #  energy
    transaction8 = Transaction(
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
    db.session.commit()

def undo_transactions():
    db.session.execute('TRUNCATE transactions RESTART IDENTITY CASCADE;')
    db.session.commit()
