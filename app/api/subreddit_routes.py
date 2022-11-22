from flask import Blueprint
from flask_login import current_user, login_required
from app.models import db, Subreddit, UserSubreddit, User
from app.forms import SubredditForm

subreddit_routes = Blueprint('subreddits', __name__)

# ------------------------------- Helper functions -------------------------------
# --------------------------------------------------------------------------------
# Return subreddits based on length
def return_subreddits(subreddits):
    # if len(subreddits) > 0:
    return {"subreddits": {subreddit.id: subreddit.to_dict() for subreddit in subreddits}}
    # return {"subreddits": "No subreddits"}, 404


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
    return {
        "subreddits": {
            subreddit_id: {
                "user": {
                    user.user_id: user.to_dict() for user in users
                }
            }
        }
    }


# Create a new subreddit
@subreddit_routes.route("/", methods=["POST"])
@login_required
def subreddits_create_new():
    current_user_id = int(current_user.get_id())

    if current_user_id == None:
        return {"errors": "You must be logged in before creating a new subreddit"}, 401

    form = SubredditForm()
    name = form.data["name"].strip(" ")
    name = name.replace(" ", "_")

    new_subreddit = Subreddit(
        name = name,
        description = form.data["description"],
        admin_id = current_user_id
    )

    db.session.add(new_subreddit)
    db.session.commit()

    new_subreddit_user = UserSubreddit(
        subreddit_id = new_subreddit.id,
        user_id = current_user_id,
    )

    db.session.add(new_subreddit_user)
    db.session.commit()

    return new_subreddit.to_dict()


# TO DO: implement function to add users to a private subreddit (another TO DO in the subreddit) or join a subreddit if public (this part is done for now)
# Add a user to a subreddit
@subreddit_routes.route("/<int:subreddit_id>/users/<int:user_id>", methods=["PUT"])
@login_required
def subreddits_add_user(subreddit_id, user_id):
    # return "booba"
    current_user_id = int(current_user.get_id())

    if current_user_id == None:
        return {"errors": "You must be logged in before addings people to this subreddit"}, 401


    # This would require a user to be added if the subreddit is set to private
    # subreddit_users = UserSubreddit.query.filter((UserSubreddit.subreddit_id == subreddit_id), (UserSubreddit.user_id == current_user_id)).all()
    # if len(subreddit_users) == 0:
    #     return {"errors": "You do not have permission to add a user to this subreddit"}, 403

    new_subreddit_user = UserSubreddit(
        subreddit_id = subreddit_id,
        user_id = user_id
    )

    db.session.add(new_subreddit_user)
    db.session.commit()

    return {"message": f"Successfully added User {user_id} to Subreddit {subreddit_id} "}


# Update a subreddit description by id, also possibly the privacy setting of subreddit if functionality implemented later
@subreddit_routes.route("/<int:subreddit_id>", methods=["PUT"])
@login_required
def subreddits_update_specific(subreddit_id):
    current_user_id = int(current_user.get_id())
    subreddit_to_edit = Subreddit.query.get(subreddit_id)

    if current_user_id == None:
        return {"errors": "You must be logged in before editing this subreddit"}, 401

    if subreddit_to_edit.admin_id != current_user_id:
        return {"errors": "You do not have permission to edit this subreddit"}, 401

    form = SubredditForm()
    subreddit_to_edit.description = form.data["description"]

    db.session.commit()
    return subreddit_to_edit.to_dict()
