import { FiInfo } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const AlertBox = ({ show, onClose, title }) => {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="relative bg-white rounded-lg shadow-2xl p-8 w-full max-w-xl border border-gray-300"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-2xl font-bold"
                        >
                            &times;
                        </button>

                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
                                <FiInfo className="text-xl" />
                            </div>
                            <h2 className="text-lg sm:text-xl font-semibold text-blue-700">{title}</h2>
                        </div>

                        <p className="text-gray-700 text-base mb-6">
                            Students of <strong>B.Tech</strong> and <strong>Diploma</strong> can now submit the{' '}
                            <strong>Preference Grievance Form</strong> using the button below.
                        </p>

                        <a
                            href="https://forms.gle/so3SpNstAwsr12F5A"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition-colors"
                        >
                            Open Preference Grievance Form
                        </a>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AlertBox;
