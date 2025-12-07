import React from 'react';
import { Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface FloatingButtonProps {
    onClick: () => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onClick }) => {
    return (
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="fixed bottom-6 right-6 z-50"
        >
            <Button
                onClick={onClick}
                size="lg"
                className="rounded-full h-14 w-14 md:w-auto md:px-6 shadow-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0"
            >
                <Calculator className="h-6 w-6 md:mr-2" />
                <span className="hidden md:inline font-semibold">Calculate CGPA</span>
            </Button>
        </motion.div>
    );
};

export default FloatingButton;
