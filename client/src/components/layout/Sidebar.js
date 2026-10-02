import React from 'react';

const Sidebar = ({ activeNav, onNavigate, isOpen, onCloseMobile }) => {
  const navSections = [
    {
      label: 'MAIN',
      items: [
        {
          id: 'dashboard',
          label: 'Dashboard',
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="9"></rect>
              <rect x="14" y="3" width="7" height="5"></rect>
              <rect x="14" y="12" width="7" height="9"></rect>
              <rect x="3" y="16" width="7" height="5"></rect>
            </svg>
          ),
          badge: null,
        },
      ],
    },
    {
      label: 'ITEM REPORTING',
      items: [
        {
          id: 'report-lost',
          label: 'Report Lost',
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          ),
          badge: { text: 'Missing', type: 'warning' },
        },
        {
          id: 'report-found',
          label: 'Report Found',
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          ),
          badge: { text: 'Discovered', type: 'success' },
        },
      ],
    },
    {
      label: 'EXPLORE & TRACK',
      items: [
        {
          id: 'view-reports',
          label: 'View Reports',
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
            </svg>
          ),
          badge: null,
        },
        {
          id: 'my-reports',
          label: 'My Reports',
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
            </svg>
          ),
          badge: { text: '2 Active', type: 'neutral' },
        },
      ],
    },
    {
      label: 'ACCOUNT & ALERTS',
      items: [
        {
          id: 'notifications',
          label: 'Notifications',
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          ),
          badge: { text: '3 New', type: 'info' },
        },
        {
          id: 'profile',
          label: 'Profile',
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          ),
          badge: null,
        },
      ],
    },
  ];

  const handleItemClick = (id) => {
    onNavigate(id);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <>
      {/* Mobile Overlay Backdrop */}
      {isOpen && (
        <div
          className="sidebar-backdrop"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside className={`app-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-inner">
          <nav className="sidebar-nav">
            {navSections.map((section, idx) => (
              <div key={idx} className="nav-group">
                <span className="nav-group-label">{section.label}</span>
                <ul className="nav-list">
                  {section.items.map((item) => {
                    const isActive = activeNav === item.id;
                    return (
                      <li key={item.id} className="nav-item">
                        <button
                          className={`nav-link-btn ${isActive ? 'active' : ''}`}
                          onClick={() => handleItemClick(item.id)}
                        >
                          <span className="nav-link-icon">{item.icon}</span>
                          <span className="nav-link-text">{item.label}</span>
                          {item.badge && (
                            <span className={`nav-link-badge badge-${item.badge.type}`}>
                              {item.badge.text}
                            </span>
                          )}
                          {isActive && <span className="active-glow-bar" />}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>

          {/* Sidebar Footer Widget */}
          <div className="sidebar-footer-card">
            <div className="system-status-indicator">
              <span className="pulse-circle" />
              <div className="system-status-text">
                <span className="status-heading">Smart Recovery AI</span>
                <span className="status-sub">Matching Engine Active</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
