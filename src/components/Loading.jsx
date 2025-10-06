import React from 'react';
import loadingVideo from '../video/intro2.mp4'
import TanjiroHead from '../img/tanjiro.png'
import Logo from '../img/logo.svg'


export default function Loading() {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen w-screen overflow-hidden bg-black/80 ">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover -z-10 opacity-50"
        src={loadingVideo}
        autoPlay
        loop
        muted
      ></video>

      {/* Title */}
{/* <h1 className="text-4xl md:text-7xl font-serif font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600 ">
    Demon Slayer
</h1> */}
  <img
            src={Logo}
            alt="logo"
            // The 'animate-tanjiro-run' is a custom animation
            className="w-50  "
          />

      {/* Loading Bar and Character Head Container */}
      <div className="w-11/12 md:w-[25%] max-w-sm">
        {/* Tanjiro's Head - Positioned relative to the bar */}
        <div className="relative h-16 w-full -mb-4">
          <img
            src={TanjiroHead}
            alt="Tanjiro"
            // The 'animate-tanjiro-run' is a custom animation
            className="h-14 w-14 absolute -bottom-3 animate-tanjiro-run"
          />
        </div>

        {/* Loading Bar */}
        <div className="h-4 w-full bg-gray-700 rounded-full overflow-hidden border-2 border-red-400 shadow-lg">
          {/* Inner filling bar - 'animate-progress' is custom */}
          <div className="h-full bg-gradient-to-r from-red-300 to-red-500 rounded-full animate-progress"></div>
        </div>
      </div>

      <style>
        {`
          @keyframes progress-bar-fill {
            from {
              width: 0%;
            }
            to {
              width: 100%;
            }
          }
          
          @keyframes tanjiro-head-run {
            from {
              left: 0%;
            }
            to {
              left: calc(100% - 3rem); /* 4rem is the width of the image (w-16) */
            }
          }

          .animate-progress {
            animation: progress-bar-fill 6s ease-out forwards;
          }

          .animate-tanjiro-run {
            animation: tanjiro-head-run 6s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
}

