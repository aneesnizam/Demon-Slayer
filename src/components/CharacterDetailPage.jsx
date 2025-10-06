import React from 'react';

// A simple SVG icon for the back button
const BackArrowIcon = () => (
  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
  </svg>
);

export default function CharacterDetailPage({ character, onBack }) {
  if (!character) return null; // Don't render if no character is selected

  return (
    <div className="relative min-h-screen bg-black text-white font-serif py-24 px-4 sm:px-8 animate-fade-in">
      {/* Back Button */}
      <button 
        onClick={onBack} 
        className="absolute top-20 left-8 z-30 flex items-center px-4 py-2 bg-gray-800/50 backdrop-blur-md border border-emerald-500/30 rounded-lg hover:bg-emerald-500/20 transition-colors duration-300"
      >
        <BackArrowIcon />
        Back to Search
      </button>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto pt-24">
        {/* === HEADER SECTION === */}
        <header className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-12">
          {/* Character Image */}
          <div className="md:col-span-1 flex justify-center">
            <div className="relative w-64 h-64">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-purple-600 rounded-full filter blur-2xl opacity-50"></div>
              <img
                src={character.img}
                alt={character.name}
                className="relative w-full h-full object-contain rounded-full drop-shadow-2xl"
              />
            </div>
          </div>
          {/* Name, Race, and Quote */}
          <div className="md:col-span-2 text-center md:text-left">
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-green-500 mb-2">
              {character.name}
            </h1>
            <p className="text-2xl text-cyan-300 font-medium mb-6">{character.race}</p>
            <blockquote className="text-lg italic text-gray-300 border-l-4 border-emerald-500 pl-4">
              "{character.quote}"
            </blockquote>
          </div>
        </header>

        {/* === DETAILS GRID === */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Description & Core Info */}
          <div className="bg-gray-900/40 backdrop-blur-md border border-gray-700/50 p-6 rounded-2xl space-y-4">
            <h2 className="text-2xl font-semibold text-emerald-300 border-b-2 border-emerald-500/30 pb-2">Profile</h2>
            <p className="text-gray-200 leading-relaxed">{character.description}</p>
            <div className="flex justify-around pt-4">
              <div className="text-center">
                <span className="block text-sm text-gray-400">Age</span>
                <span className="text-xl font-bold">{character.age}</span>
              </div>
              <div className="text-center">
                <span className="block text-sm text-gray-400">Gender</span>
                <span className="text-xl font-bold">{character.gender}</span>
              </div>
            </div>
          </div>
          
          {/* Affiliation & First Appearance */}
          <div className="space-y-8">
            {character.affiliation && (
              <div className="bg-gray-900/40 backdrop-blur-md border border-gray-700/50 p-6 rounded-2xl">
                <h3 className="text-xl font-semibold text-cyan-300 mb-2">Affiliation: {character.affiliation.name}</h3>
                <p className="text-gray-300">{character.affiliation.description}</p>
              </div>
            )}
            {character.first_arc_appearance && (
              <div className="bg-gray-900/40 backdrop-blur-md border border-gray-700/50 p-6 rounded-2xl">
                <h3 className="text-xl font-semibold text-purple-300 mb-2">First Arc: {character.first_arc_appearance.name}</h3>
                <p className="text-gray-300">{character.first_arc_appearance.description}</p>
              </div>
            )}
          </div>
        </div>

        {/* === COMBAT STYLES SECTION === */}
        {character.combat_style && character.combat_style.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-center mb-8 text-emerald-400">Combat Styles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {character.combat_style.map((style) => (
                <div key={style.id} className="flex items-center bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50 transition-all duration-300 hover:border-emerald-500/50 hover:shadow-lg">
                  <img src={style.img} alt={style.name} className="w-24 h-24 rounded-lg mr-4 object-cover" />
                  <div>
                    <h4 className="text-lg font-semibold text-white">{style.name}</h4>
                    <p className="text-sm text-gray-400">{style.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}