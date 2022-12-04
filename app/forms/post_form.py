from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError

def check_title_length(form, field):
    title = field.data
    if len(title) > 300:
        raise ValidationError("Post title is too long. Please limit to 300 characters.")

class PostForm(FlaskForm):
    title = StringField("title", validators=[DataRequired(), check_title_length])
    body = StringField("body")
    image = StringField("image")
    video = StringField("video")
