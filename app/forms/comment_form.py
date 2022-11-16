from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError

class CommentForm(FlaskForm):
    comment_body = StringField("comment_body", validators=[DataRequired()])
