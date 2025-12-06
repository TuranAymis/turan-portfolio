import React, { useEffect, useState } from 'react';
import { Terminal, Cpu } from 'lucide-react';

const LoadingScreen: React.FC = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) return 0;
                return prev + Math.floor(Math.random() * 10) + 5;
            });
        }, 150);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-full w-full min-h-[50vh] text-blue-500 font-mono gap-4 animate-in fade-in duration-300">
            <div className="relative">
                <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full animate-pulse"></div>
                <Cpu size={48} className="relative z-10 animate-spin-slow text-blue-400" />
            </div>

            <div className="flex flex-col items-center gap-2">
                <span className="text-sm tracking-widest uppercase animate-pulse">Initializing Neural Link...</span>

                <div className="w-64 h-1.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                    <div
                        className="h-full bg-blue-500 transition-all duration-200"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                    ></div>
                </div>

                <div className="text-xs text-slate-500 flex justify-between w-64">
                    <span>LOADING MODULES</span>
                    <span>{Math.min(progress, 100)}%</span>
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;
