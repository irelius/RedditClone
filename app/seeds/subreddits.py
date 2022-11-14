from app.models import db, Subreddit

def seed_subreddits():
    subreddit_one = Subreddit(
        name = "Subreddit 1",
        description = "Subreddit 1 description"
    )
    subreddit_two = Subreddit(
        name = "Subreddit 2",
        description = "Subreddit 2 description"
    )
    subreddit_three = Subreddit(
        name = "Subreddit 3",
        description = "Subreddit 3 description"
    )
    subreddit_four = Subreddit(
        name = "Subreddit 4",
        description = "Subreddit 4 description"
    )

    db.session.add(subreddit_one)
    db.session.add(subreddit_two)
    db.session.add(subreddit_three)
    db.session.add(subreddit_four)

    db.session.commit()

def undo_subreddits():
    db.session.execute("DELETE FROM subreddits;")
    db.session.commit()
