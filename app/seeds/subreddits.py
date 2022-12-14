from app.models import db, Subreddit, environment, SCHEMA
import os

def seed_subreddits():
    subreddit_one = Subreddit(
        name = "Subreddit_1",
        description = "Subreddit 1 description",
        admin_id = 1
    )
    subreddit_two = Subreddit(
        name = "Subreddit_2",
        admin_id = 1,
        description = "Subreddit 2 description"
    )
    subreddit_three = Subreddit(
        name = "Subreddit_3",
        admin_id = 5,
        description = "Subreddit 3 description"
    )
    subreddit_four = Subreddit(
        name = "Subreddit_4",
        admin_id = 5,
        description = "Subreddit 4 description"
    )

    db.session.add(subreddit_one)
    db.session.add(subreddit_two)
    db.session.add(subreddit_three)
    db.session.add(subreddit_four)

    db.session.commit()

def undo_subreddits():
    if os.environ.get("FLASK_ENV") == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.subreddits RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM subreddits")

    db.session.commit()
