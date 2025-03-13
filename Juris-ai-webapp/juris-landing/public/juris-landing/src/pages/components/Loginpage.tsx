import React, { useState } from 'react';

const MoonlightLoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberLogin, setRememberLogin] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password, rememberLogin });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f5f5] to-[#e0e0e0] p-4">
      <div className="w-full max-w-4xl flex shadow-2xl rounded-2xl overflow-hidden">
        {/* Illustration Container */}
        <div className="w-1/2 relative bg-white overflow-hidden">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 500 500" 
            className="absolute top-0 left-0 w-full h-full opacity-10"
          >
            <defs>
              <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f0f0f0" />
                <stop offset="100%" stopColor="#e0e0e0" />
              </linearGradient>
            </defs>
            <path fill="url(#bg-gradient)" d="M0,0 L500,0 L500,500 L0,500 Z" />
          </svg>
          
          <div className="relative z-10">
            <svg viewBox="0 0 500 500" className="w-full h-full">
              {/* Floating Island */}
              <g transform="translate(250, 250) scale(0.8)">
                <polygon 
                  points="0,-200 200,0 0,200 -200,0" 
                  fill="#8D6E63" 
                  transform="rotate(45)"
                />
                
                {/* Mountains */}
                <polygon 
                  points="-100,-50 -50,-150 0,-50" 
                  fill="#6D4C41" 
                  transform="translate(-50, -100)"
                />
                <polygon 
                  points="-150,-100 -100,-200 -50,-100" 
                  fill="#5D4037" 
                  transform="translate(50, -80)"
                />
                
                {/* Sun */}
                <circle 
                  cx="150" 
                  cy="-150" 
                  r="30" 
                  fill="#FFC107"
                />
                
                {/* Clouds */}
                <ellipse 
                  cx="-100" 
                  cy="-180" 
                  rx="40" 
                  ry="20" 
                  fill="#FFFFFF" 
                  opacity="0.7"
                />
                <ellipse 
                  cx="100" 
                  cy="-160" 
                  rx="50" 
                  ry="25" 
                  fill="#FFFFFF" 
                  opacity="0.7"
                />
              </g>
            </svg>
          </div>
        </div>
        
        {/* Login Form Container */}
        <div className="w-1/2 bg-white p-12 flex flex-col justify-center">
          <div className="flex items-center mb-8">
            <div className="w-10 h-10 bg-[#8D6E63] rounded-full mr-3"></div>
            <h1 className="text-2xl font-bold text-[#5D4037]">MOONLIGHT</h1>
          </div>
          
          <h2 className="text-3xl font-bold mb-4 text-[#5D4037]">Welcome</h2>
          <p className="text-gray-600 mb-8">Fill your data to enter. Thank you!!!</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john.doe@moonlight.com"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8D6E63]"
                required
              />
            </div>
            
            <div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8D6E63]"
                required
              />
            </div>
            
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={rememberLogin}
                  onChange={(e) => setRememberLogin(e.target.checked)}
                  className="mr-2 text-[#8D6E63] focus:ring-[#8D6E63]"
                />
                Remember login
              </label>
              <a href="#" className="text-[#8D6E63] hover:underline">Recover password</a>
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-[#8D6E63] text-white p-3 rounded-lg hover:bg-[#6D4C41] transition duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MoonlightLoginScreen;