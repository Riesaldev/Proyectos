import { Link } from "react-router-dom";
import ProfileCards from "../Cards/ProfileCards";

const UsersItem = () => {
    return (
        <Link to="/profile/:id" className="flex flex-col items-center justify-between w-full h-full ">
            <ProfileCards />
        </Link>
    );
}

export default UsersItem;
