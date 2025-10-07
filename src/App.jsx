import { useState, useEffect, useCallback } from 'react'
import CharacterDisplay from './components/CharacterDisplay'
import CharForm from './components/CharForm'
import CharacterToolbar from './components/CharacterToolbar'
import './App.css'

function App() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCharacters, setFilteredCharacters] = useState(characters);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://api.disneyapi.dev/character?page=${page}`);
        const data = await res.json();
        setCharacters(data.data);
        setTotalPages(data.info.totalPages)
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };
    fetchData();
  }, [page]);

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    const lowerQuery = query.toLowerCase();
    setFilteredCharacters(
      characters.filter(char => 
        char.name.toLowerCase().includes(lowerQuery) ||
        char.films?.some(f => f.toLowerCase().includes(lowerQuery)) ||
        char.tvShows?.some(tv => tv.toLowerCase().includes(lowerQuery)) ||
        char.parkAttractions?.some(pA => pA.toLowerCase().includes(lowerQuery))
      )
    )
  }, [characters]);

  useEffect(() => {
    handleSearch(searchQuery);
  }, [handleSearch, searchQuery]);

  const handleAddCharacter = (newCharacter) => {
    setCharacters((prev) => [newCharacter, ...prev]);
    handleSearch(searchQuery);
  };

  const handleDeleteCharacter = (id) => {
    setCharacters((prev) => prev.filter((char) => char._id !== id));
    handleSearch(searchQuery);
  };

  const handleNextPage = () => setPage((p) => p + 1);
  const handlePrevPage = () => setPage((p) => Math.max(p - 1, 1));

  const sortByIdAsc = () => {
    setCharacters((prev) => 
    [...prev].sort((a, b) => (a._id > b._id ? 1 : -1))
    );
  };

  const sortByIdDesc = () => {
    setCharacters((prev) => 
    [...prev].sort((a, b) => (a._id < b._id ? 1 : -1))
    );
  };

  const sortByABC = () => {
    setCharacters((prev) => 
    [...prev].sort((a, b) => a.name.localeCompare(b.name))
    );
  };

  const sortByZYX = () => {
    setCharacters((prev) => 
    [...prev].sort((a, b) => b.name.localeCompare(a.name))
    );
  };

  return (
    <>
      <CharForm onAddCharacter={handleAddCharacter} />
      <CharacterToolbar 
        onNext={handleNextPage}
        onPrev={handlePrevPage}
        page={page}
        totalPages={totalPages}
        onSortIdAsc={sortByIdAsc}
        onSortIdDesc={sortByIdDesc}
        onSortABC={sortByABC}
        onSortZYX={sortByZYX}
        onSearch={handleSearch}
        searchQuery={searchQuery}
      />
      <CharacterDisplay 
      characters={filteredCharacters}
      onDeleteCharacter={handleDeleteCharacter}
      />
    </>
  );
}

export default App
