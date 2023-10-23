import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, Card, CardContent, CardMedia, IconButton } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { PlayArrow, Pause, Favorite, FavoriteBorder } from '@mui/icons-material';
import { useMusicPlayer } from './MusicPlayerContext';
import FavoriteSongs from './FavoriteSongs';



function SongList() {
  const { state } = useLocation();
  const { album } = state;
  const { setCurrentSong } = useMusicPlayer(); 
  const [isPlaying, setIsPlaying] = useState(Array(album.songs.length).fill(false));
  const [artistNames, setArtistNames] = useState({});
  const [favorites, setFavorites] = useState([]); 
  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const [audioElements, setAudioElements] = useState(Array(album.songs.length).fill(null));

  const togglePlay = (index) => {
    setIsPlaying((prevIsPlaying) => {
      const newIsPlaying = [...prevIsPlaying];
      newIsPlaying[index] = !newIsPlaying[index];
      setCurrentSong(album.songs[index]);


      // Pause all other audio elements when a new one starts playing
      audioElements.forEach((audio, i) => {
        if (i !== index && audio) {
          audio.pause();
        }
      });

      if (newIsPlaying[index]) {
        audioElements[index].play();
      } else {
        audioElements[index].pause();
      }

      return newIsPlaying;
    });
  };

  const toggleFavorite = async (song) => {
    await fetch('https://academics.newtonschool.co/api/v1/music/favorites/like', {
      method: 'PATCH',
      headers: { 
        'Authorization': `Bearer ${token}`, // Use token in your fetch call
        'projectID': 'f104bi07c490',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "songId": song.id })
    });
    // Refresh favorites
    fetch('https://academics.newtonschool.co/api/v1/music/album?limit=100', {
      headers: {
        'projectId': 'f104bi07c490'
      }
    })
    .then(response => response.json())
    .then(res => setFavorites(res.data)) // Use setFavorites here
    .catch(error => console.error('Error fetching album data:', error));
  };
  
  const fetchArtistNames = async () => {
    const artistIds = album.songs.reduce((ids, song) => [...ids, ...song.artist], []);
    const uniqueArtistIds = [...new Set(artistIds)];

    const names = {};
    await Promise.all(
      uniqueArtistIds.map(async (artistId) => {
        const response = await fetch(`YOUR_ARTIST_API_ENDPOINT/${artistId}`);
        const data = await response.json();
        names[artistId] = data.name;
      })
    );

    setArtistNames(names);
  };

  useEffect(() => {
    if (album) {
      fetchArtistNames();
    }
  }, [album]);

  if (!album) {
    return null;
  }

  return (
    <div style={{ marginTop: '53px', padding: '20px' }}>
      <Card style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', backgroundColor: '#1d1c1c' }}>
        <CardMedia
          component="img"
          height="200"
          alt={album.title}
          src={album.image}
          style={{ objectFit: 'contain', maxWidth: '200px' }}
        />
        <CardContent>
          <Typography variant="h5" gutterBottom style={{ color: 'white' }}>
            {album.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" style={{ color: 'white' }}>
            Description: {album.description}
          </Typography>
          <Typography variant="body2" color="textSecondary" style={{ color: 'white' }}>
            Artists: {album.artists.map((artist) => artist.name).join(', ')}
          </Typography>
          <Typography variant="body2" color="textSecondary" style={{ color: 'white' }}>
            Release Date: {new Date(album.release).toLocaleDateString()}
          </Typography>
        </CardContent>
      </Card>

      <Typography variant="h5" gutterBottom>
        Songs in {album.title}
      </Typography>
      <Card style={{ backgroundColor: '#1d1c1c' }}>
        <List>
          {album.songs.map((song, index) => (
            <ListItem
              key={song._id}
              style={{ paddingBottom: '10px', paddingTop: '10px', backgroundColor: index % 2 === 0 ? '#1d1c1c' : '#232525' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', color: 'white' }}>
                <span>{song.title}</span>
                <span>{`Artist(s): ${song.artist.map((artistId) => artistNames[artistId]).join(', ')}`}</span>
                <span>{`Mood: ${song.mood}`}</span>
              </div>
              <IconButton onClick={() => togglePlay(index)}>
                {isPlaying[index] ? <Pause /> : <PlayArrow />}
              </IconButton>
              <IconButton onClick={() => toggleFavorite(song)}>
                {favoriteSongs.includes(song) ? <Favorite style={{ color: 'red' }} /> : <FavoriteBorder />}
              </IconButton>
              <audio
                ref={(audio) => (audioElements[index] = audio)}
                src={song.audio_url}
                preload="auto"
              ></audio>
            </ListItem>
          ))}
        </List>
      </Card>
      <FavoriteSongs favoriteSongs={favoriteSongs} toggleFavorite={toggleFavorite} />
    </div>
  );
}

export default SongList;
