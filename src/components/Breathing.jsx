import React, { useState } from 'react';

const Breathing = () => {
  // State to manage which style is selected to be shown in the modal
  const [selectedStyle, setSelectedStyle] = useState(null);

  const breathingStyles = [
    {
      name: "Sun Breathing",
      japanese: "ヒノカミ神楽",
      derivation: "Original",
      description: "The original and strongest breathing style, created by Yoriichi Tsugikuni. Focuses on total body movement, flame-like attacks, and extreme adaptability.",
      users: ["Yoriichi Tsugikuni", "Tanjiro Kamado"],
      color: "linear-gradient(135deg, #ff8c00, #ff0000, #ff8c00)",
      icon: "🌞",
      techniques: ["Dragon Sun Halo Head Dance", "Burning Bones, Summer Sun", "Sunflower Thrust"]
    },
    {
      name: "Water Breathing",
      japanese: "水の呼吸",
      derivation: "Sun Breathing",
      description: "Focuses on fluid, adaptable swordplay like flowing water. Balanced offense and defense.",
      users: ["Giyu Tomioka", "Tanjiro Kamado"],
      color: "linear-gradient(135deg, #00b4db, #0083b0, #00b4db)",
      icon: "🌊",
      techniques: ["Surface Slash", "Water Wheel", "Striking Tide"]
    },
    {
      name: "Flame Breathing",
      japanese: "炎の呼吸",
      derivation: "Sun Breathing",
      description: "Explosive, fiery attacks with immense power. Focuses on burning through opponents with aggressive strikes.",
      users: ["Kyojuro Rengoku"],
      color: "linear-gradient(135deg, #ff416c, #ff4b2b, #ff416c)",
      icon: "🔥",
      techniques: ["Unknowing Fire", "Rising Scorching Sun", "Flame Tiger"]
    },
    {
      name: "Thunder Breathing",
      japanese: "雷の呼吸",
      derivation: "Sun Breathing",
      description: "Based on speed and precision, mimicking lightning strikes. Famous move: Thunderclap and Flash.",
      users: ["Zenitsu Agatsuma", "Jigoro Kuwajima"],
      color: "linear-gradient(135deg, #9d50bb, #6e48aa, #9d50bb)",
      icon: "⚡",
      techniques: ["Thunderclap and Flash", "Rice Spirit", "Heat Lightning"]
    },
    {
      name: "Wind Breathing",
      japanese: "風の呼吸",
      derivation: "Sun Breathing",
      description: "Wild, unpredictable slashes like raging windstorms. Extremely offensive and fast-paced.",
      users: ["Sanemi Shinazugawa"],
      color: "linear-gradient(135deg, #a8ff78, #78ffd6, #a8ff78)",
      icon: "🍃",
      techniques: ["Dust Whirlwind Cutter", "Claws-Purifying Wind", "Cold Mountain Wind"]
    },
    {
      name: "Stone Breathing",
      japanese: "岩の呼吸",
      derivation: "Sun Breathing",
      description: "Combines immense strength and defense, like immovable stone. Users wield massive weapons.",
      users: ["Gyomei Himejima"],
      color: "linear-gradient(135deg, #868f96, #596164, #868f96)",
      icon: "🪨",
      techniques: ["Serpentinite Bipolar", "Volcanic Rock, Rapid Conquest", "Stone Skin"]
    },
    {
      name: "Mist Breathing",
      japanese: "霞の呼吸",
      derivation: "Wind Breathing",
      description: "Obscures vision and confuses enemies with unpredictable movements.",
      users: ["Muichiro Tokito"],
      color: "linear-gradient(135deg, #d4fc79, #96e6a1, #d4fc79)",
      icon: "☁️",
      techniques: ["Low Clouds, Distant Haze", "Eight-Layered Mist", "Obscuring Clouds"]
    },
    {
      name: "Love Breathing",
      japanese: "恋の呼吸",
      derivation: "Flame Breathing",
      description: "Agile, whip-like sword style with speed and flexibility.",
      users: ["Mitsuri Kanroji"],
      color: "linear-gradient(135deg, #ff5858, #f09819, #ff5858)",
      icon: "💕",
      techniques: ["Shivers of First Love", "Love Pangs", "Catlove Shower"]
    },
    {
      name: "Sound Breathing",
      japanese: "音の呼吸",
      derivation: "Thunder Breathing",
      description: "Combines explosions and rhythm-based attacks.",
      users: ["Tengen Uzui"],
      color: "linear-gradient(135deg, #834d9b, #d04ed6, #834d9b)",
      icon: "🎶",
      techniques: ["Roar", "String Performance", "Wailing Ensemble"]
    },
    {
      name: "Beast Breathing",
      japanese: "獣の呼吸",
      derivation: "Wind Breathing (Inspired)",
      description: "Based on animalistic instincts, dual swords, and enhanced senses.",
      users: ["Inosuke Hashibira"],
      color: "linear-gradient(135deg, #556270, #ff6b6b, #556270)",
      icon: "🐗",
      techniques: ["Piercing Fang", "Ripping Fangs", "Throwing Fang"]
    },
    {
      name: "Serpent Breathing",
      japanese: "蛇の呼吸",
      derivation: "Water Breathing",
      description: "Snake-like slashing with twisting, winding sword strikes.",
      users: ["Obanai Iguro"],
      color: "linear-gradient(135deg, #00b09b, #96c93d, #00b09b)",
      icon: "🐍",
      techniques: ["Winding Serpent Slash", "Venom Fangs", "Coiled Serpent Strike"]
    },
    {
      name: "Insect Breathing",
      japanese: "蟲の呼吸",
      derivation: "Flower Breathing",
      description: "Uses small, fast strikes with poison-coated blades to kill demons.",
      users: ["Shinobu Kocho"],
      color: "linear-gradient(135deg, #7f00ff, #e100ff, #7f00ff)",
      icon: "🦋",
      techniques: ["Butterfly Dance", "Dance of the Bee Sting", "Dance of the Dragonfly"]
    },
    {
      name: "Flower Breathing",
      japanese: "花の呼吸",
      derivation: "Water Breathing",
      description: "Graceful, petal-like movements with swift precision.",
      users: ["Kanae Kocho", "Kanao Tsuyuri"],
      color: "linear-gradient(135deg, #fdbb2d, #22c1c3, #fdbb2d)",
      icon: "🌸",
      techniques: ["Equinoctial Vermilion Eye", "Scattered Blossoms", "Final Form: Equinoctial Vermilion Eye"]
    }
  ];

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden font-serif p-4 sm:p-8">
        {/* Google Font Import */}
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Yuji+Syuku&display=swap');
            .font-yuji {
              font-family: 'Yuji Syuku', serif;
            }
          `}
        </style>
           <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Yuji+Syuku&family=Noto+Serif+JP:wght@400;700&family=Kosugi+Maru&display=swap');
          .font-yuji {
            font-family: 'Yuji Syuku', serif;
          }
          .font-noto-jp {
            font-family: 'Noto Serif JP', serif;
          }
        `}
      </style>

      {/* Decorative background glows */}
      <div className="absolute top-0 -left-1/4 w-full h-full bg-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 -right-1/4 w-full h-full bg-purple-700 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Animated background elements */}
      <div className="fixed inset-0 z-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-soft-light filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400 rounded-full mix-blend-soft-light filter blur-3xl animate-pulse-slow delay-2000"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-16 pt-18">
        <h1 className="text-4xl md:text-5xl font-bold pb-3 mb-6 text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-green-500 font-noto-jp">
          Demon Slayer Breathing Styles
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-6 font-noto-jp">
          鬼殺隊が使用する強力な剣術。それぞれが独自の特性と形を持っています。
        </p>
        <p className="text-sm text-gray-400 mt-2 max-w-2xl mx-auto">
          The powerful sword techniques used by Demon Slayers to combat demons, each with unique characteristics and forms.
        </p>
      </div>

      {/* Breathing Styles Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {breathingStyles.map((style, index) => (
          <div
            key={index}
            className="relative group rounded-2xl overflow-hidden border border-opacity-20 backdrop-blur-md transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:bg-slate-800/60"
            style={{
              background: 'rgba(15, 23, 42, 0.7)',
              borderImage: style.color,
              borderImageSlice: 1,
            }}
          >
            {/* Header with icon and name */}
            <div
              className="p-5 border-b border-opacity-20"
              style={{ borderImage: style.color, borderImageSlice: 1 }}
            >
              <div className="flex items-center">
                <span className="text-3xl mr-3">{style.icon}</span>
                <div>
                  <h2 className="text-xl font-bold text-nowrap">{style.name}</h2>
                  <p className="text-sm text-gray-400">{style.japanese}</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <div className="mb-4">
                <span className="text-xs font-semibold text-cyan-300">Derived from</span>
                <p className="text-sm">{style.derivation}</p>
              </div>

              <div className="mb-4">
                <span className="text-xs font-semibold text-cyan-300">Notable Users</span>
                <p className="text-sm">{style.users.join(', ')}</p>
              </div>
              
              {/* Expand/Collapse indicator that opens the modal */}
              <div className="flex justify-center mt-4">
                <div 
                  className="w-8 h-8 rounded-full bg-opacity-20 flex items-center justify-center transition-transform duration-300 group-hover:bg-opacity-30 cursor-pointer"
                  style={{ background: style.color }}
                  onClick={() => setSelectedStyle(style)}
                >
            <svg
  className="w-4 h-4"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M7 4h10l4 4v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z"
  />
  <line x1="9" y1="13" x2="15" y2="13" strokeWidth={2} stroke="currentColor" />
  <line x1="9" y1="17" x2="15" y2="17" strokeWidth={2} stroke="currentColor" />
</svg>

                </div>
              </div>
            </div>

            {/* Animated gradient border effect */}
              <div className="absolute   inset-0 rounded-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: style.color,  
                  zIndex: -1,
                  filter: "blur(15px) ", 
                }}
              ></div>
          </div>
        ))}
      </div>
      
      {/* Modal Popup */}
      {selectedStyle && (
        <div 
  className="fixed inset-0 z-50 bg-transparent backdrop-blur-md flex items-center justify-center p-4 transition-opacity duration-300"
  onClick={() => setSelectedStyle(null)}
>

          <div 
            className="relative w-full max-w-2xl bg-slate-900 rounded-2xl border border-opacity-20 p-8 shadow-2xl"
            style={{ borderImage: selectedStyle.color, borderImageSlice: 1 }}
            onClick={(e) => e.stopPropagation()} // Prevents modal from closing when clicking inside
          >
            {/* Modal Header */}
            <div className="flex items-center mb-6">
                <span className="text-5xl mr-4">{selectedStyle.icon}</span>
                <div>
                  <h2 className="text-4xl font-bold font-yuji" style={{ color: 'white' }}>{selectedStyle.name}</h2>
                  <p className="text-lg text-gray-400">{selectedStyle.japanese}</p>
                </div>
            </div>

            {/* Modal Content */}
            <div className="space-y-4">
                <div>
                    <h3 className="text-sm font-semibold text-cyan-300 mb-1">Description</h3>
                    <p className="text-base text-gray-300">{selectedStyle.description}</p>
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-cyan-300 mb-1">Notable Techniques</h3>
                    <ul className="text-base space-y-1">
                        {selectedStyle.techniques.map((tech, i) => (
                            <li key={i} className="flex items-start">
                                <span className="text-purple-400 mr-2">•</span>
                                {tech}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setSelectedStyle(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}


      {/* Custom styles */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default Breathing;
