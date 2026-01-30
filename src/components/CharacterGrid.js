import React from 'react';
import CharacterCard from './CharacterCard';

function CharacterGrid({characters}){
    return(
        <div className='character-grid'>
            {characters.map(character => (
                <CharacterCard key={character.id} character={character}/>
            ))}
        </div>
    );
};

export default CharacterGrid;