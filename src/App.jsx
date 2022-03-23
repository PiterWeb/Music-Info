import "./App.css";
import Logo from "./components/Logo/LogoNormal";
import SearchIcon from "./images/search.svg";
import InfoIcon from "./images/comment-alt-exclamation.svg";
import EnjoyIcon from "./images/heart-sign.svg";

function App() {
  return (
    <>
      <main>
        <span>v0.9</span>
        <Logo />
      </main>

      <section className="description">
        <p>
          <img src={SearchIcon} alt="" className="Icon" /> Search for a song
        </p>
        <p>
          <img src={InfoIcon} alt="" className="Icon" /> Get info about that or
          discover new ones
        </p>
        <p>
          <img src={EnjoyIcon} alt="" className="Icon" /> Enjoy it on a Music
          Streaming Service
        </p>
      </section>

      <section>
        <p>This is only available on Spotify for now</p>
      </section>
    </>
  );
}

export default App;
