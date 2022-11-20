from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime


class UserSubreddit(db.Model):
    __tablename__ = "users_subreddits"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    admin_id = db.Column(db.Integer, nullable=False)
    subreddit_id = db.Column(db.ForeignKey("subreddits.id"), primary_key=True)
    user_id = db.Column(db.ForeignKey("users.id"), nullable=False, primary_key=True)
    # TO DO, try to figure out how to add mods to this
    # mod_id = db.Column("mod_id", db.ForeignKey("users.id"), nullable=True) # This doesn't work as I already have a foreign key linking to the User table

    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    # Relationship
    users = db.relationship("User", backref="subreddit_users_join")
    subreddits = db.relationship("Subreddit", backref="user_subreddits_join")


    def to_dict(self):
        return {
            "id": self.id,
            "subreddit_id": self.subreddit_id,
            "user_id": self.user_id,
            "admin_id": self.admin_id,
            # "mod_id": self.mod_id,
        }
