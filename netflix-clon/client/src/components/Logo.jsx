import { Link } from "react-router-dom";

const Logo = ( { isLink = true } ) => {
    return isLink ? (
        <Link to="/" className="font-extrabold text-3xl text-[#E50914]">
            NETFLIX
        </Link>
    ) : (
        <span className="font-extrabold text-3xl text-[#E50914]">
            NETFLIX
        </span>
    );
};

export default Logo;
