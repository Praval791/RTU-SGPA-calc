"use client";

import React, { useState } from "react";
import { creditsTillSem } from "../data/credits";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CgpaCalculatorProps {
    isOpen: boolean;
    onClose: () => void;
}

const CgpaCalculator: React.FC<CgpaCalculatorProps> = ({ isOpen, onClose }) => {
    const [semester, setSemester] = useState<number>(8);
    const [cgpaPrevious, setCgpaPrevious] = useState<string>("");
    const [sgpaCurrent, setSgpaCurrent] = useState<string>("");
    const [result, setResult] = useState<number | null>(null);

    const calculateCGPA = () => {
        const sem = semester;
        const prevCgpaVal = parseFloat(cgpaPrevious);
        const currSgpaVal = parseFloat(sgpaCurrent);

        if (isNaN(prevCgpaVal) || isNaN(currSgpaVal)) {
            return;
        }

        const totalCreditsPrevious = creditsTillSem[sem - 1];
        const totalCreditsCurrent = creditsTillSem[sem] - totalCreditsPrevious;

        const totalCGPAPrevious = prevCgpaVal * totalCreditsPrevious;
        const totalCGPACurrent = currSgpaVal * totalCreditsCurrent;

        const totalCredits = totalCreditsPrevious + totalCreditsCurrent;

        const cgpa = (totalCGPAPrevious + totalCGPACurrent) / totalCredits;
        setResult(cgpa);
    };

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            onClose();
            setResult(null);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-md backdrop-blur-xl bg-white/95 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                        CGPA Calculator
                    </DialogTitle>
                    <DialogDescription className="text-center text-slate-600 dark:text-slate-400">
                        Calculate your Cumulative Grade Point Average
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="cgpa-semester">Select Semester</Label>
                        <Select
                            value={semester.toString()}
                            onValueChange={(val) => setSemester(parseInt(val))}
                        >
                            <SelectTrigger id="cgpa-semester">
                                <SelectValue placeholder="Select Semester" />
                            </SelectTrigger>
                            <SelectContent>
                                {[2, 3, 4, 5, 6, 7, 8].map((sem) => (
                                    <SelectItem key={sem} value={sem.toString()}>
                                        {sem === 2 ? "2nd" : sem === 3 ? "3rd" : `${sem}th`} Semester
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="cgpaPrevious">CGPA of Last Semester</Label>
                        <Input
                            id="cgpaPrevious"
                            type="number"
                            step="0.01"
                            placeholder="e.g. 8.5"
                            value={cgpaPrevious}
                            onChange={(e) => setCgpaPrevious(e.target.value)}
                            className="font-mono"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="sgpaCurrent">SGPA of Current Semester</Label>
                        <Input
                            id="sgpaCurrent"
                            type="number"
                            step="0.01"
                            placeholder="e.g. 9.0"
                            value={sgpaCurrent}
                            onChange={(e) => setSgpaCurrent(e.target.value)}
                            className="font-mono"
                        />
                    </div>

                    <Button
                        onClick={calculateCGPA}
                        className="w-full h-11 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md"
                    >
                        <Calculator className="mr-2 h-4 w-4" />
                        Calculate CGPA
                    </Button>

                    <AnimatePresence>
                        {result !== null && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4 flex items-center justify-between border border-indigo-100 dark:border-indigo-800">
                                    <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300">
                                        <CheckCircle2 className="h-5 w-5" />
                                        <span className="font-medium">Your CGPA</span>
                                    </div>
                                    <div className="text-3xl font-bold text-slate-800 dark:text-white">
                                        {result.toFixed(2)}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CgpaCalculator;
