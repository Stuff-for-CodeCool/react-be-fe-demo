from flask import Flask, jsonify, url_for, redirect
from flask_cors import CORS
from blueprints.user import user
from blueprints.post import post


app = Flask(__name__)
app.secret_key = "ewiufhnksjhulksdglskdrgksdhvlihdlgajlg"

app.register_blueprint(user)
app.register_blueprint(post)

CORS(app)


@app.after_request
def after_request(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    response.headers["Access-Control-Allow-Methods"] = "GET,POST,PUT,DELETE"
    response.headers[
        "Access-Control-Allow-Headers"
    ] = "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization"
    return response


@app.get("/")
def index():
    return jsonify(
        [
            {
                "title": "Users",
                "link": url_for("user.get_all"),
            },
            {
                "title": "Posts",
                "link": url_for("post.get_all"),
            },
        ]
    )


@app.get("/search")
@app.post("/search")
def search():
    return redirect(url_for("post.search"))


if __name__ == "__main__":
    app.run(debug=True)
