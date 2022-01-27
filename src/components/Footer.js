import ActiveLink from "./ActiveLink";

const Footer = () => {
    return (
        <footer className="container position-sticky top-100">
            <ul className="nav">
                <li className="nav-item"><ActiveLink className="nav-link" to="/">Home</ActiveLink></li>
                <li className="nav-item"><ActiveLink className="nav-link" to="/users">Users</ActiveLink></li>
                <li className="nav-item"><ActiveLink className="nav-link" to="/posts">Posts</ActiveLink></li>
            </ul>
        </footer>
    );
};
export default Footer;
