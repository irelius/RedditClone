from flask import Blueprint
from app.models import db, Subreddit

subreddit_routes = Blueprint('subreddits', __name__)

# Get all subreddits
@subreddit_routes.route("/")
def subreddits_all():
    subreddits = Subreddit.query.all()
    return {"subreddits": subreddits.to_dict()}



# Test route
@subreddit_routes.route("/test")
def subreddits_test():
    print("Subreddit Test Route")
    return "Test Route"
