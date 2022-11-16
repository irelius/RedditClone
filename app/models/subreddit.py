from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime

class Subreddit(db.Model):
    __tablename__ = "subreddits"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    description = db.Column(db.String(1000))
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    # One to Many Relationship
    posts = db.relationship("Post", backref="subreddit")
    comments = db.relationship("Comment", backref="subreddit")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
