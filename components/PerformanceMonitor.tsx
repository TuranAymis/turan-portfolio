
import React, { useEffect } from 'react';
import { onCLS, onINP, onLCP, onFCP, Metric } from 'web-vitals';
import { useTerminalContext } from '../context/TerminalContext';

const PerformanceMonitor: React.FC = () => {
    const { addLog } = useTerminalContext();

    useEffect(() => {
        const handleMetric = (metric: Metric) => {
            // Determine status based on thresholds (Google's Core Web Vitals)
            let status = 'SUCCESS';
            let colorString = '';

            // Basic thresholds logic
            switch (metric.name) {
                case 'CLS':
                    status = metric.value > 0.1 ? (metric.value > 0.25 ? 'ERROR' : 'WARNING') : 'SUCCESS';
                    break;
                case 'LCP':
                    status = metric.value > 2500 ? (metric.value > 4000 ? 'ERROR' : 'WARNING') : 'SUCCESS';
                    break;
                case 'INP':
                    status = metric.value > 200 ? (metric.value > 500 ? 'ERROR' : 'WARNING') : 'SUCCESS';
                    break;
                case 'FCP':
                    status = metric.value > 1800 ? (metric.value > 3000 ? 'ERROR' : 'WARNING') : 'SUCCESS';
                    break;
                default:
                    status = 'INFO';
            }

            const msg = `[TELEMETRY] ${metric.name}: ${Math.round(metric.value)}ms (Rating: ${metric.rating})`;

            // Only log if it's the first time or significant? 
            // web-vitals usually reports once final.
            // We'll log everything to the terminal for the "Matrix" feel.

            addLog(msg, status as any); // Type assertion for our specific LogLevel
            console.log(`%c [TELEMETRY] ${metric.name}: ${metric.value}`, 'color: #00ff00; background: #000; padding: 2px 4px; border-radius: 2px;');
        };

        // Register listeners
        onCLS(handleMetric);
        onINP(handleMetric);
        onLCP(handleMetric);
        onFCP(handleMetric);

        // Log initialization
        // addLog('Initializing Performance Monitoring Subsystem...', 'INFO'); // Removed to reduce noise on init

    }, []); // Empty dependency array ensures this runs once

    return null; // Headless component
};

export default PerformanceMonitor;
