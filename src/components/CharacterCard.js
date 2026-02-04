import React from "react";
import { useNavigate } from "react-router-dom";

function CharacterCard({ character }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/characters/${character.id}`);
  };
  return (
    <div className="character-card" onClick={handleClick}>
      <img src={character.image} alt={character.name} />
      <h1>{character.name}</h1>
    </div>
  );
}

export default CharacterCard;
