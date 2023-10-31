import React, { createContext, useContext, useState } from "react";

const MusicPlayerContext = createContext();

export function useMusicPlayer() {
  return useContext(MusicPlayerContext);
}

export function MusicPlayerProvider({ children }) {
  const [currentSong, setCurrentSong] = useState(null);

  // You can add additional state and functions here for playback control.

  return (
    <MusicPlayerContext.Provider value={{ currentSong, setCurrentSong }}>
      {children}
    </MusicPlayerContext.Provider>
  );
}
