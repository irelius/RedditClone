from flask import Blueprint
from flask_login import current_user, login_required
from app.models import db, Subreddit, UserSubreddit
from app.forms import SubredditForm

subreddit_routes = Blueprint('subreddits', __name__)

# ------------------------------- Helper functions -------------------------------
# --------------------------------------------------------------------------------
# Return subreddits based on length
def return_subreddits(subreddits):
    if len(subreddits) > 0:
        return {"subreddits": {subreddit.id: subreddit.to_dict() for subreddit in subreddits}}
    return {"subreddits": "No subreddits"}, 404


# --------------------------------------------------------------------------------


# Get all subreddits
@subreddit_routes.route("/")
def subreddits_all():
    subreddits = Subreddit.query.all()
    return return_subreddits(subreddits)


# Get specific subreddit by id
@subreddit_routes.route("/<int:subreddit_id>")
def subreddits_specific(subreddit_id):
    subreddit = Subreddit.query.get(subreddit_id)
    return {"subreddits": {subreddit_id: subreddit.to_dict()}}


# Get all users of subreddit
@subreddit_routes.route("/<int:subreddit_id>/users")
def subreddits_specific_users(subreddit_id):
    users = UserSubreddit.query.filter((UserSubreddit.subreddit_id == subreddit_id)).all()
    return return_subreddits(users)


# Create a new subreddit
@subreddit_routes.route("", methods=["POST"])
@login_required
def subreddits_create_new():
    current_user_id = current_user.get_id()

    if current_user_id == None:
        return {"errors": "You must be logged in before creating a new subreddit"}, 401

    form = SubredditForm()

    new_subreddit = Subreddit(
        name = form.data["name"],
        description = form.data["description"],
    )

    db.session.add(new_subreddit)
    db.session.commit()

    new_user_subreddit = UserSubreddit(
        subreddit_id = new_subreddit.id,
        user_id = current_user_id,
        admin_id = current_user_id
    )

    db.session.add(new_user_subreddit)

    db.session.commit()


    return new_subreddit.to_dict()


# Update a subreddit by id
@subreddit_routes.route("/<int:subreddit_id>", methods=["PUT"])
@login_required
def subreddits_update_specific(subreddit_id):
    # Requires the use of a subreddit creation form
    return "Update a subreddit with PUT method."
