import { useState, useEffect } from "react";
import PlayIcon from "../../images/play.svg";
import PauseIcon from "../../images/pause.svg";
import { useRecoilState } from "recoil";
import playingAudioState from "../../atoms/playingAudioAtom";

import "./Player.css";

function Player({ url }) {
  const useAudio = (url) => {
    const [audio, setAudio] = useState(new Audio(url));

    const [volume, setVolume] = useState(0.5);
    const [volumePreview, setVolumePreview] = useState(50);

    const [playing, setPlaying] = useRecoilState(playingAudioState);

    const changeVolume = (e) => setVolume(e.target.value / 100);
    const changeVolumePreview = (e) => setVolumePreview(e.target.value);

    const toggle = () => setPlaying(!playing);

    useEffect(() => {
      
      if (sessionStorage.getItem("volume")) {
        setVolume(sessionStorage.getItem("volume"));
      } else {
        setVolumePreview(50);
      }

      if (url === null) {
        setPlaying(false);
      } else {
        audio.pause();
        audio.currentTime = 0;
        setAudio(new Audio(url));
        setPlaying(false);
      }

    }, [url]);

    audio.onended = () => {
      setPlaying(false);
      audio.currentTime = 0;
    };

    useEffect(() => {
      playing ? audio.play() : audio.pause();
    }, [playing]);

    useEffect(() => {
      if (playing) {
        audio.pause();
      }
      audio.volume = volume;
      sessionStorage.setItem("volume", volume);

      if (playing) {
        audio.play();
      }
    }, [volume]);

    useEffect(() => {
      return () => {
        sessionStorage.setItem("volume", volume);
        audio.volume = 0;
        audio.currentTime = 0;
        audio.removeEventListener("ended", () => setPlaying(false));
      };
    }, []);

    return [
      playing,
      toggle,
      volumePreview,
      changeVolume,
      changeVolumePreview,
      setAudio,
    ];
  };

  const [
    playing,
    toggle,
    volumePreview,
    changeVolume,
    changeVolumePreview,
    setAudio,
  ] = useAudio(url);

  useEffect(() => {
    setAudio(new Audio(url));
  }, [url]);

  return (
    <>
      {url !== null ? (
        <div id="player">
          <button className="playButton" id="play" onClick={toggle}>
            {playing ? (
              <img className="playIcon" src={PauseIcon}></img>
            ) : (
              <img className="playIcon" src={PlayIcon}></img>
            )}
          </button>
          <input
            id="soundBar"
            type="range"
            min="0"
            max="100"
            value={volumePreview}
            onChange={changeVolumePreview}
            onMouseUp={changeVolume}
          />
        </div>
      ) : (
        <div id="player">
          <h3>No Preview Available</h3>
        </div>
      )}
    </>
  );
}

export default Player;
