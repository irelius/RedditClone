from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime

class PostLike(db.Model):
    __tablename__ = "post_likes"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    like_status = db.Column(db.String, nullable=False, default="neutral")
    likes_total = db.Column(db.Integer, nullable=False, default=0)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    # Many to One Relationships, Undirection TO Like
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("posts.id")), nullable=True)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "post_id": self.post_id,
            "like_status": self.like_status,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
