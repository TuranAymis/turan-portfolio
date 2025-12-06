
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, Terminal, RefreshCw } from 'lucide-react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
        errorInfo: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error, errorInfo: null };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
        this.setState({ errorInfo });
        // In a real app, you would log to Sentry/LogRocket here
    }

    private handleReboot = () => {
        window.location.reload();
    };

    public render() {
        if (this.state.hasError) {
            return (
                <div className="fixed inset-0 bg-[#0000AA] text-white font-mono flex flex-col items-center justify-center p-8 z-[9999] cursor-none selection:bg-white selection:text-[#0000AA]">
                    <div className="max-w-3xl w-full space-y-8 animate-in fade-in duration-500">
                        {/* Header */}
                        <div className="text-center mb-12">
                            <span className="bg-white text-[#0000AA] px-2 py-1 font-bold text-lg mb-4 inline-block">
                                SYSTEM_CRITICAL_ERROR
                            </span>
                            <h1 className="text-4xl md:text-6xl mb-2 mt-4">FATAL EXCEPTION</h1>
                            <p className="opacity-80">A fatal exception 0E has occurred at 0028:C0011E36 in VXD VMM(01) + 00010E36.</p>
                        </div>

                        {/* Error Details */}
                        <div className="border border-white/30 p-6 bg-[#000088] font-mono text-sm shadow-xl">
                            <div className="flex items-center gap-2 mb-4 text-yellow-300">
                                <AlertCircle size={20} />
                                <span className="font-bold">ERROR DIAGNOSTICS:</span>
                            </div>

                            <div className="space-y-4 font-mono">
                                <div>
                                    <span className="text-gray-400 block mb-1">Exception:</span>
                                    <span className="text-white break-words">{this.state.error && this.state.error.toString()}</span>
                                </div>

                                {this.state.errorInfo && (
                                    <div className="max-h-64 overflow-auto scrollbar-hide opacity-70 text-xs">
                                        <span className="text-gray-400 block mb-1">Stack Trace:</span>
                                        <pre className="whitespace-pre-wrap">{this.state.errorInfo.componentStack}</pre>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="text-center pt-8">
                            <p className="mb-8 animate-pulse">Press any key to continue or...</p>

                            <button
                                onClick={this.handleReboot}
                                className="group border-2 border-white px-8 py-3 hover:bg-white hover:text-[#0000AA] transition-colors flex items-center gap-3 mx-auto uppercase tracking-widest font-bold"
                            >
                                <RefreshCw size={20} className="group-hover:rotate-180 transition-transform duration-700" />
                                Initiate System Reboot
                            </button>
                        </div>

                        <div className="fixed bottom-4 left-4 text-xs opacity-40">
                            <div className="flex items-center gap-2">
                                <Terminal size={12} />
                                <span>STOP: 0x00000050 (0xFD3094C2, 0x00000001, 0xFBFE7617, 0x00000000)</span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
