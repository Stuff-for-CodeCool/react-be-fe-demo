from flask import Blueprint, jsonify, url_for
from werkzeug.security import generate_password_hash
from database import run_query
from util import get_data

user = Blueprint("user", __name__, url_prefix="/user")


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
    return jsonify(
        run_query(
            """
                INSERT INTO users (username, password, name, mail, address, birthdate)
                VALUES (%s, %s, %s, %s, %s, %s) RETURNING *;
            """,
            (
                get_data("username"),
                generate_password_hash(get_data("password")),
                get_data("name"),
                get_data("mail"),
                get_data("address"),
                get_data("birthdate"),
            ),
            True,
        )
    )


@user.get("/<int:id>")
def get_one(id):
    return jsonify(
        run_query(
            """
                SELECT *
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
            SELECT id
            FROM posts
            WHERE user_id = %s;
            """,
        (id,),
    )
    return jsonify([url_for("post.get_one", id=entry.get("id")) for entry in query])


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
            {
                "id": id,
            },
            True,
        )
    )
