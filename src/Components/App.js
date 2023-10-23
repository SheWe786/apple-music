import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar.js";
import Navbar from "./Navbar.js";
// import BrowsePage from "./BrowsePage.js";
// import MusicPlayerPage from './MusicPlayerPage';
// import SongList from './SongList.js';
// import SignIn from "./SignIn.js";

export default function App() {
  const [token, setToken] = useState(null);

  return (
    <div className="app-container">
      <Router>
        <Sidebar />
        <div className="main-content">
          <Navbar />
          {/* <Routes> */}
            {/* <Route path="/browse" element={<BrowsePage />} /> */}
            {/* <Route path="/music-player" element={<MusicPlayerPage />} /> */}
            {/* <Route path="/album" element={<SongList token={token} />} /> Pass token as prop */}
            {/* <Route path="/signin" element={<SignIn onSignIn={setToken} />} /> Pass setToken as prop */}
            {/* Add other routes as needed */}
          {/* </Routes> */}
        </div>
      </Router>
    </div>
  );
}




