from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError

class LikeForm(FlaskForm):
    like_status = StringField("like_status")
