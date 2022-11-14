from app.models import db, Comment

def seed_comments():
    comment_one = Comment(
        user_id = 1,
        post_id = 1,
        subreddit_id = 1,
        body = "Hello my baby",
        likes_total = 5,
    )
    comment_two = Comment(
        user_id = 2,
        post_id = 1,
        subreddit_id = 1,
        body = "Hello my darling",
        reply_to_id = 1,
        likes_total = 7,
    )
    comment_three = Comment(
        user_id = 1,
        post_id = 1,
        subreddit_id = 1,
        reply_to_id = 2,
        body = "Hello my rag time gal",
        likes_total = 12,
    )
    comment_four = Comment(
        user_id = 4,
        post_id = 2,
        subreddit_id = 2,
        body = "I wanna go fishing",
        likes_total = 0,
    )
    comment_five = Comment(
        user_id = 5,
        post_id = 2,
        subreddit_id = 2,
        reply_to_id = 4,
        body = "i tried it, was pretty fun",
        likes_total = 8,
    )
    comment_six = Comment(
        user_id = 6,
        post_id = 2,
        subreddit_id = 2,
        reply_to_id = 5,
        body = "Not so much fun when a fish comes flying out and hits you in the face",
        likes_total = -4,
    )
    comment_seven = Comment(
        user_id = 7,
        post_id = 2,
        subreddit_id = 2,
        reply_to_id = 6,
        body = "I disagree, that was hilarious",
        likes_total = 20,
    )
    comment_eight = Comment(
        user_id = 2,
        post_id = 3,
        subreddit_id = 3,
        body = "Is this true?",
        likes_total = 2,
    )
    comment_nine = Comment(
        user_id = 3,
        post_id = 3,
        subreddit_id = 3,
        body = "This is a fake article",
        likes_total = 989,
    )
    comment_ten = Comment(
        user_id = 2,
        post_id = 4,
        subreddit_id = 4,
        body = "tax season is coming up",
        likes_total = -50,
    )
    comment_eleven = Comment(
        user_id = 1,
        post_id = 5,
        subreddit_id = 4,
        body = "don't forget to change your oil",
    )
    comment_twelve = Comment(
        user_id = 3,
        post_id = 6,
        subreddit_id = 1,
        body = "Rub gum with ice to freeze it and then scrape it off",
    )

    db.session.add(comment_one)
    db.session.add(comment_two)
    db.session.add(comment_three)
    db.session.add(comment_four)
    db.session.add(comment_five)
    db.session.add(comment_six)
    db.session.add(comment_seven)
    db.session.add(comment_eight)
    db.session.add(comment_nine)
    db.session.add(comment_ten)
    db.session.add(comment_eleven)
    db.session.add(comment_twelve)

    db.session.commit()

def undo_comments():
    db.session.execute("DELETE FROM comments;")
    db.session.commit()
