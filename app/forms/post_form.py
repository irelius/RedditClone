from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError

class PostForm(FlaskForm):
    post_title = StringField("post_title", validators=[DataRequired()])
    post_body = StringField("post_body")
    post_image = StringField("post_image")
    post_video = StringField("post_video")
