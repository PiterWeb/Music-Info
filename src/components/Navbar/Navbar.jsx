import "./Navbar.css";
import Link from "../Link/Link";
import Logo from "../Logo/LogoSmall";
import authorizeURL from "../../utils/spotifyApi/authorizeURL";
import { useRecoilState } from "recoil";
import userState from "../../atoms/userAtom";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

function Navbar() {
  const [user, _] = useRecoilState(userState);

  const navigate = useNavigate();

  return (
    <nav className="navbar">
        <Logo
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/" , { replace: true , search: "" });
          }}
        />
        {user === null ? (
          <a className="navlink" href={authorizeURL}>
            Log In
          </a>
        ) : (
          <SearchBar></SearchBar>
        )}
    </nav>
  );
}

export default Navbar;
