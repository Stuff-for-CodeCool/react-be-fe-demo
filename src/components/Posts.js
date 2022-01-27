import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import dataManager from "../dataManager";

const Posts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        dataManager.get(`${process.env.REACT_APP_BACKEND}/posts/`, setPosts);
    }, []);

    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Posted on</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((u, i) => (
                        <tr key={u.id}>
                            <td>
                                <Link to={`/posts/${u.id}`}>{u.title}</Link>
                            </td>
                            <td>{u.posted}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Posts;
