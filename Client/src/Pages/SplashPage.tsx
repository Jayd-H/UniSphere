import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const SplashPage = () => {
  return (
    <div className="flex justify-center items-center h-screen glowing-background font-arimo">
      <div className="text-center">
        <motion.div
          className="logo-container mb-4"
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          <GlobeAltIcon className="w-16 h-16 mx-auto text-luni-black" />
        </motion.div>
        <h1 className="text-4xl font-bold text-luni-black mb-2">UniSphere</h1>
        <p className="text-xl text-luni-dark-blue font-montserrat">Coming Soon</p>
        {/* Countdown Timer */}
      </div>
    </div>
  );
};

export default SplashPage;
