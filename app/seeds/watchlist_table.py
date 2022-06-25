from app.models import db, Watchlist, Company

def seed_watchlist_table():
    # demo user watchlists
    # tech
    watchlist_1 = Watchlist.query.filter(Watchlist.id == 1)
    company_1 = Company.query.get(1)
    company_2 = Company.query.get(2)
    company_3 = Company.query.get(3)
    company_4 = Company.query.get(4)
    watchlist_1.company.append(company_1)
    watchlist_1.company.append(company_2)
    watchlist_1.company.append(company_3)
    watchlist_1.company.append(company_4)

    # healthcare
    watchlist_2 = Watchlist.query.filter(Watchlist.id == 2)
    company_8 = Company.query.get(8)
    company_9 = Company.query.get(9)
    company_18 = Company.query.get(18)
    company_21 = Company.query.get(21)
    watchlist_2.company.append(company_8)
    watchlist_2.company.append(company_9)
    watchlist_2.company.append(company_18)
    watchlist_2.company.append(company_21)

    # energy
    watchlist_3 = Watchlist.query.filter(Watchlist.id == 3)
    company_6 = Company.query.get(6)
    company_11 = Company.query.get(11)
    company_16 = Company.query.get(16)
    watchlist_3.company.append(company_6)
    watchlist_3.company.append(company_11)
    watchlist_3.company.append(company_16)


    db.session.add(watchlist_1)
    db.session.add(watchlist_2)
    db.session.add(watchlist_3)
    db.session.commit()

def undo_watchlist_table():
    db.session.execute('TRUNCATE watchlist_company_join RESTART IDENTITY CASCADE')
    db.session.commit()
