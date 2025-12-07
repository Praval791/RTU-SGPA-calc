"use client";

import React, { useState, useRef, useEffect } from "react";
import { BranchToCredits, branches } from "../data/credits";
import gradePoints, { Grade } from "../data/gradePoints";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Calculator, CheckCircle2 } from "lucide-react";

const SgpaCalculator = () => {
    const [semester, setSemester] = useState<number>(0);
    const [branch, setBranch] = useState<string>("Computer Science Engineering (CSE)");
    const [grades, setGrades] = useState<Record<string, string>>({});
    const [sgpa, setSgpa] = useState<number | null>(null);
    const resultRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (sgpa !== null && resultRef.current) {
            resultRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [sgpa]);

    const handleSemesterChange = (value: string) => {
        setSemester(parseInt(value));
        setGrades({});
        setSgpa(null);
    };

    const handleGradeChange = (subject: string, grade: string) => {
        setGrades((prev) => ({
            ...prev,
            [subject]: grade,
        }));
    };

    const calculateSGPA = () => {
        const currentSemData = BranchToCredits[branch][semester];
        let totalGradePoints = 0;
        const { subjectToCredits, totalCredits } = currentSemData;

        for (const subject in subjectToCredits) {
            const grade = grades[subject];
            if (grade) {
                const gradePoint = gradePoints[grade as Grade];
                if (gradePoint !== undefined) {
                    totalGradePoints += gradePoint * subjectToCredits[subject];
                }
            }
        }

        const calculatedSgpa = totalGradePoints / totalCredits;
        setSgpa(calculatedSgpa);
    };

    const currentSemSubjects = BranchToCredits[branch][semester].subjectToCredits;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-3xl"
        >
            <Card className="backdrop-blur-sm bg-white/95 dark:bg-slate-900/50 shadow-2xl border-slate-200 dark:border-slate-800">
                <CardHeader className="text-center space-y-2">
                    <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                        SGPA Calculator
                    </CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-400 text-lg font-medium">
                        Calculate your Semester Grade Point Average with ease
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div className="space-y-4">
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-100 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                            <div className="w-full md:w-1/3 space-y-2 min-w-0">
                                <Label htmlFor="branch" className="text-base font-bold text-slate-800 dark:text-slate-200">
                                    Select Branch
                                </Label>
                                <Select value={branch} onValueChange={setBranch} disabled={true}>
                                    <SelectTrigger id="branch" className="w-full bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 font-medium shadow-sm [&>span]:truncate">
                                        <SelectValue className="truncate" placeholder="Select Branch" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {branches.map((b) => (
                                            <SelectItem key={b} value={b}>
                                                {b}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="w-full md:w-1/3 space-y-2">
                                <Label htmlFor="semester" className="text-base font-bold text-slate-800 dark:text-slate-200">
                                    Select Semester
                                </Label>
                                <Select value={semester.toString()} onValueChange={handleSemesterChange}>
                                    <SelectTrigger id="semester" className="w-full bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 font-medium shadow-sm">
                                        <SelectValue placeholder="Select Semester" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {BranchToCredits[branch].map((_, index) => (
                                            <SelectItem key={index} value={index.toString()}>
                                                {index + 1}{index === 0 ? "st" : index === 1 ? "nd" : index === 2 ? "rd" : "th"} Semester
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/30 px-4 py-2 rounded-full text-indigo-800 dark:text-indigo-300 font-bold border border-indigo-200 dark:border-indigo-800">
                                <BookOpen className="w-5 h-5" />
                                <span>Total Credits: {BranchToCredits[branch][semester].totalCredits}</span>
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                            <AnimatePresence mode="wait">
                                {Object.entries(currentSemSubjects).map(([subject, credits], index) => (
                                    <motion.div
                                        key={`${semester}-${subject}`}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="space-y-2 p-3 rounded-lg bg-white dark:bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border border-slate-200 dark:border-transparent hover:border-indigo-200 dark:hover:border-slate-700 shadow-sm hover:shadow-md"
                                    >
                                        <Label htmlFor={subject} className="text-sm font-bold text-slate-700 dark:text-slate-300 line-clamp-1" title={subject}>
                                            {subject}
                                        </Label>
                                        <div className="flex items-center gap-2">
                                            <Select
                                                value={grades[subject] || ""}
                                                onValueChange={(value) => handleGradeChange(subject, value)}
                                            >
                                                <SelectTrigger id={subject} className="w-full border-slate-300 dark:border-slate-700">
                                                    <SelectValue placeholder="Grade" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {Object.keys(gradePoints).map((grade) => (
                                                        <SelectItem key={grade} value={grade}>
                                                            {grade}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 font-mono bg-slate-100 dark:bg-slate-800 px-2 py-2 rounded border border-slate-200 dark:border-slate-700 whitespace-nowrap min-w-[3.5rem] text-center flex items-center justify-center h-10">
                                                {credits} Cr
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>

                    <div className="pt-4 space-y-6">
                        <Button
                            onClick={calculateSGPA}
                            className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/20 transition-all hover:scale-[1.02]"
                        >
                            <Calculator className="mr-2 h-5 w-5" />
                            Calculate SGPA
                        </Button>

                        <AnimatePresence>
                            {sgpa !== null && (
                                <motion.div
                                    ref={resultRef}
                                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 rounded-xl p-6 text-center relative overflow-hidden"
                                >
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500" />
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-medium">
                                            <CheckCircle2 className="w-5 h-5" />
                                            <span>Calculation Complete</span>
                                        </div>
                                        <div className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white tracking-tight">
                                            {sgpa.toFixed(2)}
                                        </div>
                                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                                            Semester Grade Point Average
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default SgpaCalculator;
