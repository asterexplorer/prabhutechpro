import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { STATS_FALLBACK } from '../data/content';

const SOCKET_URL = 'http://localhost:5000';

/**
 * Connects to Socket.io for Realtime data updates.
 * Replaces polling with event-driven updates.
 */
export function useStats() {
  const [stats, setStats] = useState(STATS_FALLBACK);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const socket = io(SOCKET_URL);

    const updateStats = (d) => {
      setStats([
        { label: 'Active Users',    value: (d.activeUsers / 1000).toFixed(1) + 'K+', color: 'var(--primary)' },
        { label: 'Uptime SLA',      value: d.uptimeSla + '%',                         color: 'var(--secondary)' },
        { label: 'Automations Run', value: (d.automationsRun / 1_000_000).toFixed(1) + 'M+', color: 'var(--accent)' },
        { label: 'Capital Raised',  value: '$' + d.capRaised + 'M+',                 color: 'var(--success)' },
      ]);
      setIsLive(true);
    };

    socket.on('connect', () => setIsLive(true));
    socket.on('disconnect', () => setIsLive(false));
    socket.on('stats-initial', updateStats);
    socket.on('stats-update', updateStats);

    return () => {
      socket.off('stats-initial');
      socket.off('stats-update');
      socket.disconnect();
    };
  }, []);

  return { stats, isLive };
}
