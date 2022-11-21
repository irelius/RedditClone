from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime

class Subreddit(db.Model):
    __tablename__ = "subreddits"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    admin_id = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String(21), unique=True, nullable=False)
    # TO DO: add a function to make a subreddit private
    # privacy_setting = db.Column(db.String, nullable=False)
    description = db.Column(db.String(500))
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    # One to Many Relationship, Unidirectional FROM Subreddit
    posts = db.relationship("Post")
    comments = db.relationship("Comment")

    # Many to Many Relationship. Bidirectional through join table UserSubreddit
    users = db.relationship("UserSubreddit", back_populates="subreddits")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "admin_id": self.admin_id,
            "description": self.description,
            "user": {user.user_id: user.to_dict() for user in self.users},
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
