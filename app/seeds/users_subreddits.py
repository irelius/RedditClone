from app.models import db, UserSubreddit

def seed_users_subreddits():
    subreddit_one_user_one = UserSubreddit(
        id = 1,
        subreddit_id = 1,
        admin_id = 1,
        user_id = 1
    )
    subreddit_one_user_two = UserSubreddit(
        id = 2,
        subreddit_id = 1,
        admin_id = 1,
        # mod_id = 2,
        user_id = 2
    )
    subreddit_two_user_one = UserSubreddit(
        id = 3,
        subreddit_id = 2,
        admin_id = 1,
        user_id = 1
    )
    subreddit_two_user_two = UserSubreddit(
        id = 4,
        subreddit_id = 2,
        admin_id = 1,
        # mod_id = 3,
        user_id = 3,
    )
    subreddit_three_user_one = UserSubreddit(
        id = 5,
        subreddit_id = 3,
        admin_id = 1,
        user_id = 1
    )
    subreddit_three_user_two = UserSubreddit(
        id = 6,
        subreddit_id = 3,
        admin_id = 1,
        # mod_id = 2,
        user_id = 2
    )
    subreddit_three_user_three = UserSubreddit(
        id = 7,
        subreddit_id = 3,
        admin_id = 1,
        # mod_id = 3,
        user_id = 3
    )
    subreddit_four_user_one = UserSubreddit(
        id = 8,
        subreddit_id = 4,
        admin_id = 5,
        user_id = 1
    )
    subreddit_four_user_two = UserSubreddit(
        id = 9,
        subreddit_id = 4,
        admin_id = 5,
        # mod_id = 4,
        user_id = 4
    )
    subreddit_four_user_three = UserSubreddit(
        id = 10,
        subreddit_id = 4,
        admin_id = 5,
        user_id = 5
    )
    subreddit_four_user_four = UserSubreddit(
        id = 11,
        subreddit_id = 4,
        admin_id = 5,
        # mod_id = 6,
        user_id = 6
    )
    subreddit_four_user_five = UserSubreddit(
        id = 12,
        subreddit_id = 4,
        admin_id = 5,
        # mod_id = 7,
        user_id = 7
    )


    db.session.add(subreddit_one_user_one)
    db.session.add(subreddit_one_user_two)
    db.session.add(subreddit_two_user_one)
    db.session.add(subreddit_two_user_two)
    db.session.add(subreddit_three_user_one)
    db.session.add(subreddit_three_user_two)
    db.session.add(subreddit_three_user_three)
    db.session.add(subreddit_four_user_one)
    db.session.add(subreddit_four_user_two)
    db.session.add(subreddit_four_user_three)
    db.session.add(subreddit_four_user_four)
    db.session.add(subreddit_four_user_five)

    db.session.commit()

def undo_users_subreddits():
    db.session.execute("DELETE FROM users_subreddits;")
    db.session.commit()
