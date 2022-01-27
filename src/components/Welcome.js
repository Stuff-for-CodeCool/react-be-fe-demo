import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import dataManager from "../dataManager";

const Welcome = () => {
    const [links, setLinks] = useState([]);

    useEffect(() => {
        dataManager.get(process.env.REACT_APP_BACKEND, setLinks);
    }, []);

    return (
        <>
            <h1 className="mb-3">Welcome to the demo</h1>
            <div className="list-group">
                {links.map((l, i) => (
                    <Link
                        key={i}
                        className="list-group-item list-group-item-action"
                        to={l.link}>
                        {l.title}
                    </Link>
                ))}
            </div>
        </>
    );
};

export default Welcome;
