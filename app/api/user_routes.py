from flask import Blueprint, request
from flask_login import current_user, login_required, login_user, logout_user
from app.forms import LoginForm, SignUpForm
from app.models import db, User, UserSubreddit

user_routes = Blueprint('users', __name__)

#Validation error function
def validation_error_message(validation_errors):
    error_messages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            error_messages.append(f'{field} : {error}')
    return error_messages


# ---------------------------------------------------------------------------------
# Get all users
@user_routes.route('/', methods=["GET"])
def users_all():
    users = User.query.all()
    return {'users': {user.id: user.to_dict() for user in users}}


# Get current user
@user_routes.route('/current', methods=["GET"])
@login_required
def users_current():
    user = User.query.get(current_user.get_id())
    return {"users": {user.id: user.to_dict()}}


# Get specific user by id
@user_routes.route('/<int:user_id>', methods=["GET"])
def users_specific(user_id):
    user = User.query.get(user_id)
    return {"users": {user_id: user.to_dict()}}


# Get all subreddits specific user is part of
@user_routes.route("/<int:user_id>/subreddits")
def users_subreddits(user_id):
    subreddits = UserSubreddit.query.filter((UserSubreddit.user_id == user_id)).all()
    return {
        "users": {
            user_id: {
                "subreddit": {
                    subreddit.subreddit_id: subreddit.to_dict() for subreddit in subreddits
                }
            }
        }
    }




# Unauthorized user access
@user_routes.route("/unauthorized", methods=["GET"])
def users_unauthorized():
    return {"errors": ["Unauthorized access"]}, 401


# Login user
@user_routes.route("/login", methods = ["POST"])
def users_login():
    form = LoginForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User.query.filter(User.email == form.data["email"].first())
        login_user(user)
        return user.to_dict()
    return {"errors": validation_error_message(form.errors)}, 401


# Logout user
@user_routes.route("/logout", methods = ["POST"])
@login_required
def users_logout():
    logout_user()
    return {'message': "User has been successfully logged out"}


# Signup new user
@user_routes.route("/signup", methods=["POST"])
def users_signup():
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    username = form.data["username"].strip(" ")
    username = username.replace(" ", "_")

    if form.validate_on_submit():
        user = User(
            username = username,
            email = form.data["email"],
            password = form.data["password"]
        )

        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {"errors": validation_error_message(form.errors)}, 401


# Test Route
@user_routes.route("/test")
def users_test():
    return {'message': "Test route"}

# TO DO
# Edit current user details
# @user_routes.route('/current', methods=['PUT'])
# @login_required
# def users_update_current():
#     # get current user
#     current_user_update = User.query.get(current_user.get_id())

#     # get user data from form, TO DO: Create the EditUserForm
#     form = EditUserForm()

#     form['csrf_token'].data = request.cookies['csrf_token']

#     upload_profile_image = form.data['profile_image']

#     #? For help with debugging form

#     #? changing user profile
#     # TO DO: After getting AWS
#     # if "profile_image" in request.files:

#     #     image = request.files["profile_image"]

#     #     if not allowed_file(image.filename):
#     #         return {"errors": "file type not permitted"}, 400

#     #     image.filename = get_unique_filename(image.filename)

#     #     upload = upload_file_to_s3(image)

#     #     if "url" not in upload:
#     #         # if the dictionary doesn't have a url key
#     #         # it means that there was an error when we tried to upload
#     #         # so we send back that error message
#     #         return upload, 400

#     #     url = upload["url"]

#     #     # if url exist, replace profile image with url
#     #     if(url):
#     #         upload_profile_image = url

#     #* update user
#     if form.validate_on_submit():
#         # check for any form errors
#         # if first name exist
#         if(form.data['first_name']):
#             current_user_update.first_name = form.data['first_name']

#         # if last name exist
#         if(form.data['last_name']):
#             current_user_update.last_name = form.data['last_name']

#         # if user name exist
#         if(form.data['username']):
#             current_user_update.username = form.data['username']

#         # if email exist
#         if(form.data['email']):
#             current_user_update.email = form.data['email']

#         # if password exist
#         if(form.data['password']):
#             current_user_update.password = form.data['password']

#         # if profile image exist
#         if(upload_profile_image):
#             current_user_update.profile_image = upload_profile_image

#         # commit update
#         db.session.commit()

#         # return current user
#         return current_user_update.to_dict()

#     # return errors
#     return{"errors": [error_values for error in form.errors for error_values in form.errors[error]]}, 400



# Delete user
@user_routes.route("/current", methods = ["DELETE"])
@login_required
def users_delete():
    current_user_id = User.query.get(current_user.get_id())
    if(current_user_id == None):
        return {'errors': [f"User {current_user_id} does not exist"]}, 404

    db.session.delete(current_user_id)
    db.session.commit()
    return {"message": f"Successfully deleted User {current_user.id}"}
