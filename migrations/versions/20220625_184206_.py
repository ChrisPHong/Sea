"""empty message

Revision ID: f0c2a7ada9c3
Revises: aa2fa298929d
Create Date: 2022-06-25 18:42:06.958505

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f0c2a7ada9c3'
down_revision = 'aa2fa298929d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('companies',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=150), nullable=False),
    sa.Column('ticker', sa.String(length=10), nullable=False),
    sa.Column('description', sa.Text(), nullable=False),
    sa.Column('ceo', sa.String(length=50), nullable=False),
    sa.Column('employees', sa.Integer(), nullable=False),
    sa.Column('headquarters', sa.String(length=100), nullable=False),
    sa.Column('founded', sa.Integer(), nullable=False),
    sa.Column('base_price', sa.Float(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('watchlists',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('watchlist_company_join',
    sa.Column('watchlists', sa.Integer(), nullable=False),
    sa.Column('companies', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['companies'], ['companies.id'], ),
    sa.ForeignKeyConstraint(['watchlists'], ['watchlists.id'], ),
    sa.PrimaryKeyConstraint('watchlists', 'companies')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('watchlist_company_join')
    op.drop_table('watchlists')
    op.drop_table('companies')
    # ### end Alembic commands ###
