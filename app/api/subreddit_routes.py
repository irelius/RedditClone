from flask import Blueprint
from flask_login import login_required
from app.models import db, Subreddit

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


# Create a new subreddit
@subreddit_routes.route("/", methods=["POST"])
@login_required
def subreddits_create_new():
    # Requires the use of a subreddit creation form
    return "Create new subreddit"


# Update a subreddit by id
@subreddit_routes.route("/<int:subreddit_id>", methods=["PUT"])
@login_required
def subreddits_update_specific(subreddit_id):
    # Requires the use of a subreddit creation form
    return "Update a subreddit with PUT method."
