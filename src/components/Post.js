import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import dataManager from "../dataManager";

const Post = () => {
    const { id } = useParams();
    const [post, setPost] = useState({
        title: null,
        posted: null,
        body: "",
    });

    useEffect(() => {
        dataManager.get(
            `${process.env.REACT_APP_BACKEND}/posts/${id}`,
            setPost
        );
    }, [id]);

    return (
        <>
            <h1>{post.title}</h1>
            <h6 className="text-muted">{post.posted}</h6>
            {post.body.split("\n").map((p, i) => (
                <p key={i}>{p}</p>
            ))}
        </>
    );

    // return (
    //     <div className="table-responsive">
    //         <table className="table table-striped">
    //             <thead>
    //                 <tr>
    //                     <th>Title</th>
    //                     <th>Posted on</th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 {posts.map((u, i) => (
    //                     <tr key={u.id}>
    //                         <td>
    //                             <Link to={`/posts/${u.id}`}>{u.title}</Link>
    //                         </td>
    //                         <td>{u.posted}</td>
    //                     </tr>
    //                 ))}
    //             </tbody>
    //         </table>
    //     </div>
    // );
};

export default Post;
