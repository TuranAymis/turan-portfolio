import React from 'react';
import { useBugContext } from '../context/BugContext';
import { Bug as BugIcon, AlertTriangle, Zap } from 'lucide-react';

const BugLayer: React.FC = () => {
    const { activeBugs, catchBug } = useBugContext();

    if (activeBugs.length === 0) return null;

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[50]">
            {activeBugs.map((bug) => (
                <div
                    key={bug.id}
                    className={`absolute pointer-events-auto cursor-pointer group transition-all duration-300 ${bug.glitchEffect || ''}`}
                    style={{
                        top: bug.top,
                        left: bug.left,
                        ...bug.style
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        catchBug(bug.id);
                    }}
                >
                    {/* Visual Representation based on Type */}
                    <div className="relative">
                        {/* Glitch Animation */}
                        <div className="absolute -inset-2 bg-red-500/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 animate-pulse"></div>

                        {bug.type === 'visual' && (
                            <BugIcon
                                size={24}
                                className="text-red-500/50 group-hover:text-red-400 rotate-12 transition-colors"
                            />
                        )}

                        {bug.type === 'functional' && (
                            <AlertTriangle
                                size={24}
                                className="text-amber-500/50 group-hover:text-amber-400 animate-bounce"
                            />
                        )}

                        {bug.type === 'console' && (
                            <div className="font-mono text-xs bg-black/80 text-red-500 px-2 py-1 rounded border border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.3)]">
                                &gt; ERROR
                            </div>
                        )}

                        {/* Hover Tooltip */}
                        <div className="absolute left-full top-0 ml-2 w-48 bg-slate-900 border border-red-500/50 p-2 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none scale-95 group-hover:scale-100 origin-left z-50">
                            <h4 className="text-red-400 font-bold text-xs uppercase flex items-center gap-1">
                                <Zap size={10} /> {bug.title}
                            </h4>
                            <p className="text-[10px] text-slate-400 mt-1">
                                Difficulty: <span className={
                                    bug.difficulty === 'hard' ? 'text-red-500' :
                                        bug.difficulty === 'medium' ? 'text-amber-500' : 'text-emerald-500'
                                }>{bug.difficulty}</span>
                            </p>
                            <p className="text-[10px] text-slate-500 mt-1 italic">Click to Patch</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BugLayer;
