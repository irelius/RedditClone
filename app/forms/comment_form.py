from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError

class CommentForm(FlaskForm):
    body = StringField('body', validators=[DataRequired()])
