from flask import Blueprint
from flask_login import login_required
from app.models import db, Subreddit

subreddit_routes = Blueprint('subreddits', __name__)

# Get all subreddits
@subreddit_routes.route("/")
def subreddits_all():
    subreddits = Subreddit.query.all()
    return {"subreddits": {subreddit.id: subreddit.to_dict() for subreddit in subreddits}}
# return {'channel_messages':{channel_message.id: channel_message.to_dict() for channel_message in channel_messages}}


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


# Test route
@subreddit_routes.route("/test")
def subreddits_test():
    print("Subreddit Test Route")
    return "Test Route"
