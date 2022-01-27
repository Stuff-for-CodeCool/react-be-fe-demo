import { useAtom } from "jotai";
import state from "../state";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import dataManager from "../dataManager";

const Register = () => {
    const [currentUser, setCurrentUser] = useAtom(state.currentUser);
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);

        const loader = (response) => {
            if (response.error) {
                setError(response.error);
            } else {
                setCurrentUser(response);
                setRedirect(true);
            }
        };

        dataManager.post(`${process.env.REACT_APP_BACKEND}/users/`, loader, {
            username: e.target.username.value,
            password: e.target.password.value,
            name: e.target.name.value,
            mail: e.target.mail.value,
            address: e.target.address.value,
            birthdate: e.target.birthday.value,
        });
    };

    return redirect ? (
        <Navigate to="/"></Navigate>
    ) : (
        <>
            {error && (
                <div
                    className="alert alert-danger alert-dismissible fade show"
                    role="alert">
                    <strong>Error: </strong> {error}
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="alert"
                        aria-label="Close"></button>
                </div>
            )}
            <form onSubmit={handleSubmit} className="row">
                <div className="mb-3 col col-md-6">
                    <label htmlFor="username" className="form-label">
                        Username
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        required
                    />
                </div>
                <div className="mb-3 col col-md-6">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        required
                    />
                </div>
                <div className="mb-3 col col-md-6">
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        required
                    />
                </div>
                <div className="mb-3 col col-md-6">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="mail"
                        required
                    />
                </div>
                <div className="mb-3 col col-md-6">
                    <label htmlFor="birthday" className="form-label">
                        Birthday
                    </label>
                    <input
                        type="date"
                        className="form-control"
                        id="birthday"
                        name="birthday"
                        required
                    />
                </div>
                <div className="mb-3 col col-md-6">
                    <label htmlFor="address" className="form-label">
                        Address
                    </label>
                    <textarea
                        type="date"
                        className="form-control"
                        id="address"
                        name="address"
                        rows="1"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </>
    );
};

export default Register;
