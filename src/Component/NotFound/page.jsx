import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-blue-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-transparent shadow-2xl rounded-3xl p-10 max-w-xl w-full text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-[90px] md:text-[120px] font-extrabold text-blue-600 leading-none mb-4"
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3"
        >
          Page Not Found
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-gray-600 mb-8"
        >
          The page you’re looking for doesn’t exist or has been moved. Let’s get
          you back to something helpful.
        </motion.p>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/"
            className="inline-block bg-blue-600 hover:bg-blue-500 transition-colors text-white px-6 py-3 rounded-full font-medium shadow-md"
          >
            Go back home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
