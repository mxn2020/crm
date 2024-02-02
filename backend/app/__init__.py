from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from app.api.leads import leads as leads_blueprint

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///crm.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    db.init_app(app)
    
    migrate = Migrate(app, db)  # Initialize Flask-Migrate
    
    # Blueprint registration and other app setup code goes here
    
    return app

app.register_blueprint(leads_blueprint, url_prefix='/api')
