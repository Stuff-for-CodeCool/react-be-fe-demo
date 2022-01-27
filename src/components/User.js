import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import dataManager from "../dataManager";

const User = () => {
    const { id } = useParams();
    const [user, setUser] = useState([]);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const loadPosts = (data) => {
            setUser(data);
            dataManager.get(
                `${process.env.REACT_APP_BACKEND}/users/${id}/posts/`,
                setPosts
            );
        };

        dataManager.get(
            `${process.env.REACT_APP_BACKEND}/users/${id}`,
            loadPosts
        );
    });

    return (
        <>
            <div className="card my-3 shadow-lg">
                <div className="card-body">
                    <h5 className="card-title">{user.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                        {user.username}
                    </h6>
                    <p className="card-text">
                        <strong>Email:</strong> {user.mail}
                    </p>
                    <p className="card-text">
                        <strong>Address:</strong> {user.address}
                    </p>
                    <p className="card-text">
                        <strong>Birthday:</strong> {user.birthdate}
                    </p>
                </div>
            </div>
            <div className="card my-3 shadow-lg">
                <div className="card-body">
                    {!posts.length ? (
                        <h5 className="card-title">
                            {user.name} has published no articles.
                        </h5>
                    ) : (
                        <>
                            <h5 className="card-title">
                                {user.name} has published these articles:
                            </h5>
                            <div className="list-group mt-3">
                                {posts.map((p, i) => (
                                    <Link
                                        className="list-group-item list-group-item-action"
                                        key={i}
                                        to={p.link}>
                                        {p.title}
                                    </Link>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default User;
