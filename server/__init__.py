# __init__.py

# Import statements for external libraries
from flask import Flask
from flask_sqlalchemy import SQLAlchemy


# Create SQLAlchemy object without linking to the app
db = SQLAlchemy()

from . import models

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Import models to ensure they are registered with SQLAlchemy
    from .models import init_db
    init_db(app)

    # Initialize other components of the app...

    return app
