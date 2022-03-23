import "./Navbar.css";
import Link from "../Link/Link";
import Logo from "../Logo/LogoSmall";
import authorizeURL from "../../utils/spotifyApi/authorizeURL";
import { useRecoilState } from "recoil";
import userState from "../../atoms/userAtom";

function truncate(str, n) {
  return str.length > n ? str.substr(0, n - 1) + "..." : str;
}

function Navbar() {
  const [user, _] = useRecoilState(userState);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to={"/"}>Home</Link>
        <Link to={"/search"}>Search</Link>
        {user !== null ? (
          <a href={authorizeURL} className="navlink">
            {truncate(user, 12)}
          </a>
        ) : (
          <a className="navlink" href={authorizeURL}>
            Log In
          </a>
        )}
      </div>

      <div className="navbar-rigth">
        <Logo />
      </div>
    </nav>
  );
}

export default Navbar;
