import React from 'react';

function CharacterCard({character}){
    return (
        <div className='character-card'>
            <img src={character.image} alt={character.name}/>
            <h1>{character.name}</h1> 
            <p>Japanese name: {character.japaneseName}</p> 
            <p>Birthday: {character.birthday}</p> 
            <p>Debut: {character.debut}</p> 
            <p>Species: {character.species}</p> 
            <p>Personality: {character.personality}</p> 
        </div>
    )
}

export default CharacterCard;