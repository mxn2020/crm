import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from app.blueprints import leads, auth  # Importing blueprints from the blueprints.py file

# Import configurations
from config import DevelopmentConfig, ProductionConfig, TestingConfig

db = SQLAlchemy()
migrate = Migrate()

config_dict = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig
}

def register_blueprints(app):
    from app.api.leads import leads as leads_blueprint
    from app.api.auth import auth as auth_blueprint
    app.register_blueprint(leads_blueprint, url_prefix='/api/leads')
    app.register_blueprint(auth_blueprint, url_prefix='/api/auth')
    # Register more blueprints as needed

def create_app(config_name=None):
    app = Flask(__name__)

    if config_name is None:
        config_name = os.getenv('FLASK_ENV', 'development')

    app.config.from_object(config_dict.get(config_name, DevelopmentConfig))

    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app)
    register_blueprints(app)

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
