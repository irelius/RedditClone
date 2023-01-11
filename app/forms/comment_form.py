from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError

def check_comment_length(form, field):
    body = form.data["body"]

    if len(body) == 0:
        raise ValidationError("A comment body is required")

class CommentForm(FlaskForm):
    body = StringField('body', validators=[DataRequired(), check_comment_length])
