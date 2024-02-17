import React, { useState } from 'react';
import { UserIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import uniSphereLogo from '../assets/UniSphereLogo.svg';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Handle form submit
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Login submitted for:', username, password);
  };

  return (
    <div className="flex justify-center items-center h-screen glowing-background font-arimo"> 
    <div className="frosted-glass w-full max-w-xs p-8 rounded-lg shadow-lg">
        <div className="flex flex-col items-center p-8">
          <img src={uniSphereLogo} alt="UniSphere Logo" className="h-15 w-48" />
          <h1 className="text-xl font-bold text-luni-grey mb-6">Login</h1>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="relative">
              <UserIcon className="h-5 w-5 text-luni-grey absolute left-0 inset-y-0 flex items-center pl-2 mt-2.5" />
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="py-2 pl-10 block w-full bg-transparent border-0 border-b-2 border-gray-300 focus:border-luni-blue outline-none font-montserrat placeholder-luni-grey"
                placeholder="Enter username..."
                required
              />
            </div>
            <div className="relative">
              <LockClosedIcon className="h-5 w-5 text-luni-grey absolute left-0 inset-y-0 flex items-center pl-2 mt-2.5" />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="py-2 pl-10 block w-full bg-transparent border-0 border-b-2 border-gray-300 focus:border-luni-blue outline-none font-montserrat placeholder-luni-grey"
                placeholder="Enter password..."
                required
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-luni-blue hover:bg-luni-dark-blue text-white font-bold py-1 px-4 rounded-xl focus:outline-none focus:shadow-outline"
              >
                Login
              </button>
              <button
                type="button"
                className="ml-4 inline-block align-baseline font-bold text-luni-blue hover:text-luni-dark-blue"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
