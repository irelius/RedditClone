from app.models import db, Post, environment, SCHEMA
import os

def seed_posts():
    post_one = Post(
        title = "Post One",
        user_id = 1,
        subreddit_id = 1,
        body = "Body for post one."
    )
    post_two = Post(
        title = "Post Two",
        user_id = 2,
        subreddit_id = 2,
        body = "Body for post two."
    )
    post_three = Post(
        title = "Post Three",
        user_id = 3,
        subreddit_id = 3,
        body = "Body for post three."
    )
    post_four = Post(
        title = "Post Four",
        user_id = 4,
        subreddit_id = 4,
        body = "Body for post four."
    )
    post_five = Post(
        title = "Post Five",
        user_id = 5,
        subreddit_id = 1,
        body = "Body for post five."
    )
    post_six = Post(
        title = "Post Six",
        user_id = 6,
        subreddit_id = 2,
        body = "Body for post six."
    )
    post_seven = Post(
        title = "Post Seven",
        user_id = 7,
        subreddit_id = 3,
        body = "Body for post seven."
    )
    post_eight = Post(
        title = "Post Eight",
        user_id = 1,
        subreddit_id = 1,
        body = "Body for post eight."
    )

    db.session.add(post_one)
    db.session.add(post_two)
    db.session.add(post_three)
    db.session.add(post_four)
    db.session.add(post_five)
    db.session.add(post_six)
    db.session.add(post_seven)
    db.session.add(post_eight)

    db.session.commit()


def undo_posts():
    if os.environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM posts")

    db.session.commit()
