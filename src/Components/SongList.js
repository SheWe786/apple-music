import React, { useState, useEffect } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  CardMedia,
  IconButton,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import {
  PlayArrow,
  Pause,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";
import { useMusicPlayer } from "./MusicPlayerContext";
import FavoriteSongs from "./FavoriteSongs";
import "./SongList.css";
import { addSongToFavorites, removeSongFromFavorites } from "./authenticate";

function SongList() {
  const { state } = useLocation();
  const album = state && state.album;
  const { setCurrentSong } = useMusicPlayer();
  const [isPlaying, setIsPlaying] = useState(
    Array(album.songs.length).fill(false)
  );
  const [artistNames, setArtistNames] = useState({});
  const [isfavorites, setIsFavorites] = useState(false);
  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const [audioElements, setAudioElements] = useState(
    Array(album.songs.length).fill(null)
  );

  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Function to toggle play/pause for a song
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
  console.log("songlis ", favoriteSongs);
  // Function to toggle favorite status for a song
  const toggleFavorite = async (songId) => {
    try {
      if (favoriteSongs.includes(songId)) {
        await removeSongFromFavorites("/music/favorites/like", songId);
        setIsFavorites(false);
      } else {
        await addSongToFavorites("/music/favorites/like", songId);
        setIsFavorites(true);
      }

      setFavoriteSongs((prevLikedSongs) =>
        prevLikedSongs.includes(songId)
          ? prevLikedSongs.filter((id) => id !== songId)
          : [...prevLikedSongs, songId]
      );
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };
  // Function to fetch artist names and store them in the artistNames state
  const fetchArtistNames = async () => {
    const artistIds = album.songs.reduce(
      (ids, song) => [...ids, ...song.artist],
      []
    );
    const uniqueArtistIds = [...new Set(artistIds)];
    const names = {};

    await Promise.all(
      uniqueArtistIds.map(async (artistId) => {
        const response = await fetch(
          `https://academics.newtonschool.co/api/v1/music/artist/${artistId}`,
          {
            headers: {
              projectId: "f104bi07c490",
            },
          }
        );
        const res = await response.json();
        names[artistId] = res.data.name;
      })
    );

    // Update the artistNames state with the fetched artist names
    setArtistNames(names);
  };

  // Use the useEffect hook to fetch artist names when the album changes
  useEffect(() => {
    if (album) {
      fetchArtistNames();
    }
  }, [album]);

  if (!album) {
    return null;
  }

  return (
    <div style={{ marginTop: "53px", padding: "20px" }}>
      <Card
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "20px",
          backgroundColor: "#1d1c1c",
        }}
      >
        <CardMedia
          component="img"
          height="200"
          alt={album.title}
          src={album.image}
          style={{ objectFit: "contain", maxWidth: "200px" }}
        />
        <CardContent>
          <Typography variant="h5" gutterBottom style={{ color: "white" }}>
            {album.title}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            style={{ color: "white" }}
          >
            Description: {album.description}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            style={{ color: "white" }}
          >
            Artists: {album.artists.map((artist) => artist.name).join(", ")}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            style={{ color: "white" }}
          >
            Release Date: {new Date(album.release).toLocaleDateString()}
          </Typography>
        </CardContent>
      </Card>

      <Typography variant="h5" gutterBottom>
        Songs in {album.title}
      </Typography>
      {album.songs && album.songs.length > 0 && (
        <TableContainer component={Card} style={{ backgroundColor: "#1d1c1c" }}>
          <Table className="table">
            <TableHead>
              <TableRow>
                <TableCell style={{ color: "white" }}>Song</TableCell>
                <TableCell style={{ color: "white" }}>Artist Names</TableCell>
                <TableCell style={{ color: "white" }}>Album Name</TableCell>
                <TableCell style={{ color: "white" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {album.songs.map((song, index) => (
                <TableRow
                  key={song._id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#1d1c1c" : "#232525",
                  }}
                  className="table-row"
                >
                  <TableCell className="table-cell">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={song.thumbnail}
                        alt={song.title}
                        style={{
                          width: "40px",
                          height: "40px",
                          marginRight: "10px",
                        }}
                      />
                      <div style={{ color: "white" }}>{song.title}</div>
                    </div>
                  </TableCell>
                  <TableCell style={{ color: "white" }}>
                    {song.artist
                      .map((artistId) => artistNames[artistId])
                      .join(", ")}
                  </TableCell>
                  <TableCell style={{ color: "white" }}>
                    {album.title}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => togglePlay(index)}>
                      {isPlaying[index] ? <Pause /> : <PlayArrow />}
                    </IconButton>
                    <IconButton onClick={() => toggleFavorite(song)}>
                      {favoriteSongs.includes(song) ? (
                        <Favorite style={{ color: "red" }} />
                      ) : (
                        <FavoriteBorder />
                      )}
                    </IconButton>
                    <audio
                      ref={(audio) => (audioElements[index] = audio)}
                      src={song.audio_url}
                      preload="auto"
                    ></audio>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default SongList;
