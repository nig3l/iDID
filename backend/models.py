from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    username = db.Column(db.String(50), unique=True)
    bio = db.Column(db.Text)
    avatar_url = db.Column(db.String(200))
    joined_date = db.Column(db.DateTime, default=datetime.utcnow)
    achievements = db.relationship('Achievement', backref='user', lazy=True)

    __table_args__ = (
        db.UniqueConstraint('email', name='uq_user_email'),
        db.UniqueConstraint('username', name='uq_user_username'),
    )
    
    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'username': self.username,
            'bio': self.bio,
            'avatar_url': self.avatar_url,
            'joined_date': self.joined_date.isoformat()
        }
        
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
class Achievement(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'created_at': self.created_at.isoformat(),
            'user_id': self.user_id
        }
