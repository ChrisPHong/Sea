from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name="Demo",
        last_name="User",
        email="demo@aa.io",
        password="password",
        balance=10000,
    )
    user1 = User(
        first_name="Chris",
        last_name="Hong",
        email="chrishong@aa.io",
        password="password",
        balance=10000,
    )
    user2 = User(
        first_name="Chris",
        last_name="Chueng",
        email="chrischueng@aa.io",
        password="password",
        balance=10000,
    )
    user3 = User(
        first_name="Justin",
        last_name="Yi",
        email="justinyi@aa.io",
        password="password",
        balance=10000,
    )
    user4 = User(
        first_name="Grace",
        last_name="Chi",
        email="gracechi@aa.io",
        password="password",
        balance=10000,
    )

    db.session.add(demo)
    db.session.add(user1)
    db.session.add(user2)
    db.session.add(user3)
    db.session.add(user4)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
