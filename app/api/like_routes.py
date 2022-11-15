from flask import Blueprint
from flask_login import current_user, login_required
from app.models import db, Like

like_routes = Blueprint("likes", __name__)

# ------------------------------- Helper functions -------------------------------
# --------------------------------------------------------------------------------
# Return likes based on length
def return_likes(likes):
    if len(likes) == 1:
        return {"likes": {likes.id: likes.to_dict()}}
    elif len(likes) > 1:
        return {"likes": {like.id: like.to_dict() for like in likes}}
    return {"likes": "No likes"}, 404


# --------------------------------------------------------------------------------
