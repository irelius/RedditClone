from flask.cli import AppGroup

from app.models.db import db, environment, SCHEMA
import os

from .users import seed_users, undo_users
from .subreddits import seed_subreddits, undo_subreddits
from .users_subreddits import seed_users_subreddits, undo_users_subreddits
from .posts import seed_posts, undo_posts
from .comments import seed_comments, undo_comments
from .likes import seed_likes, undo_likes

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function)
        undo_users()
        undo_subreddits()
        undo_users_subreddits()
        undo_posts()
        undo_comments()
        undo_likes()
    seed_users()
    seed_subreddits()
    seed_users_subreddits()
    seed_posts()
    seed_comments()
    seed_likes()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_likes()
    undo_comments()
    undo_posts()
    undo_subreddits()
    undo_users_subreddits()
    undo_users()
    # Add other undo functions here
