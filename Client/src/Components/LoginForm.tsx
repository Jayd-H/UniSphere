import React, { useState } from 'react';
import { UserIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import uniSphereLogo from '../assets/UniSphereLogo.svg';
import { motion } from 'framer-motion';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isOverLimit, setIsOverLimit] = useState(false);

  // Handle form submit
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Login submitted for:', username, password);
  };

  // Function to handle username change and check the length
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputLength = e.target.value.length;
    setUsername(e.target.value);
    setIsOverLimit(inputLength > 32 || password.length > 32);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputLength = e.target.value.length;
    setPassword(e.target.value);
    setIsOverLimit(username.length > 32 || inputLength > 32);
  };

  return (
    <div className="flex justify-center items-center h-screen glowing-background font-arimo">
      <motion.div
        className="frosted-glass w-full max-w-xs p-8 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 300 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 25 }}
      >
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
                onChange={handleUsernameChange}
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
                onChange={handlePasswordChange}
                className="py-2 pl-10 block w-full bg-transparent border-0 border-b-2 border-gray-300 focus:border-luni-blue outline-none font-montserrat placeholder-luni-grey"
                placeholder="Enter password..."
                required
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className={`bg-luni-blue hover:bg-luni-dark-blue text-white font-bold py-1 px-4 rounded-xl focus:outline-none focus:shadow-outline ${
                  isOverLimit ? 'bg-gray-500 hover:bg-gray-500 cursor-not-allowed' : ''
                }`}
                disabled={isOverLimit}
              >
                Login
              </button>
              <button
                type="button"
                className={`ml-4 inline-block align-baseline font-bold text-sm text-luni-blue hover:text-luni-dark-blue ${
                  isOverLimit ? 'text-gray-500 cursor-not-allowed' : ''
                }`}
                disabled={isOverLimit}
                // register button logic
              >
                Register
              </button>
            </div>
            {isOverLimit && (
              <div className="text-red-500 text-sm">
                Username and password must be less than 32 characters long.
              </div>
            )}
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginForm;
