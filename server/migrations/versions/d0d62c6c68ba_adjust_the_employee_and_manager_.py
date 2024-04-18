from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = 'd0d62c6c68ba'
down_revision = 'bbd990945b8e'
branch_labels = None
depends_on = None

def upgrade():
    # Check if the table already exists before creating it
    inspector = sa.inspect(op.get_bind())
    if not inspector.has_table('manager_employees'):
        op.create_table(
            'manager_employees',
            sa.Column('manager_id', sa.Integer(), nullable=True),
            sa.Column('employee_id', sa.Integer(), nullable=True),
            sa.ForeignKeyConstraint(['employee_id'], ['employees.id'], name='fk_manager_employees_employee_id_employees'),
            sa.ForeignKeyConstraint(['manager_id'], ['managers.id'], name='fk_manager_employees_manager_id_managers')
        )

    # Drop the manager_id column from employees table
    with op.batch_alter_table('employees', schema=None) as batch_op:
        if 'fk_employees_manager_id_managers' in inspector.get_foreign_keys('employees'):
            batch_op.drop_constraint('fk_employees_manager_id_managers', type_='foreignkey')
        batch_op.drop_column('manager_id')

    # Add the salary column to managers table
    with op.batch_alter_table('managers', schema=None) as batch_op:
        if 'fk_managers_employee_id_employees' in inspector.get_foreign_keys('managers'):
            batch_op.drop_constraint('fk_managers_employee_id_employees', type_='foreignkey')
        batch_op.add_column(sa.Column('salary', sa.Float(), nullable=True))
        # Drop the employee_id column from managers table
        batch_op.drop_column('employee_id')

def downgrade():
    # Revert the changes made in the upgrade function

    with op.batch_alter_table('managers', schema=None) as batch_op:
        batch_op.add_column(sa.Column('employee_id', sa.INTEGER(), nullable=False))
        batch_op.create_foreign_key('fk_managers_employee_id_employees', 'employees', ['employee_id'], ['id'])
        batch_op.drop_column('salary')

    with op.batch_alter_table('employees', schema=None) as batch_op:
        batch_op.add_column(sa.Column('manager_id', sa.INTEGER(), nullable=True))
        batch_op.create_foreign_key('fk_employees_manager_id_managers', 'managers', ['manager_id'], ['id'])

    # Drop the association table
    op.drop_table('manager_employees')
