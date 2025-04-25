import { Link } from "react-router-dom";

const UsersItem = () => {
    return (
        <Link to="/profile/:id" className="flex flex-col items-center justify-between w-full h-full ">
            <a>User image</a>
            <p className=" text-3xl font-bold text-left mb-7">Usuarios</p>
        </Link>
    );
}

export default UsersItem;
