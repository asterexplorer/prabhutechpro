import React from 'react';
import { useStats } from '../../hooks/useStats';

const StatsSection = () => {
  const { stats, isLive } = useStats();

  return (
    <section className="stats-section reveal" aria-label="Live company statistics">
      <div className="container">
        {isLive && (
          <div className="stats-section__live">
            <span className="stats-section__live-dot" />
            Live data
          </div>
        )}
        <div className="stats-section__grid">
          {stats.map(({ label, value, color }) => (
            <div key={label} className="stat-item">
              <h2 className="stat-item__value" style={{ color }}>{value}</h2>
              <p className="stat-item__label">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
