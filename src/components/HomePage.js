import React, { useState, useEffect } from "react";
import CharacterGrid from "./CharacterGrid";
import Copyright from "./Copyright";
import AIChatBubble from "./AIChatBubble";

function HomePage() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(
      "https://1ah3etfl1l.execute-api.eu-west-2.amazonaws.com/getCharacters",
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCharacters(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching characters:", error);
        setLoading(false);
      });
  }, []);

  const filteredCharacters = characters.filter((char) =>
    char.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="App">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="App">
      <h1 className="app-header">Sanrio Collection</h1>
      <input
        type="text"
        placeholder="Search characters..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <CharacterGrid characters={filteredCharacters} />
      <AIChatBubble />
      <footer className="disclaimer">
        <Copyright />
      </footer>
    </div>
  );
}

export default HomePage;
