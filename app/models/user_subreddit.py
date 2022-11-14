from .db import db
import datetime

class UserSubreddit(db.Model):
    __tablename__ = "users_subreddits"

    id = db.Column(db.Integer, primary_key=True)
    subreddit_id = db.Column("subreddit_id", db.ForeignKey("subreddits.id"))
    admin_id = db.Column("admin_id", db.ForeignKey("users.id"), nullable=False)
    mod_id = db.Column("mod_id", db.ForeignKey("users.id"), nullable=True)
    user_id = db.Column("user_id", db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "subreddit_id": self.subreddit_id,
            "admin_id": self.admin_id,
            "mod_id": self.mod_id,
            "user_id": self.user_id
        }
