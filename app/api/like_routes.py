from flask import Blueprint
from flask_login import current_user, login_required
from app.models import db, Like

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
    likes = Like.query.filter(Like.like_status == "like").filter(Like.post_id == comment_id).all()
    dislikes = Like.query.filter(Like.like_status == "dislike").filter(Like.post_id == comment_id).all()

    return return_likes(comment_id, likes, dislikes)


# TO DO
# Create a new like on a post
@like_routes.route("/posts/<int:post_id>")
@login_required
def likes_create_new_to_post(post_id):

    return "Create a new like or dislike on a post"


# TO DO
# Create a new like on a comment
@like_routes.route("/posts/<int:comment_id>")
@login_required
def likes_create_new_to_comment(comment_id):

    return "Create a new like or dislike on a comment"


# TO DO
# Update like status for a specific post
@like_routes.route("/posts/<int:post_id>")
@login_required
def likes_update_to_post(post_id):

    return "Update like or dislike on a post"



# TO DO
# Update like status for a specific comment
# Update like status for a specific post
@like_routes.route("/posts/<int:comment_id>")
@login_required
def likes_update_to_post(comment_id):

    return "Update like or dislike on a comment"
