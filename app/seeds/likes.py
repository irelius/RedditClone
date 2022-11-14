from .db import db, Like

def seed_likes():
    like_one = Like(
        like_status = "like",
        user_id = 1,
        post_id = 5,
    )
    like_two = Like(
        like_status = "like",
        user_id = 2,
        post_id = 5,
    )
    like_three = Like(
        like_status = "like",
        user_id = 3,
        post_id = 5,
    )
    like_four = Like(
        like_status = "dislike",
        user_id = 4,
        post_id = 5,
    )

    like_five = Like(
        like_status = "dislike",
        user_id = 5,
        comment_id = 11,
    )
    like_six = Like(
        like_status = "dislike",
        user_id = 6,
        comment_id = 11
    )
    like_seven = Like (
        like_status = "dislike",
        user_id = 7,
        comment_id = 11
    )
    like_eight = Like (
        like_status = "like",
        user_id = 8,
        comment_id = 11
    )

    like_nine = Like(
        like_status = "neutral",
        user_id = 1,
        comment_id = 12
    )
    like_ten = Like(
        like_status = "neutral",
        user_id = 2,
        comment_id = 12
    )
    like_eleven = Like(
        like_status = "like",
        user_id = 3,
        comment_id = 12
    )

    db.session.add(like_one)
    db.session.add(like_two)
    db.session.add(like_three)
    db.session.add(like_four)
    db.session.add(like_five)
    db.session.add(like_six)
    db.session.add(like_seven)
    db.session.add(like_eight)
    db.session.add(like_nine)
    db.session.add(like_ten)
    db.session.add(like_eleven)

    db.session.commit()


def undo_likes():
    db.session.execute("DELETE FROM likes")
    db.session.commit()
