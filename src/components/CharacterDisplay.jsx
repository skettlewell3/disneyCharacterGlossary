import CharacterCard from "./CharacterCard";

export default function CharacterDisplay({ characters, onDeleteCharacter}) {
  if (!characters || characters.length === 0) {
    return <div>No characters to display</div>
  }



  return (
    <div id="characterContainer" 
    className="bg-gray-700 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    >
      {characters.map((character) => (
        <CharacterCard 
          key={character._id}
          character={character} 
          onDelete={onDeleteCharacter}
        />
      ))}
    </div>
  );
}
