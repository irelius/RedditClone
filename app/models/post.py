from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime

class Post(db.Model):
    __tablename__ = "posts"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(300), nullable=False)
    body = db.Column(db.String, nullable=True)
    image = db.Column(db.String, nullable=True)
    video = db.Column(db.String, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    # One to Many Relationships
    comments = db.relationship("Comment", backref="post")
    likes_total = db.relationship("Like", backref="post")

    # Many to One Relationships
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    subreddit_id = db.Column(db.Integer, db.ForeignKey("subreddits.id"))


    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "subreddit_id": self.subreddit_id,
            "title": self.title,
            "body": self.body,
            "image": self.image,
            "video": self.video,
            "likes_total": self.likes_total,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
