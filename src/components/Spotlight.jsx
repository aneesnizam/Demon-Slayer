import React, { useState, useEffect, useCallback, memo } from 'react';

// --- Data Constants ---
// It's good practice to keep static data separate from component logic.
const CHARACTERS = [
  {
    id: 1,
    name: 'Tanjiro Kamado',
    image: 'https://i.pinimg.com/736x/fe/62/87/fe6287bea63991c80199cdcc9c65d2e4.jpg',
    element: 'Water & Sun',
    rank: 'Mizunoto'
  },
  {
    id: 2,
    name: 'Nezuko Kamado',
    image: 'https://i.pinimg.com/736x/b4/35/49/b43549d255e24bac02ec72053dae5d4d.jpg',
    element: 'Blood Demon Art',
    rank: 'Demon'
  },
  {
    id: 3,
    name: 'Zenitsu Agatsuma',
    image: 'https://i.pinimg.com/736x/66/ee/a4/66eea410b7f5db037a6236fb29c91a69.jpg',
    element: 'Thunder',
    rank: 'Mizunoto'
  },
  {
    id: 4,
    name: 'Inosuke Hashibira',
    image: 'https://i.pinimg.com/736x/ed/bc/1c/edbc1c70e6c97bd1c96dbda6e572170c.jpg',
    element: 'Beast',
    rank: 'Mizunoto'
  }
];

const BLOB_THEMES = [
  { from: "bg-red-500", to: "bg-red-700" },       // Tanjiro
  { from: "bg-pink-400", to: "bg-pink-600" },     // Nezuko
  { from: "bg-yellow-300", to: "bg-yellow-500" }, // Zenitsu
  { from: "bg-blue-400", to: "bg-blue-600" }      // Inosuke
];


// --- Reusable Child Components ---

/**
 * Memoized Character Card Component
 * Displays a single character's information and image. Wrapped in React.memo
 * for performance, preventing re-renders unless its props change.
 */
const CharacterCard = memo(({ character, isActive }) => {
  return (
    <div className={`relative w-64 h-80 rounded-2xl overflow-hidden border-2 transition-all duration-500 ${
      isActive
        ? 'border-white/50 shadow-2xl shadow-cyan-500/30' // Style for the active (center) card
        : 'border-white/20 shadow-lg'                     // Style for inactive cards
    }`}>
      <img
        src={character.image}
        alt={character.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="relative h-full flex flex-col justify-end p-5">
        <h3 className="text-2xl font-bold text-white mb-2">{character.name}</h3>
        <div className="flex items-center justify-between text-xs">
          <span className="bg-white/10 backdrop-blur-sm text-white px-3 py-1 rounded-full">
            {character.element}
          </span>
          <span className={`px-3 py-1 rounded-full font-medium ${
            character.rank === 'Demon'
              ? 'bg-red-500/20 text-red-300'
              : 'bg-cyan-500/20 text-cyan-300'
          }`}>
            {character.rank}
          </span>
        </div>
      </div>
    </div>
  );
});

/**
 * Decorative Background Glows Component
 * Renders two animated blobs that change color based on the current character.
 */
const BackgroundGlows = ({ theme }) => (
  <>
    <div
      className={`absolute top-0 -left-1/4 w-full h-full rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob transition-colors duration-1000 ${theme.from}`}
    />
    <div
      className={`absolute bottom-0 -right-1/4 w-full h-full rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-4000 transition-colors duration-1000 ${theme.to}`}
    />
  </>
);

/**
 * Header Component
 * Displays the main title, subtitle, and synopsis for the page.
 */
const SpotlightHeader = () => (
  <div className="w-full max-w-6xl mx-auto text-center">
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-green-500">
      Demon Slayer
    </h1>
    <h2 className="text-xl md:text-xl font-light text-gray-300 mb-8 tracking-wider">
      Kimetsu no Yaiba
    </h2>
    <p className="max-w-3xl mx-auto text-base md:text-md text-gray-200 leading-relaxed mb-2">
      In a world plagued by demons, a young boy's life is shattered. Witness the tale of Tanjiro Kamado, who embarks on a perilous journey to become a Demon Slayer and avenge his family, all while protecting the one person he has left—his sister, Nezuko.
    </p>
  </div>
);

/**
 * Reusable Arrow Button Component for Carousel Navigation
 */
const ArrowButton = ({ direction, onClick }) => {
  const isLeft = direction === 'left';
  const pathData = isLeft ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7";
  const positionClass = isLeft ? "left-0 sm:left-4" : "right-0 sm:right-4";
  const label = isLeft ? "Previous Character" : "Next Character";

  return (
    <button
      onClick={onClick}
      className={`absolute ${positionClass} top-1/2 -translate-y-1/2 z-40 bg-black/40 hover:bg-black/70 p-3 rounded-full transition-all duration-300 hover:scale-110`}
      aria-label={label}
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={pathData} />
      </svg>
    </button>
  );
};


// --- Main Spotlight Component ---
// This component manages the state and orchestrates the child components.
export default function Spotlight() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  // Effect for handling the automatic rotation of the carousel
  useEffect(() => {
    if (!isAutoRotating) return;
    const rotationInterval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % CHARACTERS.length);
    }, 3000);
    return () => clearInterval(rotationInterval);
  }, [isAutoRotating]);

  // --- Memoized Event Handlers ---
  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % CHARACTERS.length);
    setIsAutoRotating(false); // Stop auto-rotation on user interaction
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + CHARACTERS.length) % CHARACTERS.length);
    setIsAutoRotating(false);
  }, []);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index);
    setIsAutoRotating(false);
  }, []);

  // --- Card Style Calculation ---
  // Memoized function to calculate CSS classes for each card based on its
  // position relative to the current active card.
  const getCardStyle = useCallback((index) => {
    const offset = (index - currentIndex + CHARACTERS.length) % CHARACTERS.length;
    switch (offset) {
      case 0: // Center card
        return 'scale-110 z-30 opacity-100 translate-x-0';
      case 1: // Card to the right
        return 'scale-95 z-20 opacity-70 translate-x-40 sm:translate-x-64';
      case CHARACTERS.length - 1: // Card to the left
        return 'scale-95 z-20 opacity-70 -translate-x-40 sm:-translate-x-64';
      default: // Other hidden cards
        return 'scale-75 z-10 opacity-0 translate-x-0';
    }
  }, [currentIndex]);
  
  return (
    <div className="pt-18 relative min-h-screen bg-black text-white overflow-hidden font-serif">
      <BackgroundGlows theme={BLOB_THEMES[currentIndex]} />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 sm:p-8">
        <SpotlightHeader />

        {/* --- Carousel Section --- */}
        <div
          className="relative w-full max-w-6xl h-96 flex items-center justify-center mt-8"
          onMouseEnter={() => setIsAutoRotating(false)} // Pause rotation on hover
          onMouseLeave={() => setIsAutoRotating(true)}  // Resume rotation on leave
        >
          <ArrowButton direction="left" onClick={handlePrev} />

          {/* This container holds all the character cards */}
          <div className="relative h-full w-full flex items-center justify-center">
            {CHARACTERS.map((character, index) => (
              <div
                key={character.id}
                className={`absolute transition-all duration-500 ease-out cursor-pointer ${getCardStyle(index)}`}
                onClick={() => goToSlide(index)}
              >
                <CharacterCard character={character} isActive={index === currentIndex} />
              </div>
            ))}
          </div>

          <ArrowButton direction="right" onClick={handleNext} />
        </div>
      </div>
    </div>
  );
}
