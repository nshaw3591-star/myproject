import React from 'react';
import { Button } from '../ui/button';
import 'animate.css';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="absolute top-18 left-0 w-full h-full bg-cover bg-center opacity-100">

      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bgimg.png')" }}>

        {/* 2. The Dark/Glass Overlay - Crucial for text readability */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[3px] z-0" />

        {/* 3. Content Container */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">
          {/* Hero Text with subtle shadow for contrast */}
          <h1 className="font-extrabold text-5xl sm:text-6xl lg:text-8xl mb-8 tracking-tight text-white animate__animated animate__fadeInUp leading-[1.1] drop-shadow-2xl">
            Discover Your Next
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
              Epic Adventure
            </span>
          </h1>

          <p className="text-gray-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed animate__animated animate__fadeIn animate__delay-1s drop-shadow-md">
            Personalized itineraries for mountain treks, city escapes, and hidden gems.
            Plan your journey in seconds, not hours.
          </p>

          {/* 4. CTA Section */}
          <div className="flex flex-col sm:flex-row gap-4 animate__animated animate__fadeInUp animate__delay-1s">
            <Link to={'/create-trip'}>
              <Button
                className="px-10 py-7 text-xl font-bold text-white bg-gradient-to-r from-green-500 to-blue-600 hover:scale-105 transition-all duration-300 rounded-full shadow-2xl"
              >
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </div>
     </div>
  );
}

export default Hero;