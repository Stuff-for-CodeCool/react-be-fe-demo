import { useAtom } from "jotai";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import state from "../state";
import dataManager from "../dataManager";

const Login = () => {
    const [currentUser, setCurrentUser] = useAtom(state.currentUser);
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState(false);

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

        dataManager.post(
            `${process.env.REACT_APP_BACKEND}/users/login`,
            loader,
            {
                username: e.target.username.value,
                password: e.target.password.value,
            }
        );
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
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
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
                <div className="mb-3">
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
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </>
    );
};

export default Login;
