from flask import Blueprint, request
from app.models import db, Image
from flask_login import current_user, login_required
from app.aws import (
    upload_file_to_s3, allowed_file, get_unique_filename)

image_routes = Blueprint("images", __name__)

# ------------------------------- Helper functions -------------------------------
# --------------------------------------------------------------------------------
# Return images based on length
def return_images(images):
    if len(images) > 0:
        return {"images": {image.id: image.to_dict() for image in images}}
    return {"images": "No images"}, 404

#Validation error function
def validation_error_message(validation_errors):
    error_messages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            error_messages.append(f'{field} : {error}')
    return error_messages


# --------------------------------------------------------------------------------


@image_routes.route("/")
def images_all():
    images = Image.query.all()
    return return_images(images)


@image_routes.route("/<int:post_id>", methods=["POST"])
@login_required
def images_upload(post_id):
    if "image" not in request.files:
        return {"errors": "image required"}, 400

    image = request.files["image"]

    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    # flask_login allows us to get the current user from the request
    new_image = Image(post_id=post_id, image_url=url)
    db.session.add(new_image)
    db.session.commit()
    return {"url": url}
