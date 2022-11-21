from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError

class SubredditForm(FlaskForm):
    name = StringField("name", validators=[DataRequired()])
    admin_id = IntegerField("admin_id", validators=[DataRequired()])
    # mod_id = IntegerField("mod_id")
    # privacy_setting = SelectField("privacy_setting", choices=["Public", "Restricted", "Private"], validators=[DataRequired()])
    description = StringField("description")
