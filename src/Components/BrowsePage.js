import React, { useState, useEffect } from 'react';
import './BrowsePage.css';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 

function BrowsePage() {
  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    fetch('https://academics.newtonschool.co/api/v1/music/album?limit=100', {
      headers: {
        'projectId': 'f104bi07c490'
      }
    })
      .then(response => response.json())
      .then(res => {
        console.log('API Data:', res); 
        setAlbums(res.data);
      })
      .catch(error => console.error('Error fetching album data:', error));
  }, []);

  useEffect(() => {
    const albumTitles = document.querySelectorAll('.album-title');
    albumTitles.forEach(title => {
      if (title.scrollWidth > title.clientWidth) {
        title.classList.add('scrolling');
      }
    });
  }, [albums]);

  const handleAlbumClick = (album) => {
    console.log('Album clicked:', album);
    // When an album is clicked, navigate to the SongList component with album data
    navigate('/album', { state: { album } });
  };

  return (
    <div className='screen-container'>
      <h1>Browse Albums</h1>
      {albums && albums.length > 0 && (
        <Grid container spacing={2}>
          {albums.map((album) => (
            <Grid item key={album._id} xs={12} sm={6} md={4} lg={3}>
              <Card className="album-card custom-card" style={{ backgroundColor: '#1d1c1c', cursor: 'pointer' }} onClick={() => handleAlbumClick(album)}>
                <img
                  src={album.image}
                  alt={album.title}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
                <CardContent>
                  <div className="text-truncate">
                    <Typography variant="h5" component="div" className="album-title" style={{ color: 'white', fontSize: 'small' }}>
                      {album.title}
                    </Typography>
                  </div>
                  <div className="text-truncate">
                    <Typography variant="body2" color="textSecondary" className="song-title" style={{ color: 'white', fontSize: 'small' }}>
                      {album.artists[0].name}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}

export default BrowsePage;
