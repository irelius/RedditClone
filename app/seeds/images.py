from app.models import db, Image, environment, SCHEMA
import os

def seed_images():
    image_one = Image(
        post_id = 2,
        image_url = "https://kbreaddit.s3.us-west-1.amazonaws.com/picture1.jpg"
    )
    image_two = Image(
        post_id = 4,
        image_url = "https://kbreaddit.s3.us-west-1.amazonaws.com/picture2.jpg",
    )
    image_three = Image(
        post_id = 5,
        image_url = "https://kbreaddit.s3.us-west-1.amazonaws.com/picture3.jpg"
    )

    db.session.add(image_one)
    db.session.add(image_two)
    db.session.add(image_three)

    db.session.commit()

def undo_images():
    if os.environ.get("FLASK_ENV") == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM images")

    db.session.commit()
