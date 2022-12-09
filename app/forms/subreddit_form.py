from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Subreddit

def subreddit_exists(form, field):
    name = field.data
    name = Subreddit.query.filter(Subreddit.name == name).first()
    if name:
        raise ValidationError("This subreddit name is already in use.")

def check_subreddit_length(form, field):
    name = form.data["name"]
    if len(name) == 0:
        raise ValidationError("A subreddit name is required.")

    if len(name) > 21:
        raise ValidationError("Subreddit name is too long. Please limit to 21 characters.")

def check_description_length(form, field):
    description = form.data["description"]
    if len(description) > 500:
        raise ValidationError("Subreddit description is too long. Please limit to 500 characters.")


class SubredditForm(FlaskForm):
    name = StringField("name", validators=[DataRequired(), check_subreddit_length, subreddit_exists])
    # admin_id = IntegerField("admin_id", validators=[DataRequired()])
    # mod_id = IntegerField("mod_id")
    # privacy_setting = SelectField("privacy_setting", choices=["Public", "Restricted", "Private"], validators=[DataRequired()])
    description = StringField("description", validators=[check_description_length])
