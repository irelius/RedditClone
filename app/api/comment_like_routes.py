from flask import Blueprint
from flask_login import current_user, login_required
from app.models import db, CommentLike, Comment
from app.forms import LikeForm

comment_like_routes = Blueprint("comment_likes", __name__)

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


# Get all likes and dislikes ever made to comments
@comment_like_routes.route("/")
@login_required
def likes_total():
    current_user_id = int(current_user.get_id())
    likes = CommentLike.query.filter(CommentLike.like_status == "like").all()
    dislikes = CommentLike.query.filter(CommentLike.like_status == "dislike").all()

    return return_likes(current_user_id, likes, dislikes)


# # Get all likes and dislikes made to comments for comments that belong to a specific post
# @comment_like_routes.route('/all/post/<int:post_id>/comments')
# @login_required
# def likes_comments_per_post(post_id):
#     current_user_id = int(current_user.get_id())

#     likes = CommentLike.query.filter(CommentLike.like_status == "like").filter(CommentLike.comment_id != None).filter(Comment.post_id == post_id).all()
#     dislikes = CommentLike.query.filter(CommentLike.like_status == "dislike").filter(CommentLike.comment_id != None).filter(Comment.post_id == post_id).all()

#     return return_likes(current_user_id, likes, dislikes)


# Get all likes and dislikes made by current user
@comment_like_routes.route("/users/current")
@login_required
def likes_current_user():
    current_user_id = int(current_user.get_id())
    likes = CommentLike.query.filter(CommentLike.like_status == "like").filter(CommentLike.user_id == current_user_id).all()
    dislikes = CommentLike.query.filter(CommentLike.like_status == "dislike").filter(CommentLike.user_id == current_user_id).all()

    return return_likes(current_user_id, likes, dislikes)


# Get all likes and dislikes made by specific user
@comment_like_routes.route("/users/<int:user_id>")
def likes_specific_user(user_id):
    likes = CommentLike.query.filter(CommentLike.like_status == "like").filter(CommentLike.user_id == user_id).all()
    dislikes = CommentLike.query.filter(CommentLike.like_status == "dislike").filter(CommentLike.user_id == user_id).all()

    return return_likes(user_id, likes, dislikes)


# Get all likes and dislikes made to a specific comment
@comment_like_routes.route("/comments/<int:comment_id>")
def likes_specific_comment(comment_id):
    likes = CommentLike.query.filter(CommentLike.like_status == "like").filter(CommentLike.comment_id == comment_id).all()
    dislikes = CommentLike.query.filter(CommentLike.like_status == "dislike").filter(CommentLike.comment_id == comment_id).all()

    return return_likes(comment_id, likes, dislikes)



# Create a new like on a comment
@comment_like_routes.route("/comments/<int:comment_id>", methods=["POST"])
@login_required
def likes_create_new_to_comment(comment_id):
    current_user_id = int(current_user.get_id())

    if current_user_id == None:
        return {"errors": "You must be logged in before liking/disliking a comment"}, 401

    form = LikeForm()
    new_like = CommentLike(
        like_status = form.data["like_status"],
        comment_id = comment_id,
        user_id = current_user_id
    )

    db.session.add(new_like)
    db.session.commit()

    return new_like.to_dict()


# Update specific post like status to neutral
@comment_like_routes.route("/posts/<int:post_id>", methods=["PUT"])
@login_required
def likes_update_to_post(post_id):
    current_user_id = int(current_user.get_id())
    like_to_edit_post = CommentLike.query.filter((CommentLike.post_id == int(post_id)), (CommentLike.user_id == current_user_id)).all()[0]

    if current_user_id == None:
        return {"errors": "You must be logged in before liking/disliking a post"}, 401

    like_to_edit_post.like_status = "neutral"

    db.session.commit()

    return like_to_edit_post.to_dict()


# Update specific comment like status to neutral
@comment_like_routes.route("/comments/<int:comment_id>", methods=["PUT"])
@login_required
def likes_update_to_comment(comment_id):
    current_user_id = int(current_user.get_id())
    like_to_edit_comment = CommentLike.query.filter((CommentLike.comment_id == int(comment_id)), (CommentLike.user_id == current_user_id)).all()[0]

    if current_user_id == None:
        return {"errors": "You must be logged in before liking/disliking a comment"}, 401

    like_to_edit_comment.like_status = "neutral"

    db.session.commit()

    return like_to_edit_comment.to_dict()


# # Delete likes/dislikes to posts
# @comment_like_routes.route("/posts/<int:post_id>", methods=["DELETE"])
# @login_required
# def likes_delete_to_post(post_id):
#     current_user_id = int(current_user.get_id())
#     like_to_delete_post = CommentLike.query.filter((CommentLike.post_id == int(post_id)), (CommentLike.user_id == current_user_id)).all()[0]

#     if current_user_id == None:
#         return {"errors": "You must be logged in before liking/disliking a comment"}, 401

#     if like_to_delete_post == None:
#         return {"errors": "This post is not liked or disliked by user"}, 403

#     db.session.delete(like_to_delete_post)
#     db.session.commit()

#     return {"message": "Like/dislike successfully deleted"}
