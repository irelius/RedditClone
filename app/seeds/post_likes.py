from app.models import db, PostLike, environment, SCHEMA
import os


def seed_post_likes():
    post_like_one = PostLike(
        like_status = "like",
        user_id = 1,
        post_id = 5,
    )
    post_like_two = PostLike(
        like_status = "like",
        user_id = 2,
        post_id = 5,
    )
    post_like_three = PostLike(
        like_status = "like",
        user_id = 3,
        post_id = 5,
    )
    post_like_four = PostLike(
        like_status = "dislike",
        user_id = 4,
        post_id = 5,
    )

    db.session.add(post_like_one)
    db.session.add(post_like_two)
    db.session.add(post_like_three)
    db.session.add(post_like_four)

    db.session.commit()


def undo_post_likes():
    if os.environ.get("FLASK_ENV") == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.post_likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM post_likes")

    db.session.commit()
