from flask.cli import AppGroup
from .users import seed_users, undo_users
from .companies import seed_companies, undo_companies
from .watchlists import seed_watchlists, undo_watchlists
from .watchlist_table import seed_watchlist_table, undo_watchlist_table
from .transactions import seed_transactions, undo_transactions
# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_companies()
    seed_watchlists()
    seed_watchlist_table()
    seed_transactions()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_companies()
    undo_watchlists()
    undo_watchlist_table()
    undo_transactions()
