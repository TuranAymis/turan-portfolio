
import React, { useState } from 'react';
import { X, Send, AlertTriangle, Bug } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useTerminalContext } from '../context/TerminalContext';
import { useGame } from '../context/GameContext';

const FeedbackModal: React.FC = () => {
    const { isFeedbackOpen, setFeedbackOpen } = useAppContext();
    const { addLog } = useTerminalContext();
    const { spawnToast } = useGame();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        type: 'bug', // bug, feature, contact
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isFeedbackOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        addLog('Initiating secure transmission...', 'INFO');

        // Simulate network delay
        setTimeout(async () => {
            try {
                // Placeholder Formspree endpoint (Replace with real one)
                // const response = await fetch("https://formspree.io/f/YOUR_ID", {
                //     method: "POST",
                //     headers: { "Content-Type": "application/json" },
                //     body: JSON.stringify(formData)
                // });

                // Simulating Success
                addLog(`Transmission Successful. Payload delivered via secure channel.`, 'SUCCESS');
                spawnToast('Transmission Sent', 'Feedback received by HQ.', 'quest');

                setFeedbackOpen(false);
                setFormData({ name: '', email: '', type: 'bug', message: '' });

            } catch (error) {
                addLog('Transmission Failed. Signal lost.', 'ERROR');
                spawnToast('Transmission Failed', 'Check interference.', 'quest');
            } finally {
                setIsSubmitting(false);
            }
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setFeedbackOpen(false)}></div>

            <div className="relative w-full max-w-md bg-slate-900 border border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.2)] rounded-lg overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="bg-slate-800/50 px-4 py-3 border-b border-blue-500/30 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-blue-400 font-mono text-sm tracking-wider uppercase font-bold">
                        <Bug size={16} />
                        Feedback // Bug Report
                    </div>
                    <button onClick={() => setFeedbackOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                        <X size={18} />
                    </button>
                </div>

                {/* Body */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="space-y-1">
                        <label className="text-xs font-mono text-slate-500 uppercase">Reporter (Name)</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm text-slate-200 focus:border-blue-500 outline-none transition-colors"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Agent Name"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-mono text-slate-500 uppercase">Comm Frequency (Email)</label>
                        <input
                            type="email"
                            required
                            className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm text-slate-200 focus:border-blue-500 outline-none transition-colors"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            placeholder="agent@hq.com"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-mono text-slate-500 uppercase">Report Type</label>
                        <div className="grid grid-cols-3 gap-2">
                            {(['bug', 'feature', 'other'] as const).map(type => (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, type })}
                                    className={`text-xs font-mono py-2 border rounded uppercase transition-all ${formData.type === type
                                            ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                                            : 'bg-slate-950 border-slate-700 text-slate-500 hover:border-slate-500'
                                        }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-mono text-slate-500 uppercase">Data Payload (Message)</label>
                        <textarea
                            required
                            rows={4}
                            className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm text-slate-200 focus:border-blue-500 outline-none transition-colors resize-none"
                            value={formData.message}
                            onChange={e => setFormData({ ...formData, message: e.target.value })}
                            placeholder="Describe the anomaly or feature request..."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Transmitting...
                            </>
                        ) : (
                            <>
                                <Send size={16} />
                                Initiate Upload
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FeedbackModal;
