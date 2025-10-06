import React, { useState, useEffect } from 'react';
import CharacterDetailPage from './CharacterDetailPage';

export default function CharacterSearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null); 

  // Load character data on initial render
  useEffect(() => {
    setIsLoading(true);
    fetch("/characters.json")
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  // Search functionality with debounce
  useEffect(() => {
    if (!characters.length) return;
    
    const intervalObj = setTimeout(() => {
      if (searchTerm) {
        const results = characters.filter((char) =>
          char.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCharacters(results);
      } else {
        setFilteredCharacters([]);
      }
    }, 300);

    return () => clearTimeout(intervalObj);
  }, [searchTerm, characters]);


  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
  };

  // <-- 4. ADD a handler to go back to the search list
  const handleBackToSearch = () => {
    setSelectedCharacter(null);
  };

    if (selectedCharacter) {
    return <CharacterDetailPage character={selectedCharacter} onBack={handleBackToSearch} />;
  }

  return (
    <div className=" relative min-h-screen bg-black text-white overflow-hidden font-serif">
       {/* Decorative background glows for a stylish, modern look */}
      <div className="absolute top-0 -left-1/4 w-full h-full bg-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 -right-1/4 w-full h-full bg-purple-700 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Animated background elements */}
      <div className="fixed inset-0 z-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-soft-light filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-emerald-500 rounded-full mix-blend-soft-light filter blur-3xl animate-pulse-slow delay-1000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center w-full min-h-screen p-4 sm:p-8">
        
        {/* Header */}
        <div className="text-center mt-16 mb-10 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-green-500">
            Demon Slayer Characters
          </h1>
          <h2 className="text-lg md:text-xl font-light text-gray-300 tracking-wider">
            Discover your favorite characters
          </h2>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-2xl mb-16 relative animate-fade-in-up">
          <div className="relative">
            <input 
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 text-lg text-white bg-gray-900/60 backdrop-blur-md border border-emerald-500/30 rounded-2xl focus:ring-2 focus:ring-emerald-400 focus:outline-none transition-all duration-300 shadow-lg"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <svg 
                className={`w-6 h-6 text-emerald-400 transition-opacity duration-300 ${searchTerm ? 'opacity-100' : 'opacity-50'}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        )}

        {/* Character Cards Grid */}
        <div className="w-full max-w-7xl mb-20">
          {filteredCharacters.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCharacters.map((char) => (
                <div onClick={() => handleCharacterClick(char)}
                  key={char.id}
                  className="group relative bg-gradient-to-br from-emerald-400/10 via-cyan-400/10 to-purple-500/10 backdrop-blur-md rounded-2xl border border-emerald-500/20 p-5 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Character image */}
                  <div className="relative h-60 mb-4 rounded-xl overflow">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10 opacity-80"></div>
                    <img
                      src={char.img}
                      alt={char.name}
                      className="relative w-full h-full object-contain transition-transform duration-700 group-hover:scale-130 group-hover:z-50"
                    />
                    <div className="absolute bottom-3 left-4 z-20">
                      <h3 className="text-xl font-bold text-white drop-shadow-md">{char.name}</h3>
                    </div>
                  </div>

                  {/* Character details */}
                  <div className="space-y-3 relative z-20">
                    <div className="flex items-center text-sm">
                      <span className="w-20 text-emerald-300 font-medium">Age:</span>
                      <span className="text-gray-200">{char.age} yrs</span>
                    </div>
                    
                    <div className="flex items-center text-sm">
                      <span className="w-20 text-emerald-300 font-medium">Gender:</span>
                      <span className="text-gray-200">{char.gender}</span>
                    </div>

                    {char.affiliation && (
                      <div className="flex items-center text-sm">
                        <span className="w-20 text-cyan-300 font-medium">Affiliation:</span>
                        <span className="text-gray-200">{char.affiliation.name}</span>
                      </div>
                    )}

                    {char.first_arc_appearance && (
                      <div className="flex items-center text-sm">
                        <span className="w-20 text-purple-300 font-medium">First Arc:</span>
                        <span className="text-gray-200">{char.first_arc_appearance.name}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : searchTerm && !isLoading ? (
            <div className="text-center py-20 animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800/50 mb-4">
                <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <p className="text-xl text-gray-400">No characters found</p>
              <p className="text-gray-500 mt-2">Try a different search term</p>
            </div>
          ) : (
            !isLoading && (
              <div className="text-center py-20 animate-fade-in">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800/50 mb-4">
                  <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <p className="text-xl text-gray-400">Search for characters</p>
                <p className="text-gray-500 mt-2">Enter a name in the search bar above</p>
              </div>
            )
          )}
        </div>
      </div>

      {/* Add custom animations to Tailwind */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}