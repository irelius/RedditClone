from flask import Blueprint
from flask_login import current_user, login_required
from app.models import db, Like
from app.forms import LikeForm

like_routes = Blueprint("likes", __name__)

# ------------------------------- Helper functions -------------------------------
# --------------------------------------------------------------------------------
# Return Likes helper function
def return_likes(id, likes, dislikes):
    likes_total = len(likes) - len(dislikes)
    return {
        id: {
            "likes_total": likes_total,
            "likes": {like.id: like.to_dict() for like in likes},
            "dislikes": {dislike.id: dislike.to_dict() for dislike in dislikes}
        }
    }


# --------------------------------------------------------------------------------

# Get all likes and dislikes made by current user
@like_routes.route("/users/current")
@login_required
def likes_current_user():
    current_user_id = current_user.get_id()
    likes = Like.query.filter(Like.like_status == "like").filter(Like.user_id == current_user_id).all()
    dislikes = Like.query.filter(Like.like_status == "dislike").filter(Like.user_id == current_user_id).all()

    return return_likes(current_user_id, likes, dislikes)


# Get all likes and dislikes made by specific user
@like_routes.route("/users/<int:user_id>")
def likes_specific_user(user_id):
    likes = Like.query.filter(Like.like_status == "like").filter(Like.user_id == user_id).all()
    dislikes = Like.query.filter(Like.like_status == "dislike").filter(Like.user_id == user_id).all()

    return return_likes(user_id, likes, dislikes)


# Get all likes and dislikes made to a specific post
@like_routes.route("/posts/<int:post_id>")
def likes_specific_post(post_id):
    likes = Like.query.filter(Like.like_status == "like").filter(Like.post_id == post_id).all()
    dislikes = Like.query.filter(Like.like_status == "dislike").filter(Like.post_id == post_id).all()

    return return_likes(post_id, likes, dislikes)


# Get all likes and dislikes made to a specific comment
@like_routes.route("/comments/<int:comment_id>")
def likes_specific_comment(comment_id):
    likes = Like.query.filter(Like.like_status == "like").filter(Like.comment_id == comment_id).all()
    dislikes = Like.query.filter(Like.like_status == "dislike").filter(Like.comment_id == comment_id).all()

    return return_likes(comment_id, likes, dislikes)


# Create a new like on a post
@like_routes.route("/posts/<int:post_id>", methods=["POST"])
@login_required
def likes_create_new_to_post(post_id):
    current_user_id = current_user.get_id()

    if current_user_id == None:
        return {"errors": "You must be logged in before liking a post"}, 401

    form = LikeForm()

    new_like = Like(
        like_status = form.data["like_status"],
        post_id = post_id,
        user_id = current_user_id
    )

    db.session.add(new_like)
    db.session.commit()

    return new_like.to_dict()


# Create a new like on a comment
@like_routes.route("/comments/<int:comment_id>", methods=["POST"])
@login_required
def likes_create_new_to_comment(comment_id):
    current_user_id = current_user.get_id()

    if current_user_id == None:
        return {"errors": "You must be logged in before liking a comment"}, 401

    form = LikeForm()

    new_like = Like(
        like_status = form.data["like_status"],
        comment_id = comment_id,
        user_id = current_user_id
    )

    db.session.add(new_like)
    db.session.commit()

    return new_like.to_dict()


# Update like status for a specific post
@like_routes.route("/posts/<int:post_id>", methods=["PUT"])
@login_required
def likes_update_to_post(post_id):
    current_user_id = int(current_user.get_id())
    like_to_edit_post = Like.query.filter((Like.post_id == int(post_id)), (Like.user_id == current_user_id)).all()[0]

    if current_user_id == None:
        return {"errors": "You must be logged in before liking a post"}, 401

    form = LikeForm()
    like_to_edit_post.like_status = form.data["like_status"]

    db.session.commit()

    return like_to_edit_post.to_dict()


# Update like status for a specific comment
@like_routes.route("/comments/<int:comment_id>", methods=["PUT"])
@login_required
def likes_update_to_comment(comment_id):
    current_user_id = int(current_user.get_id())
    like_to_edit_comment = Like.query.filter((Like.comment_id == int(comment_id)), (Like.user_id == current_user_id)).all()[0]

    if current_user_id == None:
        return {"errors": "You must be logged in before liking a comment"}, 401

    form = LikeForm()
    like_to_edit_comment.like_status = form.data["like_status"]

    db.session.commit()

    return like_to_edit_comment.to_dict()
