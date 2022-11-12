from .db import db
import datetime

class UserSubreddit(db.Model):
    __tablename__ = "users_subreddits"

    id = db.Column(db.Integer, primary_key=True)
