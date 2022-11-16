from flask import Blueprint
from flask_login import current_user, login_required
from app.models import db, Post

post_routes = Blueprint("posts", __name__)

# ------------------------------- Helper functions -------------------------------
# --------------------------------------------------------------------------------
# Return posts based on length
def return_posts(posts):
    if len(posts) > 0:
        return {"posts": {post.id: post.to_dict() for post in posts}}
    return {"posts": "No posts"}, 404


# --------------------------------------------------------------------------------


# Get all posts
@post_routes.route("/")
def posts_all():
    posts = Post.query.all()
    return return_posts(posts)


# Get specific post by id
@post_routes.route("/<int:post_id>")
def posts_specific(post_id):
    post = Post.query.get(post_id)
    return {"posts": {post_id: post.to_dict()}}


# Get posts made by current user
@post_routes.route("/current")
@login_required
def posts_by_current_user():
    current_user_id = current_user.get_id()
    posts = Post.query.filter(Post.user_id == current_user_id).all()
    return return_posts(posts)


# Get posts made by specific user
@post_routes.route("/users/<int:user_id>")
def posts_by_specific_user(user_id):
    posts = Post.query.filter(Post.user_id == user_id).all()
    return return_posts(posts)


# Get posts for a specific subreddit
@post_routes.route("/subreddits/<int:subreddit_id>")
def posts_by_specific_subreddit(subreddit_id):
    posts = Post.query.filter(Post.subreddit_id == subreddit_id).all()
    return return_posts(posts)


# TO DO
# Create a post for a specific subreddit
@post_routes.route("/subreddits/<int:subreddit_id>", methods=["POST"])
@login_required
def posts_create_new(subreddit_id):
    # Requires a post form to create a new post
    return "Created a new post"


# TO DO
# Update a post by id
@post_routes.route("/<int:post_id>", methods=["PUT"])
def posts_update_specific(post_id):
    # Requires a post form to update a post
    return "Updated a specific post"


# TO DO: test
# Delete a specific post
@post_routes.route("/<int:post_id>", methods=["POST"])
@login_required
def posts_delete_specific(post_id):
    current_user_id = current_user.get_id()
    post_to_delete = Post.query.get(post_id)

    if post_to_delete == None:
        return {"errors": f"Post {post_id} does not exist"}, 404

    if post_to_delete.user_id != current_user_id:
        return {"errors": f"User {current_user_id} does not have permission to delete Post {id}"}, 403

    db.session.delete(post_to_delete)
    db.session.commit()

    return {"message": f"Successfully delete Post {post_id}"}
