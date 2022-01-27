import { useAtom } from "jotai";
import state from "../state";
import { Navigate } from "react-router-dom";

const Logout = () => {
    const [currentUser, setCurrentUser] = useAtom(state.currentUser);

    setCurrentUser(null);

    return <Navigate to="/"></Navigate>;
};

export default Logout;
