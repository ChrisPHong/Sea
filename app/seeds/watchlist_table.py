from app.models import db, Watchlist, Company
from app.models.watchlist import watchlist_company_join

def seed_watchlist_table():
    pass
    # demo user watchlists
    # tech
    # watchlist_1 = Watchlist.query.filter(Watchlist.id == 1 and Watchlist.user_id == 1)
    # watchlist_1 = Watchlist.query.join(Company.ticker).filter(Watchlist.user_id == 1).first()

    # demo_watchlist_1 = watchlist_company_join(
    #     watchlists=1,
    #     companies=1
    # )

    # company_1 = Company.query.get(1)
    # print(company_1)
    # company_2 = Company.query.get(2)
    # company_3 = Company.query.get(3)
    # company_4 = Company.query.get(4)
    # watchlist_1.companies.append(company_1)
    # watchlist_1.append(company_2)
    # watchlist_1.append(company_3)
    # watchlist_1.append(company_4)

    # healthcare
    # watchlist_2 = Watchlist.query.filter(Watchlist.user_id == 2)
    # watchlist_list2 = list(watchlist_2)
    # company_8 = Company.query.get(8)
    # company_9 = Company.query.get(9)
    # company_18 = Company.query.get(18)
    # company_21 = Company.query.get(21)
    # watchlist_list2.append(company_8)
    # watchlist_list2.append(company_9)
    # watchlist_list2.append(company_18)
    # watchlist_list2.append(company_21)

    # # energy
    # watchlist_3 = Watchlist.query.filter(Watchlist.id == 3)
    # watchlist_list3 = list(watchlist_3)
    # company_6 = Company.query.get(6)
    # company_11 = Company.query.get(11)
    # company_16 = Company.query.get(16)
    # watchlist_list3.append(company_6)
    # watchlist_list3.append(company_11)
    # watchlist_list3.append(company_16)

    # db.session.add(demo_watchlist_1)
    # db.session.add(watchlist_1)
    # db.session.add(watchlist_list2)
    # db.session.add(watchlist_list3)
    # db.session.commit()

def undo_watchlist_table():
    db.session.execute('TRUNCATE watchlist_company_join RESTART IDENTITY CASCADE')
    db.session.commit()
