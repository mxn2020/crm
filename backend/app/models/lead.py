from app import db  # Import the SQLAlchemy instance

class Lead(db.Model):
    __tablename__ = 'leads'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    status = db.Column(db.String(50), nullable=False, default='new lead')
    # You can add more fields as needed, such as phone number, source, etc.

    def __init__(self, name, email, status='new lead'):
        self.name = name
        self.email = email
        self.status = status

    def __repr__(self):
        return f"<Lead {self.name}>"
