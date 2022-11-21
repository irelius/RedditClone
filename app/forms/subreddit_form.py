from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Subreddit

def subreddit_exists(form, field):
    name = field.data
    name = Subreddit.query.filter(Subreddit.name == name).first()
    if name:
        raise ValidationError("This subreddit name is already in use.")


class SubredditForm(FlaskForm):
    name = StringField("name", validators=[DataRequired(), subreddit_exists])
    # admin_id = IntegerField("admin_id", validators=[DataRequired()])
    # mod_id = IntegerField("mod_id")
    # privacy_setting = SelectField("privacy_setting", choices=["Public", "Restricted", "Private"], validators=[DataRequired()])
    description = StringField("description")
