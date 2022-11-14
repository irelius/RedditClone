from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        user_name='Demo',
        email='demo@aa.io',
        password='password'
    )
    marnie = User(
        user_name='marnie',
        email='marnie@aa.io',
        password='password'
    )
    bobbie = User(
        user_name='bobbie',
        email='bobbie@aa.io',
        password='password'
    )
    yusuke = User(
        user_name="yusuke",
        email="yusuke@aa.io",
        password="password"
    )
    kazu = User(
        user_name="kazu",
        email="kazu@aa.io",
        password="password"
    )
    oelgrin = User(
        user_name="oelgrin",
        email="oelgrin@aa.io",
        password="password"
    )
    aelvif = User(
        user_name="aelvif",
        email="aelvif@aa.io",
        password="password"
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(yusuke)
    db.session.add(kazu)
    db.session.add(oelgrin)
    db.session.add(aelvif)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
<<<<<<< HEAD
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

=======
    # if environment == "production":
    #     db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    # else:
    #     db.session.execute("DELETE FROM users")
    db.session.execute("DELETE FROM users;")
>>>>>>> seeders-initial_creation
    db.session.commit()
