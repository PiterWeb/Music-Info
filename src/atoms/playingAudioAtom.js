import { atom } from "recoil";

const playingAudioState = atom({
  key: "playingAudioState",
  default: false,
});

export default playingAudioState;
