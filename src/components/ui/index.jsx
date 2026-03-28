import React from 'react';

/**
 * Reusable badge pill.
 * Usage: <Badge>New Feature</Badge>
 */
export const Badge = ({ children, className = '', style = {} }) => (
  <span className={`badge ${className}`} style={style}>
    {children}
  </span>
);

/**
 * Section header block (badge + h2 + subtitle).
 */
export const SectionHeader = ({ badge, title, subtitle, align = 'center' }) => (
  <div
    className="section-header"
    style={{ textAlign: align, marginBottom: '4rem' }}
  >
    {badge && <Badge>{badge}</Badge>}
    <h2
      className="section-title"
      dangerouslySetInnerHTML={{ __html: title }}
    />
    {subtitle && <p className="section-subtitle">{subtitle}</p>}
  </div>
);

/**
 * Primary CTA button.
 */
export const BtnPrimary = ({ children, onClick, style = {}, id, type = 'button' }) => (
  <button
    id={id}
    type={type}
    className="btn-primary"
    onClick={onClick}
    style={style}
  >
    {children}
  </button>
);

/**
 * Ghost / outline button.
 */
export const BtnGhost = ({ children, onClick, style = {}, id, type = 'button' }) => (
  <button
    id={id}
    type={type}
    className="btn-ghost"
    onClick={onClick}
    style={style}
  >
    {children}
  </button>
);

/**
 * Glass card wrapper.
 */
export const GlassCard = ({ children, className = '', style = {} }) => (
  <div className={`glass-card ${className}`} style={style}>
    {children}
  </div>
);
