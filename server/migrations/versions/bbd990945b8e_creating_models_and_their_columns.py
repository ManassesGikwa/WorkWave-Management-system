"""creating models and their columns

Revision ID: bbd990945b8e
Revises: 
Create Date: 2024-04-18 22:23:05.014770

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'bbd990945b8e'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('departments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('create_date', sa.Date(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('employees',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=50), nullable=False),
    sa.Column('last_name', sa.String(length=50), nullable=False),
    sa.Column('phone_number', sa.String(length=20), nullable=True),
    sa.Column('email', sa.String(length=100), nullable=False),
    sa.Column('city', sa.String(length=100), nullable=True),
    sa.Column('DOB', sa.Date(), nullable=True),
    sa.Column('employee_availability_status', sa.String(length=255), nullable=True),
    sa.Column('role', sa.String(length=50), nullable=False),
    sa.Column('join_date', sa.Date(), nullable=True),
    sa.Column('department_id', sa.Integer(), nullable=True),
    sa.Column('password_hash', sa.String(length=128), nullable=False),
    sa.Column('manager_id', sa.Integer(), nullable=True),
    sa.Column('salary', sa.Float(), nullable=True),
    sa.ForeignKeyConstraint(['department_id'], ['departments.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['manager_id'], ['managers.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('managers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=50), nullable=False),
    sa.Column('last_name', sa.String(length=50), nullable=False),
    sa.Column('email', sa.String(length=100), nullable=False),
    sa.Column('phone_number', sa.String(length=20), nullable=True),
    sa.Column('join_date', sa.Date(), nullable=True),
    sa.Column('department_id', sa.Integer(), nullable=True),
    sa.Column('employee_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['department_id'], ['departments.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['employee_id'], ['employees.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('projects',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('status', sa.String(length=20), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('employee_project',
    sa.Column('employee_id', sa.Integer(), nullable=False),
    sa.Column('project_id', sa.Integer(), nullable=False),
    sa.Column('start_date', sa.Date(), nullable=False),
    sa.Column('end_date', sa.Date(), nullable=True),
    sa.ForeignKeyConstraint(['employee_id'], ['employees.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['project_id'], ['projects.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('employee_id', 'project_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('employee_project')
    op.drop_table('projects')
    op.drop_table('managers')
    op.drop_table('employees')
    op.drop_table('departments')
    # ### end Alembic commands ###
