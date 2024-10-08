import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/Appcontext";
import SignOutButton from "./SignOutButton";
const Header = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">EnjoyHolidays.com</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link to="/my-bookings" className="flex text-white font-bold px-3 hover:bg-blue-600 items-center">My Bookings</Link>
              <Link to="/my-hotels" className="flex text-white font-bold px-3 hover:bg-blue-600 items-center">My Hotels</Link>
<SignOutButton />            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex text-center items-center bg-white text-blue-600 px-3 hover:bg-gray-100"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
