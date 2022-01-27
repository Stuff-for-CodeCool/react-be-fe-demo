import { useAtom } from "jotai";
import state from "../state";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const Login = () => {
    const [currentUser, setCurrentUser] = useAtom(state.currentUser);
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setCurrentUser(e.target.username.value);
        setRedirect(true);
    };

    return redirect ? (
        <Navigate to="/"></Navigate>
    ) : (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">
                    Username
                </label>
                <input type="text" className="form-control" id="username" />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">
                    Password
                </label>
                <input type="password" className="form-control" id="password" />
            </div>
            <button type="submit" className="btn btn-primary">
                Submit
            </button>
        </form>
    );
};

export default Login;
