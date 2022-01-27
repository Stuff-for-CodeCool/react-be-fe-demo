import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import dataManager from "../dataManager";

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        dataManager.get(`${process.env.REACT_APP_BACKEND}/users/`, setUsers);
    }, []);

    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => (
                        <tr key={u.id}>
                            <td>
                                <Link to={`/users/${u.id}`}>{u.name}</Link>
                            </td>
                            <td>{u.username}</td>
                            <td>{u.mail}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
