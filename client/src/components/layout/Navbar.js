import React from 'react';

const Navbar = ({ activeNav, onNavigate, onToggleSidebar, isSidebarOpen }) => {
  return (
    <header className="app-navbar">
      <div className="navbar-left">
        <button
          className="sidebar-toggle-btn"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
          title="Toggle Sidebar"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isSidebarOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </>
            )}
          </svg>
        </button>

        <div className="brand-container" onClick={() => onNavigate('dashboard')} style={{ cursor: 'pointer' }}>
          <div className="brand-logo-badge">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="11" y1="8" x2="11" y2="14"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
          </div>
          <div className="brand-title-wrap">
            <span className="brand-title">LocateIt</span>
            <span className="brand-subtitle">Smart Lost & Found</span>
          </div>
        </div>
      </div>

      <div className="navbar-center">
        <div className="nav-search-bar">
          <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search lost wallets, keys, electronics, locations..."
            className="nav-search-input"
          />
          <span className="search-shortcut">⌘K</span>
        </div>
      </div>

      <div className="navbar-right">
        {/* Quick Report Action Dropdown / Button */}
        <button
          className="btn-nav-action"
          onClick={() => onNavigate('report-lost')}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <span>Report Item</span>
        </button>

        {/* Notifications Icon Button */}
        <button
          className={`nav-icon-btn ${activeNav === 'notifications' ? 'active' : ''}`}
          onClick={() => onNavigate('notifications')}
          aria-label="View notifications"
          title="Notifications"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          <span className="notif-badge">3</span>
        </button>

        {/* User Profile Pill */}
        <div
          className={`nav-user-pill ${activeNav === 'profile' ? 'active' : ''}`}
          onClick={() => onNavigate('profile')}
          title="View profile"
        >
          <div className="user-avatar">
            <span>AR</span>
          </div>
          <div className="user-info-text">
            <span className="user-name">Alex Rivera</span>
            <span className="user-role">Campus Member</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
