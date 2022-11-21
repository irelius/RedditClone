from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError

class PostForm(FlaskForm):
    title = StringField("title", validators=[DataRequired()])
    body = StringField("body")
    image = StringField("image")
    video = StringField("video")
