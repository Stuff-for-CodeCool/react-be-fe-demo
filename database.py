from os import getenv
from dotenv import load_dotenv
from psycopg2 import connect, DatabaseError
from psycopg2.extras import RealDictCursor as cursor_type


def establish_connection():
    load_dotenv()

    url = getenv("DB_URL")

    if not url:
        url = "postgresql://"
        url += getenv("DB_USER")
        url += ":"
        url += getenv("DB_PASS")
        url += "@"
        url += getenv("DB_HOST")
        url += ":5432/"
        url += getenv("DB_NAME")

    try:
        connection = connect(url, sslmode="require")
        connection.autocommit = True
        return connection

    except DatabaseError:
        raise RuntimeError("Could not connect to databse")


def run_query(statement, vars=None, single=False):
    with establish_connection() as conn:
        with conn.cursor(cursor_factory=cursor_type) as cursor:
            cursor.execute(statement, vars)
            query = cursor.query
            print(f"\n\n{ query.decode('utf-8') }\n\n")

            if single:
                return dict(cursor.fetchone())

            return [dict(entry) for entry in cursor.fetchall()]
