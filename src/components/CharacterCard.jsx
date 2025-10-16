export default function CharacterCard({ character, onDelete }) {
    const { name, imageUrl, films, tvShows, videoGames, parkAttractions } = character;
    const handleClick = () => {
        if (window.confirm(`Delete ${character.name}?`)) {
            onDelete(character._id);
            localStorage.removeItem(`customCharacter-${character.name.toLowerCase()}`)
        }
    };

    return (
        <div className="charCard w-80 h-80 flex flex-col items-center shadow hover:shadow-lg"
        key={character._id} 
        onClick={handleClick}
        >
          <h2 className="font-bold text-xl">{character.name}</h2>
          {imageUrl && 
            <img 
                src={imageUrl} 
                alt={name} width={150} 
                className="w-40 h-40 object-cover"
            />}

            <div className='w-full overflow-y-scroll'>
                {films?.length > 0 && (
                    <div className="charSection">
                        <h3>Films</h3>
                        <ul>
                            {films.map((film, idx) => (
                                <li key={idx}>{film}</li>
                            ))}
                        </ul>
                    </div>
                )}    

                {tvShows?.length > 0 && (
                    <div className="charSection">
                        <h3>TV</h3>
                        <ul>
                            {tvShows.map((show, idx) => (
                                <li key={idx}>{show}</li>
                            ))}
                        </ul>
                    </div>
                )} 

                {videoGames?.length > 0 && (
                    <div className="charSection">
                        <h3>Video Games</h3>
                        <ul>
                            {videoGames.map((game, idx) => (
                                <li key={idx}>{game}</li>
                            ))}
                        </ul>
                    </div>
                )} 

                {parkAttractions?.length > 0 && (
                    <div className="charSection">
                        <h3>Park Attractions</h3>
                        <ul>
                            {parkAttractions.map((pA, idx) => (
                                <li key={idx}>{pA}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )

}