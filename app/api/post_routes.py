from flask import Blueprint
from flask_login import current_user, login_required
from app.models import db, Post, Subreddit
from app.forms import PostForm

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
    current_user_id = int(current_user.get_id())
    posts = Post.query.filter(Post.user_id == current_user_id).all()
    return return_posts(posts)


# Get posts made by specific user
@post_routes.route("/users/<int:user_id>")
def posts_by_specific_user(user_id):
    posts = Post.query.filter(Post.user_id == user_id).all()
    return return_posts(posts)


# Get posts for a specific subreddit by id
@post_routes.route("/subreddits/<int:subreddit_id>")
def posts_by_specific_subreddit_id(subreddit_id):
    posts = Post.query.filter(Post.subreddit_id == subreddit_id).all()
    return return_posts(posts)


# Get posts for a specific subreddit by name
@post_routes.route("/subreddits/<string:subreddit_name>")
def posts_by_specific_subreddit_name(subreddit_name):
    subreddit_id = (Subreddit.query.filter(Subreddit.name == subreddit_name).first()).to_dict()["id"]
    posts = Post.query.filter(Post.subreddit_id == subreddit_id).all()
    return return_posts(posts)



# Create a post for a specific subreddit
@post_routes.route("/subreddits/<int:subreddit_id>", methods=["POST"])
@login_required
def posts_create_new(subreddit_id):
    current_user_id = int(current_user.get_id())

    if current_user_id == None:
        return {"errors": "You must be logged in before creating a post"}, 401

    form = PostForm()

    new_post = Post(
        user_id = current_user_id,
        subreddit_id = subreddit_id,
        title = form.data["title"],
        body = form.data["body"],
        image = form.data["image"],
        video = form.data["video"],
    )

    # TO DO: by default, creator of a post or comment auto likes their own post/comment

    db.session.add(new_post)
    db.session.commit()

    return new_post.to_dict()


# Update a post by id
@post_routes.route("/<int:post_id>", methods=["PUT"])
def posts_update_specific(post_id):
    current_user_id = int(current_user.get_id())
    post_to_edit = Post.query.get(post_id)

    if current_user_id == None:
        return {"errors": "You must be logged in before editing a post"}, 401

    if post_to_edit.user_id != current_user_id:
        return {"errors": "You do not have permission to edit this post"}, 401

    form = PostForm()

    post_to_edit.title = form.data["title"]
    post_to_edit.body = form.data["body"]
    post_to_edit.image = form.data["image"]
    post_to_edit.video = form.data["video"]

    db.session.commit()
    return post_to_edit.to_dict()


# Delete a specific post
@post_routes.route("/<int:post_id>", methods=["DELETE"])
@login_required
def posts_delete_specific(post_id):
    current_user_id = int(current_user.get_id())
    post_to_delete = Post.query.get(post_id)

    if post_to_delete == None:
        return {"errors": f"Post {post_id} does not exist"}, 404

    if post_to_delete.user_id != current_user_id:
        return {"errors": f"User {current_user_id} does not have permission to delete Post {id}"}, 403

    db.session.delete(post_to_delete)
    db.session.commit()

    return {"message": f"Successfully deleted Post {post_id}"}
