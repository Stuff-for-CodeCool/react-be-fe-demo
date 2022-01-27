import ActiveLink from "./ActiveLink";
import { Link } from "react-router-dom";

import { useAtom } from "jotai";
import state from "../state";

const Header = () => {
    const [currentUser] = useAtom(state.currentUser);

    return (
        <header className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    React Frontend
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbar"
                    aria-controls="navbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <nav className="collapse navbar-collapse" id="navbar">
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item">
                            <ActiveLink to="/" className="nav-link">
                                Home
                            </ActiveLink>
                        </li>
                        <li className="nav-item">
                            <ActiveLink to="/users" className="nav-link">
                                Users
                            </ActiveLink>
                        </li>
                        <li className="nav-item">
                            <ActiveLink to="/posts" className="nav-link">
                                Posts
                            </ActiveLink>
                        </li>
                    </ul>
                    {currentUser ? (
                        <>
                            <span className="ms-auto navbar-text">{currentUser}</span>
                            <ul className="navbar-nav mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <ActiveLink
                                        to="/logout"
                                        className="nav-link">
                                        Logout
                                    </ActiveLink>
                                </li>
                            </ul>
                        </>
                    ) : (
                        <>
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <ActiveLink
                                        to="/login"
                                        className="nav-link">
                                        Login
                                    </ActiveLink>
                                </li>
                                <li className="nav-item">
                                    <ActiveLink
                                        to="/register"
                                        className="nav-link">
                                        Register
                                    </ActiveLink>
                                </li>
                            </ul>
                        </>
                    )}
                    {/* <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form> */}
                </nav>
            </div>
        </header>
    );
};

export default Header;
