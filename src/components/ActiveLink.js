import { useMatch, useResolvedPath, Link } from "react-router-dom";

const ActiveLink = ({ children, to, className, ...props }) => {
    const resolved = useResolvedPath(to);
    const match = useMatch({ path: resolved.pathname });

    const classes = className
        ? [...className.split(" ").filter((x) => !!x)]
        : [];

    if (match) {
        classes.push("active");
    }

    return (
        <Link className={classes.join(" ")} to={to} {...props}>
            {children}
        </Link>
    );
};

export default ActiveLink;
