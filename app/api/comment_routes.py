from flask import Blueprint
from flask_login import current_user, login_required
from app.models import db, Comment
from app.forms import CommentForm

comment_routes = Blueprint("comments", __name__)

# ------------------------------- Helper functions -------------------------------
# --------------------------------------------------------------------------------
# Return comments based on length
def return_comments(comments):
    if len(comments) > 0:
        return {"comments": {comment.id: comment.to_dict() for comment in comments}}
    return {"comments": "No comments"}, 404


# --------------------------------------------------------------------------------


# Get all comments
@comment_routes.route("/")
def comments_all():
    comments = Comment.query.all()
    return return_comments(comments)


# Get specific comment by id
@comment_routes.route("/<int:comment_id>")
def comments_specific(comment_id):
    comment = Comment.query.get(comment_id)
    return {"comments": {comment_id: comment.to_dict()}}


# Get comments made by current user
@comment_routes.route("/current")
@login_required
def comments_by_current_user():
    current_user_id = current_user.get_id()
    comments = Comment.query.filter(Comment.user_id == current_user_id).all()
    return return_comments(comments)


# Get comments made by specific user
@comment_routes.route("/users/<int:user_id>")
def comments_by_specific_user(user_id):
    comments = Comment.query.filter(Comment.user_id == user_id).all()
    return return_comments(comments)


# Get comments made to a specific post
@comment_routes.route("/posts/<int:post_id>")
def comments_by_specific_post(post_id):
    comments = Comment.query.filter(Comment.post_id == post_id).all()
    return return_comments(comments)


# Get comments made to a specific subreddit, this route doesn't seem all that useful
# But I'll keep it just in case
@comment_routes.route("/subreddits/<int:subreddit_id>")
def comments_by_specific_subreddit(subreddit_id):
    comments = Comment.query.filter(Comment.subreddit_id == subreddit_id).all()
    return return_comments(comments)


# TO DO
# Create a new comment on a post
@comment_routes.route("/posts/<int:post_id>", methods=["POST"])
@login_required
def comments_create_new_to_post(post_id):
    current_user_id = current_user.get_id()

    if current_user_id == None:
        return {"errors": "You must be logged in before leaving a comment"}, 401

    form = CommentForm()

    new_comment = Comment(
        post_id = post_id,
        user_id = current_user_id,
        body = form.data["body"]
    )

    db.session.add(new_comment)
    db.session.commit()

    # requires a form to create a new comment
        # add to subreddits?
    return new_comment.to_dict()


# TO DO
# Create a new comment on a comment
@comment_routes.route("/comments/<int:comment_id>", methods=["POST"])
@login_required
def comments_create_new_to_comment(comment_id):
    current_user_id = current_user.get_id()

    if current_user_id == None:
        return {"errors": "You must be logged in before leaving a comment"}, 401

    form = CommentForm()

    new_comment = Comment(
        reply_to_id = comment_id,
        user_id = current_user_id,
        body = form.data["body"]
    )

    db.session.add(new_comment)
    db.session.commit()

    # requires a form to create a new comment
        # add to subreddits?
    return new_comment.to_dict()


# TO DO
# Update a specific comment
@comment_routes.route("/<int:comment_id>", methods=["PUT"])
@login_required
def comments_update_specific(comment_id):
    current_user_id = int(current_user.get_id())
    comment_to_edit = Comment.query.get(comment_id)

    print("")
    print(comment_to_edit.body)
    print("")

    if comment_to_edit.user_id != current_user_id:
        return {"errors": "You do not have permission to edit this comment"}, 401

    if current_user_id == None:
        return {"errors": "You must be logged in before leaving a comment"}, 401

    form = CommentForm()
    comment_to_edit.body = form.data["body"]

    db.session.commit()
    return comment_to_edit.to_dict()


# TO DO: test delete
# Delete a specific comment
@comment_routes.route("<int:comment_id>", methods=["DELETE"])
@login_required
def comments_delete_specific(comment_id):
    current_user_id = current_user.get_id()
    comment_to_delete = Comment.query.get(comment_id)

    if comment_to_delete == None:
        return {"errors": f"Comment {comment_id} does not exist"}, 404

    if comment_to_delete.user_id != current_user_id:
        return {"errors": f"User {current_user_id} does not have permission to delete Comment {comment_id}"}, 403

    db.session.delete(comment_to_delete)
    db.session.commit()

    return {"message": f"Successfully delete Comment {comment_id}"}
