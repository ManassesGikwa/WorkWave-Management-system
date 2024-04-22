"""removed department_id

Revision ID: 305d165bb5d4
Revises: 81413d46cf8a
Create Date: 2024-04-22 10:11:00.841695

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '305d165bb5d4'
down_revision = '81413d46cf8a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('employee_project')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('employee_project',
    sa.Column('employee_id', sa.INTEGER(), nullable=False),
    sa.Column('project_id', sa.INTEGER(), nullable=False),
    sa.Column('start_date', sa.DATE(), nullable=False),
    sa.Column('end_date', sa.DATE(), nullable=True),
    sa.ForeignKeyConstraint(['employee_id'], ['employees.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['project_id'], ['projects.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('employee_id', 'project_id')
    )
    # ### end Alembic commands ###
