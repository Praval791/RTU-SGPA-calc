"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import SgpaCalculator from "@/components/SgpaCalculator";
import FloatingButton from "@/components/FloatingButton";
import CgpaCalculator from "@/components/CgpaCalculator";

export default function Home() {
  const [isCgpaModalOpen, setIsCgpaModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-premium font-sans text-slate-900 selection:bg-indigo-500 selection:text-white">
      <div className="absolute inset-0 backdrop-blur-[2px] pointer-events-none z-0" />
      <div className="relative z-10">
        <Navbar />
        <main className="flex flex-col items-center justify-center p-4 pt-24 min-h-screen pb-24">
          <SgpaCalculator />
        </main>
        <FloatingButton onClick={() => setIsCgpaModalOpen(true)} />
        <CgpaCalculator
          isOpen={isCgpaModalOpen}
          onClose={() => setIsCgpaModalOpen(false)}
        />
      </div>
    </div>
  );
}
