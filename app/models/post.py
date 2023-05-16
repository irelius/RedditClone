from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime

class Post(db.Model):
    __tablename__ = "posts"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(300), nullable=False)
    body = db.Column(db.String, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    # One to Many Relationships, Unidirectional FROM Post
    comments = db.relationship("Comment", cascade="all, delete")
    post_likes = db.relationship("PostLike", cascade="all, delete")
    images = db.relationship("Image", cascade="all, delete")
    # videos = db.relationship("Video", cascade="all, delete")


    # Many to One Relationships, Unidirectional TO Post
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    subreddit_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("subreddits.id")))


    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "subreddit_id": self.subreddit_id,
            "title": self.title,
            "body": self.body,
            "images":  {image.id: image.to_dict() for image in self.images},
            # "videos": {video.id: video.to_dict() for video in self.videos},
            "post_likes": {post_likes.id: post_likes.to_dict() for post_likes in self.post_likes},
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
