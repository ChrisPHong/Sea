from app.models import db, Watchlist, Company

def seed_watchlists():

    companies = Company.query.all()
    tech_companies = [company for company in companies if company.id in [1,2,3]]
    health_companies = [company for company in companies if company.id in [8,9,18]]
    energy_companies = [company for company in companies if company.id in [6,11,16]]

    watchlist1 = Watchlist(
        name="Tech",
        user_id=1,
        watch_comps = tech_companies
    )
    watchlist2 = Watchlist(
        name="Healthcare",
        user_id=1,
        watch_comps = health_companies
    )
    watchlist3 = Watchlist(
        name="Energy",
        user_id=1,
        watch_comps = energy_companies
    )

    db.session.add(watchlist1)
    db.session.add(watchlist2)
    db.session.add(watchlist3)

    db.session.commit()


def undo_watchlists():
    db.session.execute('TRUNCATE watchlists RESTART IDENTITY CASCADE')
    db.session.commit()
