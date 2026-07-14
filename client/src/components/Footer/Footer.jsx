import React from 'react';

const Footer = () => {
  return (
    <footer className="footer-section" style={{ backgroundColor: '#070913', borderTop: '1px solid rgba(139, 92, 246, 0.2)', padding: '30px 20px', marginTop: 'auto', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="footer-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '12px', maxWidth: '600px' }}>
          <p style={{ margin: 0, color: '#9ca3af', fontSize: '0.95rem' }}>
              &copy; {new Date().getFullYear()} <span className="brand-highlight" style={{ color: '#8b5cf6', fontWeight: 'bold' }}>QuestLog</span>. All rights reserved.
          </p>
          <p className="api-attribution" style={{ margin: 0, fontSize: '0.9rem' }}>
              Powered by the <a href="https://rawg.io" target="_blank" rel="noreferrer" style={{ color: '#8b5cf6', fontWeight: 600, textDecoration: 'none' }}>RAWG API</a>
          </p>
      </div>
    </footer>
  );
};

export default Footer;
