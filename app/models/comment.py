from .db import db
import datetime

class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    reply_to_id = db.Column(db.Integer, nullable=True)
    body = db.Column(db.String(3000), nullable=False)
    likes_total = db.Column(db.Integer, nullable=False, default=0)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    # One to Many Relationship
    likes = db.relationship("Like", backref="comment")

    # Many to One Relationship
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"))
    subreddit_id = db.Column(db.Integer, db.ForeignKey("subreddits.id"))

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "post_id": self.post_id,
            "subreddit_id": self.subreddit_id,
            "reply_to_id": self.reply_to_id,
            "body": self.body,
            "likes_total": self.likes_total,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
