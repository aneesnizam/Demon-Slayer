import React, { useEffect, useState } from "react";

// A self-contained component for the loading spinner
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-full pt-20">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500"></div>
  </div>
);

export default function Demons() {
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Manages the loading state

  // Load character data on initial component render
  useEffect(() => {
    setIsLoading(true); 
    fetch("/characters.json")
      .then((res) => res.json())
      .then((data) => {
        // Filter for characters whose race includes "demon"
        const results = data.filter((char) =>
          char.race && char.race.toLowerCase().includes("demon")
        );
        setFilteredCharacters(results);
        setIsLoading(false); // Data is ready, stop loading
      })
      .catch((err) => {
        console.error("Failed to fetch character data:", err);
        setIsLoading(false); // Stop loading even if there's an error
      });
  }, []); 

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden font-serif px-4 sm:px-8 pt-24 md:pt-32">
      {/* Background blobs with a more thematic color scheme */}
      <div className="absolute top-0 -left-1/4 w-full h-full bg-red-900 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 -right-1/4 w-full h-full bg-purple-900 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Main Title with a glowing drop shadow */}
      <h1 className="text-5xl md:text-6xl text-center font-bold pb-3 mb-14 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-400 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">
        Demons
      </h1>

      {/* Main content container */}
      <div className="w-full max-w-7xl mx-auto mb-20">
        {isLoading ? (
          // If loading, show the spinner
          <LoadingSpinner />
        ) : (
          // Otherwise, show the grid of character cards
          // The `perspective` class enables the 3D hover effect for child elements
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 [perspective:1000px]">
            {filteredCharacters.map((char, index) => (
              <div
                key={char.id}
                // Classes for styling, animation, and 3D hover effect
                className="group relative bg-gradient-to-br from-red-500/10 via-purple-500/10 to-slate-900/20 backdrop-blur-md rounded-2xl border border-red-500/20 p-5 shadow-xl transition-all duration-500 hover:shadow-red-500/10 animate-fade-in-up "
                // Inline style to create a staggered animation delay for each card
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'backwards' }}
              >
                {/* Glow effect that appears on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Character image container */}
                <div className="relative h-60 mb-4 rounded-xl">
                  <div className="absolute  inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10 opacity-80"></div>
                  <img
                    src={char.img}
                    alt={char.name}
                    className="relative w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 group-hover:z-50"
                  />
                  <div className="absolute bottom-3 left-4 z-20">
                    <h3 className="text-xl font-bold text-white drop-shadow-md">
                      {char.name}
                    </h3>
                  </div>
                </div>

                {/* Character details section */}
                <div className="space-y-3 relative z-20">
                  <div className="flex items-center text-sm">
                    <span className="w-20 text-red-300 font-medium">Age:</span>
                    <span className="text-gray-200">{char.age} yrs</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="w-20 text-red-300 font-medium">Gender:</span>
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
        )}
      </div>

      {/* CSS for the custom keyframe animation, scoped to this component */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}