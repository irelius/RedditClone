from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import db, Subreddit, UserSubreddit, User
from app.forms import SubredditForm

subreddit_routes = Blueprint('subreddits', __name__)

# ------------------------------- Helper functions -------------------------------
# --------------------------------------------------------------------------------
# Return subreddits based on length
def return_subreddits(subreddits):
    if len(subreddits) > 0:
        return {"subreddits": {subreddit.id: subreddit.to_dict() for subreddit in subreddits}}
    return {"subreddits": "No subreddits"}

#Validation error function
def validation_error_message(validation_errors):
    error_messages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            error_messages.append(f'{field} : {error}')
    return error_messages


# --------------------------------------------------------------------------------


# Get all subreddits
@subreddit_routes.route("/")
def subreddits_all():
    subreddits = Subreddit.query.all()
    return return_subreddits(subreddits)


# Get specific subreddit by id
@subreddit_routes.route("/<int:subreddit_id>")
def subreddits_specific_id(subreddit_id):
    subreddit = Subreddit.query.get(subreddit_id)
    return {"subreddits": {subreddit_id: subreddit.to_dict()}}


# Get specific subreddit by name
@subreddit_routes.route("/<string:subreddit_name>")
def subreddits_specific_name(subreddit_name):
    subreddit = Subreddit.query.filter((Subreddit.name == subreddit_name)).first()
    return {"subreddits": {subreddit.id: subreddit.to_dict()}}


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
@subreddit_routes.route("/new", methods=["POST"])
@login_required
def subreddits_create_new():
    current_user_id = int(current_user.get_id())

    if current_user_id == None:
        return {"errors": "You must be logged in before creating a new subreddit"}, 401

    form = SubredditForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    name = form.data["name"].strip(" ")
    name = name.replace(" ", "_")

    if form.validate_on_submit():
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
    return {"errors": validation_error_message(form.errors)}, 401


# TO DO: implement function to add users to a private subreddit (another TO DO in the subreddit) or join a subreddit if public (this part is done for now)
# Add a user to a subreddit
@subreddit_routes.route("/<int:subreddit_id>/users/<int:user_id>", methods=["PUT"])
@login_required
def subreddits_add_user(subreddit_id, user_id):
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


# Delete a subreddit. Techically, this is not a function that is readily available to users of Readdit, but it is implemented
# in this project to demonstrate full CRUD functionality
@subreddit_routes.route("/<int:subreddit_id>", methods=["DELETE"])
@login_required
def subreddits_delete_specific(subreddit_id):
    current_user_id = int(current_user.get_id())
    subreddit_to_delete = Subreddit.query.get(subreddit_id)

    if current_user_id == None:
        return {"errors": "You must be logged in before deleting this subreddit"}, 401

    if(subreddit_to_delete.admin_id != current_user_id):
        return {"errors": "You do not have permission to delete this subreddit"}, 401

    db.session.delete(subreddit_to_delete)
    db.session.commit()

    return {"message": f"Successfully deleted Subreddit {subreddit_id}"}
