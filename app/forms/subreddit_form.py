from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
from wtforms.validators import DataRequired, ValidationError

class SubredditForm(FlaskForm):
    name = StringField("subreddit_name", validators=[DataRequired()])
    # privacy_setting = SelectField("privacy_setting", choices=["Public", "Restricted", "Private"], validators=[DataRequired()])
    description = StringField("description")
