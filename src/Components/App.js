import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar.js";
import Navbar from "./Navbar.js";
import BrowsePage from "./BrowsePage.js";
import MusicPlayerPage from "./MusicPlayerPage.js";
import SongList from "./SongList.js";
import SignIn from "./SignIn.js";
import ListenNow from "./ListenNow.js";
import AlbumGridPage from "./RandomAlbumGrid.js";
import FavoriteSongsList from "./FavoriteSongsList.js";
import RandomAlbumGrid from "./RandomAlbumGrid.js"; // Import the RandomAlbumGrid component

export default function App() {
  const [token, setToken] = useState(null);

  return (
    <div className="app-container">
      <Router>
        <Sidebar />
        <div className="main-content">
          <Navbar />
          <Routes>
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="/music-player" element={<MusicPlayerPage />} />
            <Route path="/album" element={<SongList token={token} />} />
            <Route path="/signin" element={<SignIn onSignIn={setToken} />} />
            <Route path="/ListenNow" element={<ListenNow />} />
            {/* Add a new route for "Playlist on the Pulse" */}
            <Route path="/random-albums" element={<RandomAlbumGrid />} />
            {/* Add a new route for AlbumFetcher with a section number */}
            <Route path="/favorites" element={<FavoriteSongsList />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}
