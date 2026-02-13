import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Copyright from "./Copyright";

const CharacterDetails = () => {
  const { id } = useParams();

  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://1ah3etfl1l.execute-api.eu-west-2.amazonaws.com/getCharacters",
    )
      .then((response) => response.json())
      .then((data) => {
        const found = data.find((c) => c.id === Number(id));
        setCharacter(found);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching characters:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!character) {
    return <div>Character not found.</div>;
  }

  return (
    <div>
      <div className="character-details">
        <img src={character.image} alt={character.name} />
        <h1>{character.name}</h1>
        <p>Japanese name: {character.japaneseName}</p>
        <p>Birthday: {character.birthday}</p>
        <p>Debut: {character.debut}</p>
        <p>Species: {character.species}</p>
        <p>Personality: {character.personality}</p>
      </div>

      <footer className="disclaimer">
        <Copyright />
      </footer>
    </div>
  );
};

export default CharacterDetails;
