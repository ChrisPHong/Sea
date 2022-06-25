from app.models import db, Watchlist

def seed_watchlists():
    watchlist1 = Watchlist(
        name="Tech",
        user_id=1
    )
    watchlist2 = Watchlist(
        name="Healthcare",
        user_id=1
    )
    watchlist3 = Watchlist(
        name="Energy",
        user_id=1
    )

    db.session.add(watchlist1)
    db.session.add(watchlist2)
    db.session.add(watchlist3)

    db.session.commit()


def undo_watchlists():
    db.session.execute('TRUNCATE watchlists RESTART IDENTITY CASCADE')
    db.session.commit()
