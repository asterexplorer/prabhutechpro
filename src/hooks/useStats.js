import { useState, useEffect } from 'react';
import { STATS_FALLBACK } from '../data/content';

/**
 * Polls /api/stats every `interval` ms.
 * Falls back to static data if the backend is unreachable.
 */
export function useStats(interval = 5000) {
  const [stats, setStats] = useState(STATS_FALLBACK);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/stats');
        if (!res.ok) throw new Error('non-2xx');
        const d = await res.json();
        setStats([
          { label: 'Active Users',    value: (d.activeUsers / 1000).toFixed(1) + 'K+', color: 'var(--primary-light)' },
          { label: 'Uptime SLA',      value: d.uptimeSla + '%',                         color: 'var(--secondary)' },
          { label: 'Automations Run', value: (d.automationsRun / 1_000_000).toFixed(1) + 'M+', color: 'var(--accent)' },
          { label: 'Capital Raised',  value: '$' + d.capRaised + 'M+',                 color: 'var(--success)' },
        ]);
        setIsLive(true);
      } catch {
        setIsLive(false);
      }
    };

    fetchStats();
    const t = setInterval(fetchStats, interval);
    return () => clearInterval(t);
  }, [interval]);

  return { stats, isLive };
}
