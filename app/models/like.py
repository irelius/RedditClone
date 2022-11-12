from .db import db
import datetime

class Like(db.Model):
    __tablename__ = "likes"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column("user_id", db.ForeignKey("users.id"))
    post_id = db.Column("post_id", db.ForeignKey("posts.id"))
    comment_id = db.Column("comment_id", db.ForeignKey("comments.id"))
    like_status = db.Column(db.String, nullable=False, default="neutral")
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "post_id": self.post_id,
            "comment_id": self.comment_id,
            "like_status": self.like_status
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
