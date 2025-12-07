import React from 'react';
import { GraduationCap } from 'lucide-react';
import { ThemeToggle } from "@/components/ThemeToggle";

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-sm dark:bg-slate-900/10 dark:border-slate-800/20">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-800 dark:text-white">
                    <GraduationCap className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                    <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                        RTU SGPA Calculator
                    </h1>
                </div>
                <ThemeToggle />
            </div>
        </nav>
    );
};

export default Navbar;
