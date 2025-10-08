import { useState, useEffect, useCallback } from 'react'
import CharacterDisplay from './components/CharacterDisplay'
import CharForm from './components/CharForm'
import CharacterToolbar from './components/CharacterToolbar'
import './App.css'

function App() {
  const [characters, setCharacters] = useState([]);
  const [displayCharacters, setDisplayCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchMode, setSearchMode] = useState("local"); //local or main

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://api.disneyapi.dev/character?page=${page}`);
        const data = await res.json();
        setCharacters(data.data);
        setTotalPages(data.info.totalPages)
        if (searchMode === "local") setDisplayCharacters(data.data)
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };
    fetchData();
  }, [page, searchMode]);

  const handleSearch = useCallback(async (query) => {
    setSearchQuery(query);

    if (searchMode === "local") {
      const lowerQuery = query.toLowerCase();
      setDisplayCharacters(
        characters.filter(char => 
          char.name.toLowerCase().includes(lowerQuery) ||
          char.films?.some(f => f.toLowerCase().includes(lowerQuery)) ||
          char.tvShows?.some(tv => tv.toLowerCase().includes(lowerQuery)) ||
          char.parkAttractions?.some(pA => pA.toLowerCase().includes(lowerQuery))
        )
      );
    } else if (searchMode === "name") {
      if (!query) {
        setDisplayCharacters([]);
        return;
      }
      try {
        const res = await fetch(`https://api.disneyapi.dev/character?name=${query}`);
        const data = await res.json();
        setDisplayCharacters(data.data || []);
      } catch (err) {
        console.log("API name search failed", err);
        setDisplayCharacters([]);
      }
    }
  }, [characters, searchMode]);


  const handleSearchMode = (mode) => {
    setSearchMode(mode);
    setSearchQuery("");
    setDisplayCharacters(mode === "local" ? characters : []);
  }

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
    setDisplayCharacters((prev) => 
    [...prev].sort((a, b) => (a._id > b._id ? 1 : -1))
    );
  };

  const sortByIdDesc = () => {
    setDisplayCharacters((prev) => 
    [...prev].sort((a, b) => (a._id < b._id ? 1 : -1))
    );
  };

  const sortByABC = () => {
    setDisplayCharacters((prev) => 
    [...prev].sort((a, b) => a.name.localeCompare(b.name))
    );
  };

  const sortByZYX = () => {
    setDisplayCharacters((prev) => 
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
        searchMode={searchMode}
        onSearchChange={handleSearchMode}
      />
      <CharacterDisplay 
      characters={displayCharacters}
      onDeleteCharacter={handleDeleteCharacter}
      />
    </>
  );
}

export default App
