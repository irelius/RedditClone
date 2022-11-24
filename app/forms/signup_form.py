from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
import re

def check_valid_email(form, field):
    EMAIL_REGEX = re.compile(r"[^@]+@[^@]+\.[^@]+")

    if not EMAIL_REGEX.match(field.data):
        raise ValidationError("Email entered is invalid.")


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


def check_special_characters(form, field):
    # Checking if username has special characters
    username = field.data
    special_characters = " `~!@#$%^&*()+=[{]}\|;:,.<>/?'\"\""
    if any(c in special_characters for c in username):
        raise ValidationError("Letters, numbers, dashes, and underscores only. Please try again without symbols.")


def check_username_length (form, field):
    username = field.data
    if 3 > len(username) or 20 < len(username):
        raise ValidationError("Username must be between 3 and 20 characters")

def check_password_length (form, field):
    password = field.data
    if len(password) < 8:
        raise ValidationError("Password length must be at least 8 characters long")


class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), username_exists, check_username_length, check_special_characters])
    email = StringField('email', validators=[DataRequired(), user_exists, check_valid_email])
    password = StringField('password', validators=[DataRequired(), check_password_length])
