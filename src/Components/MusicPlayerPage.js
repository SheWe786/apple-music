import React, { useState, useEffect, useRef } from 'react';
import { IconButton, Typography } from '@mui/material';
import { PlayArrow, Pause, SkipPrevious, Repeat, Shuffle } from '@mui/icons-material';
import { useMusicPlayer } from './MusicPlayerContext';

function MusicPlayerPage() {
  const { currentSong } = useMusicPlayer();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  const audioRef = useRef(new Audio(currentSong ? currentSong.audio_url : null));

  // Use this effect to handle changes in the current song
  useEffect(() => {
    if (currentSong) {
      audioRef.current.src = currentSong.audio_url;
      if (isPlaying) {
        audioRef.current.play();
      }
    } else {
      audioRef.current.pause();
    }
  }, [currentSong, isPlaying]);

  const handlePlayPause = () => {
    if (currentSong) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handlePrev = () => {
    // Implement logic to play the previous song.
    // You may need to maintain a list of songs and their order to determine the previous song.
  };

  const handleLoop = () => {
    setIsLooping(!isLooping);
    // Add logic to enable or disable looping here.
  };

  const handleShuffle = () => {
    setIsShuffling(!isShuffling);
    // Add logic to enable or disable shuffling here.
  };

  

  return (
    <div className="music-player" style={{ marginTop: "70px", marginLeft: "20px" }}>
      <Typography variant="h6" gutterBottom>
        {currentSong ? currentSong.title : 'No song selected'}
      </Typography>
      <IconButton onClick={handlePrev}>
        <SkipPrevious />
      </IconButton>
      <IconButton onClick={handlePlayPause}>
        {isPlaying ? <Pause /> : <PlayArrow />}
      </IconButton>
      <IconButton onClick={handleLoop}>
        <Repeat color={isLooping ? 'primary' : 'inherit'} />
      </IconButton>
      <IconButton onClick={handleShuffle}>
        <Shuffle color={isShuffling ? 'primary' : 'inherit'} />
      </IconButton>
      </div>
  );
}

export default MusicPlayerPage;
