import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import CountdownTimer from '../Components/Common/CountdownTimer';

const SplashPage = () => {
  return (
    <div className="flex justify-center items-center h-screen glowing-background font-arimo">
      <div className="text-center">
        <motion.div
          className="logo-container mb-4"
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          <GlobeAltIcon className="w-14 h-14 mx-auto text-luni-black" />
        </motion.div>
        <h1 className="text-3xl font-bold text-luni-black -mt-2 font-montserrat">U N I S P H E R E</h1>
        {/* Countdown Timer */}
        <div className='font-montserrat'>
        <CountdownTimer targetDate="2024-05-03"/>
        </div>
      </div>
    </div>
  );
};

export default SplashPage;
