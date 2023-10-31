import React, { useState, useEffect } from "react";

const FavoriteSongsList = () => {
  const [favorites, setFavorites] = useState([]);
  // const [token, setToken] = useState('');

  // Function to fetch favorites based on the tokenconst
  // const tkn = localStorage.getItem("token");
  // setToken(tkn);

  useEffect(() => {
    // Define the function to fetch favorites based on the token

    const fetchFavorites = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          "https://academics.newtonschool.co/api/v1/music/favorites/like",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              projectID: "f104bi07c490",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("data", data);
          setFavorites(data.data); // Assuming the response is an array of favorite songs
        } else {
          console.error("Failed to fetch favorites");
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    // Call the fetchFavorites function when the component mounts
    fetchFavorites();
  }, []);

  const toggleFavorite = async (songId) => {};
  console.log("favi", favorites);
  return (
    <div>
      <h2>Liked Songs</h2>
      {favorites?.songs?.map((song) => (
        <div key={song.id}>
          <p>{song.title}</p>
          <button onClick={() => toggleFavorite(song.id)}>
            {song.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default FavoriteSongsList;
