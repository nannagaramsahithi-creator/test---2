import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const MainLayout = ({ activeNav, onNavigate, children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebarMobile = () => {
    setIsSidebarOpen(false);
  };

  // Get current breadcrumb and page title
  const getPageInfo = () => {
    switch (activeNav) {
      case 'dashboard':
        return {
          title: 'Dashboard Overview',
          subtitle: 'Real-time overview of lost and found items, matches, and recovery activities.',
          badge: 'Live Operations',
        };
      case 'report-lost':
        return {
          title: 'Report Lost Item',
          subtitle: 'Submit comprehensive details and photos of your missing belonging.',
          badge: 'Missing Report',
        };
      case 'report-found':
        return {
          title: 'Report Found Item',
          subtitle: 'Found something that belongs to someone else? Log it here for smart matching.',
          badge: 'Discovered Item',
        };
      case 'view-reports':
        return {
          title: 'Explore & Search Reports',
          subtitle: 'Search and filter active reports by category, campus zone, location, and date.',
          badge: 'Public Directory',
        };
      case 'my-reports':
        return {
          title: 'My Submitted Reports',
          subtitle: 'Manage your filed reports, track match confidence scores, and resolve claims.',
          badge: 'Personal Activity',
        };
      case 'notifications':
        return {
          title: 'Notification Center',
          subtitle: 'Automated match alerts, chat pings, and recovery coordination updates.',
          badge: '3 Unread',
        };
      case 'profile':
        return {
          title: 'User Profile & Settings',
          subtitle: 'Manage contact information, trusted notification channels, and privacy preferences.',
          badge: 'Account Verified',
        };
      default:
        return {
          title: 'Lost & Found Platform',
          subtitle: 'Smart item matching and recovery coordination.',
          badge: 'Connected',
        };
    }
  };

  const pageInfo = getPageInfo();

  return (
    <div className="main-layout-root">
      {/* Top Fixed / Sticky Navigation Bar */}
      <Navbar
        activeNav={activeNav}
        onNavigate={onNavigate}
        onToggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />

      {/* Body Area: Sidebar + Scrollable Content */}
      <div className="layout-body-wrapper">
        <Sidebar
          activeNav={activeNav}
          onNavigate={onNavigate}
          isOpen={isSidebarOpen}
          onCloseMobile={closeSidebarMobile}
        />

        <main className="layout-main-content">
          <div className="content-container">
            {/* Standardized Page Banner / Header (Hidden on Landing / Dashboard) */}
            {activeNav !== 'dashboard' && activeNav !== 'home' && (
              <div className="page-header-bar">
                <div className="page-header-text">
                  <div className="page-badge-row">
                    <span className="page-badge">{pageInfo.badge}</span>
                    <span className="breadcrumb-path">
                      Lost & Found / <strong style={{ color: '#f8fafc' }}>{pageInfo.title}</strong>
                    </span>
                  </div>
                  <h1 className="page-title">{pageInfo.title}</h1>
                  <p className="page-subtitle">{pageInfo.subtitle}</p>
                </div>

                {/* Header Context Action Buttons */}
                <div className="page-header-actions">
                  <button
                    className="btn-header-secondary"
                    onClick={() => onNavigate('view-reports')}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <span>Search All</span>
                  </button>
                  <button
                    className="btn-header-primary"
                    onClick={() => onNavigate('report-lost')}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    <span>Report Lost</span>
                  </button>
                </div>
              </div>
            )}

            {/* Dynamic View Body Slot */}
            <div className="page-content-slot">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
