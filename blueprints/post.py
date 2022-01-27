from flask import Blueprint, jsonify
from werkzeug.security import generate_password_hash
from database import run_query
from util import get_data

post = Blueprint("post", __name__, url_prefix="/post")


@post.get("/")
def get_all():
    return jsonify(
        run_query(
            """
                SELECT *
                FROM posts;
            """
        )
    )


@post.post("/")
def add_one():
    return jsonify(
        run_query(
            """
                INSERT INTO posts (user_id, title, body, posted)
                VALUES (%s, %s, %s, %s) RETURNING *;
            """,
            (
                get_data("user_id"),
                get_data("title"),
                get_data("body"),
                get_data("posted"),
            ),
            True,
        )
    )


@post.get("/<int:id>")
def get_one(id):
    return jsonify(
        run_query(
            """
                SELECT *
                FROM posts
                WHERE id = %s;
            """,
            (id,),
            True,
        )
    )


@post.put("/<int:id>")
def update(id):
    return jsonify(
        run_query(
            """
                UPDATE posts
                SET title = %(title)s,
                    body = %(body)s
                WHERE id = %(id)s;
            """,
            {
                "id": id,
                "title": get_data("title"),
                "body": get_data("body"),
            },
            True,
        )
    )


@post.delete("/<int:id>")
def remove(id):
    return jsonify(
        run_query(
            """
                DELETE
                FROM posts
                WHERE id = %(id)s;
            """,
            {
                "id": id,
            },
            True,
        )
    )


@post.get("/search")
@post.post("/search")
def search():
    return jsonify(
        run_query(
            """
                SELECT id, title
                FROM posts
                WHERE title ILIKE %(string)s
                OR body ILIKE %(string)s;
            """,
            {"string": "%" + get_data("search_string") + "%"},
        )
    )
