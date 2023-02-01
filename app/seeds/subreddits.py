from app.models import db, Subreddit, environment, SCHEMA
import os

def seed_subreddits():
    subreaddit_one = Subreddit(
        name = "Subreaddit1",
        description = "Subreddit 1 description",
        admin_id = 1
    )
    subreaddit_two = Subreddit(
        name = "Subreaddit2",
        admin_id = 1,
        description = "Subreddit 2 description"
    )
    subreaddit_three = Subreddit(
        name = "Subreaddit3",
        admin_id = 5,
        description = "Subreddit 3 description"
    )
    subreaddit_four = Subreddit(
        name = "Subreaddit4",
        admin_id = 5,
        description = "Subreddit 4 description"
    )

    db.session.add(subreaddit_one)
    db.session.add(subreaddit_two)
    db.session.add(subreaddit_three)
    db.session.add(subreaddit_four)

    db.session.commit()

def undo_subreddits():
    if os.environ.get("FLASK_ENV") == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.subreddits RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM subreddits")

    db.session.commit()
