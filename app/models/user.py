from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import datetime

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_image = db.Column(db.String(255), nullable=True, default="https://www.redditstatic.com/avatars/avatar_default_01_A5A4A4.png")
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    # One to Many Relationships
    comments = db.relationship("Comment", backref="user_comments")
    posts = db.relationship("Post", backref="user_posts")
    likes = db.relationship("Like", backref="user_likes")
    subreddits = db.relationship("UserSubreddit", backref="user_subreddits")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'user_name': self.user_name,
            'email': self.email,
            'profile_image': self.profile_image,
            "subreddits": {subreddit.id: subreddit.to_dict() for subreddit in self.subreddits},
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
