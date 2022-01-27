from flask import Blueprint, jsonify, url_for
from werkzeug.security import generate_password_hash, check_password_hash
from database import run_query
from util import get_data

user = Blueprint("user", __name__, url_prefix="/users")


@user.get("/")
def get_all():
    return jsonify(
        run_query(
            """
                SELECT *
                FROM users;
            """
        )
    )


@user.post("/")
def add_one():
    username = get_data("username")
    password = generate_password_hash(get_data("password"))
    name = get_data("name")
    mail = get_data("mail")
    address = get_data("address")
    birthdate = get_data("birthdate")

    if len(run_query("SELECT id FROM users WHERE username = %s;", (username,))):
        return jsonify({"error": "Username already exists"})

    if len(run_query("SELECT id FROM users WHERE mail = %s;", (mail,))):
        return jsonify({"error": "Email address already registered"})

    return jsonify(
        run_query(
            """
                INSERT INTO users (username, password, name, mail, address, birthdate)
                VALUES (%(username)s, %(password)s, %(name)s, %(mail)s, %(address)s, %(birthdate)s) RETURNING id, name, username;
            """,
            {
                "username": username,
                "password": password,
                "name": name,
                "mail": mail,
                "address": address,
                "birthdate": birthdate,
            },
            True,
        )
    )


@user.post("/login")
def login():
    username = get_data("username")
    password = get_data("password")

    passwd = run_query(
        "SELECT password FROM users WHERE username = %(username)s;",
        {"username": username},
    )
    if not passwd:
        return jsonify({"error": "Username or password incorrect"})

    if not check_password_hash(passwd[0].get("password"), password):
        return jsonify({"error": "Username or password not correct"})

    return jsonify(
        run_query(
            "SELECT id, username, name FROM users WHERE username = %(username)s;",
            {"username": username},
            True,
        )
    )


@user.get("/<int:id>")
def get_one(id):
    return jsonify(
        run_query(
            """
                SELECT
                    username,
                    name,
                    mail,
                    address,
                    to_char(birthdate, 'YYYY-MM-DD') as birthdate,
                FROM users
                WHERE id = %s;
            """,
            (id,),
            True,
        )
    )


@user.get("/<int:id>/posts")
@user.get("/<int:id>/posts/")
def get_posts(id):
    query = run_query(
        """
            SELECT id, title
            FROM posts
            WHERE user_id = %s;
            """,
        (id,),
    )
    return jsonify(
        [
            {
                "link": url_for("post.get_one", id=entry.get("id")),
                "title": entry.get("title"),
            }
            for entry in query
        ]
    )


@user.put("/<int:id>")
def update(id):
    return jsonify(
        run_query(
            """
                UPDATE users
                SET username = %(username)s,
                    password = %(password)s,
                    name = %(name)s,
                    mail = %(mail)s,
                    address = %(address)s,
                    birthdate = %(birthdate)s
                WHERE id = %(id)s;
            """,
            {
                "id": id,
                "username": get_data("username"),
                "password": get_data("password"),
                "name": get_data("name"),
                "mail": get_data("mail"),
                "address": get_data("address"),
                "birthdate": get_data("birthdate"),
            },
            True,
        )
    )


@user.delete("/<int:id>")
def remove(id):
    return jsonify(
        run_query(
            """
                DELETE
                FROM users
                WHERE id = %(id)s;
            """,
            {"id": id},
            True,
        )
    )
