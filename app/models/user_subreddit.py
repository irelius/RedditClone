from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime


class UserSubreddit(db.Model):
    __tablename__ = "users_subreddits"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    # admin_id = db.Column(db.Integer, nullable=False)
    # TO DO, try to figure out how to add mods to this
    # mod_id = db.Column(db.Integer, nullable=True)
    subreddit_id = db.Column(db.ForeignKey("subreddits.id"), nullable=False, primary_key=True)
    user_id = db.Column(db.ForeignKey("users.id"), nullable=False, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    # Join Table association between User and Subreddit tables
    users = db.relationship("User", back_populates="subreddits")
    subreddits = db.relationship("Subreddit", back_populates="users")


    def to_dict(self):
        return {
            # "id": self.id,
            "subreddit_id": self.subreddit_id,
            "user_id": self.user_id,
            # "admin_id": self.admin_id,
            # "mod_id": self.mod_id,
        }
