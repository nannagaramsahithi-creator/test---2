import React from 'react';

export const DashboardView = ({ onNavigate }) => {
  return (
    <div className="view-wrapper">
      {/* KPI Stats Row */}
      <div className="layout-kpi-grid">
        <div className="layout-kpi-card">
          <div className="kpi-icon-wrap" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          </div>
          <div className="kpi-data">
            <span className="kpi-number">48</span>
            <span className="kpi-label">Active Lost Items</span>
          </div>
          <span className="kpi-trend trend-up">↑ 12% this week</span>
        </div>

        <div className="layout-kpi-card">
          <div className="kpi-icon-wrap" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          </div>
          <div className="kpi-data">
            <span className="kpi-number">35</span>
            <span className="kpi-label">Found Belongings</span>
          </div>
          <span className="kpi-trend trend-up">↑ 8 new today</span>
        </div>

        <div className="layout-kpi-card">
          <div className="kpi-icon-wrap" style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#38bdf8' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          </div>
          <div className="kpi-data">
            <span className="kpi-number">89.4%</span>
            <span className="kpi-label">AI Match Accuracy</span>
          </div>
          <span className="kpi-trend trend-neutral">Smart Vector Match</span>
        </div>

        <div className="layout-kpi-card">
          <div className="kpi-icon-wrap" style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#c084fc' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          </div>
          <div className="kpi-data">
            <span className="kpi-number">142</span>
            <span className="kpi-label">Recovered Items</span>
          </div>
          <span className="kpi-trend trend-up">Reunited Owners</span>
        </div>
      </div>

      {/* Action Banners */}
      <div className="layout-hero-cards">
        <div className="action-card card-lost" onClick={() => onNavigate('report-lost')}>
          <div className="action-card-text">
            <span className="action-tag tag-lost">Missing Something?</span>
            <h3>Report a Lost Item</h3>
            <p>Upload details, time, and location. Our automated engine will scan incoming found reports immediately.</p>
            <button className="btn-card-action">File Lost Report →</button>
          </div>
          <div className="action-card-illustration">🔍</div>
        </div>

        <div className="action-card card-found" onClick={() => onNavigate('report-found')}>
          <div className="action-card-text">
            <span className="action-tag tag-found">Found a Belonging?</span>
            <h3>Report a Found Item</h3>
            <p>Help return someone's property by snapping a picture or describing the location where you found it.</p>
            <button className="btn-card-action">File Found Report →</button>
          </div>
          <div className="action-card-illustration">🎁</div>
        </div>
      </div>

      {/* Recent Activity Grid */}
      <div className="layout-split-section">
        <div className="panel-box">
          <div className="panel-box-header">
            <h4>Recent Community Reports</h4>
            <button className="panel-link-btn" onClick={() => onNavigate('view-reports')}>View All →</button>
          </div>
          <div className="activity-list">
            <div className="activity-row">
              <span className="type-dot dot-lost"></span>
              <div className="activity-details">
                <strong>Black Leather Wallet</strong>
                <span>Lost near Central Library • 20 mins ago</span>
              </div>
              <span className="badge-pill pill-warning">Lost</span>
            </div>
            <div className="activity-row">
              <span className="type-dot dot-found"></span>
              <div className="activity-details">
                <strong>MacBook Pro 14" (Silver)</strong>
                <span>Found at Science Building 3rd Floor • 1 hour ago</span>
              </div>
              <span className="badge-pill pill-success">Found</span>
            </div>
            <div className="activity-row">
              <span className="type-dot dot-match"></span>
              <div className="activity-details">
                <strong>Car Keys with Blue Lanyard</strong>
                <span>Potential 96% Match Detected! • 2 hours ago</span>
              </div>
              <span className="badge-pill pill-info">Matched</span>
            </div>
          </div>
        </div>

        <div className="panel-box">
          <div className="panel-box-header">
            <h4>Quick Campus Zones</h4>
            <span className="panel-note">Discovery Hotspots</span>
          </div>
          <div className="zone-chips">
            <span className="zone-chip">📍 Main Library (14)</span>
            <span className="zone-chip">📍 Student Center (9)</span>
            <span className="zone-chip">📍 Sports Complex (7)</span>
            <span className="zone-chip">📍 Cafeteria A (6)</span>
            <span className="zone-chip">📍 Engineering Quad (5)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ReportLostView = () => (
  <div className="view-wrapper">
    <div className="view-placeholder-card">
      <div className="view-placeholder-icon" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171' }}>
        🔍
      </div>
      <h3>Report Lost Item Form</h3>
      <p>Submit item title, category, date/time lost, campus location, and description.</p>
      <div className="placeholder-form-grid">
        <input className="input-field" placeholder="Item Name (e.g. Blue Hydroflask Water Bottle)" disabled />
        <input className="input-field" placeholder="Lost Location / Landmark" disabled />
        <textarea className="input-field" placeholder="Distinctive marks, stickers, color, or serial number..." rows="3" disabled />
      </div>
      <span className="placeholder-tag">Ready for Form Fields & Logic Implementation</span>
    </div>
  </div>
);

export const ReportFoundView = () => (
  <div className="view-wrapper">
    <div className="view-placeholder-card">
      <div className="view-placeholder-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
        🎁
      </div>
      <h3>Report Found Item Form</h3>
      <p>Log a found item, drop-off location or current custody details, and photos.</p>
      <div className="placeholder-form-grid">
        <input className="input-field" placeholder="Found Item Name (e.g. Wireless AirPods Case)" disabled />
        <input className="input-field" placeholder="Discovered Location (e.g. Room 204)" disabled />
        <textarea className="input-field" placeholder="Current holding location (e.g. Campus Security Desk)" rows="3" disabled />
      </div>
      <span className="placeholder-tag">Ready for Form Fields & Logic Implementation</span>
    </div>
  </div>
);

export const ViewReportsView = () => (
  <div className="view-wrapper">
    <div className="view-placeholder-card">
      <div className="view-placeholder-icon" style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#38bdf8' }}>
        🧭
      </div>
      <h3>Public Lost & Found Directory</h3>
      <p>Search and filter all community reports by status, category, date, and radius.</p>
      <div className="filter-chips-row">
        <span className="filter-chip active">All Reports (83)</span>
        <span className="filter-chip">🔴 Lost Items (48)</span>
        <span className="filter-chip">🟢 Found Items (35)</span>
        <span className="filter-chip">⭐ Recently Recovered</span>
      </div>
      <span className="placeholder-tag">Ready for Filterable Item Catalog Implementation</span>
    </div>
  </div>
);

export const MyReportsView = () => (
  <div className="view-wrapper">
    <div className="view-placeholder-card">
      <div className="view-placeholder-icon" style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#c084fc' }}>
        📁
      </div>
      <h3>My Reports & Activity</h3>
      <p>Track your submitted lost/found items, view intelligent matching candidates, and manage recovery handshakes.</p>
      <div className="my-reports-sample-list">
        <div className="activity-row">
          <span>🎒 Navy Herschel Backpack</span>
          <span className="badge-pill pill-warning">Lost • In Review</span>
        </div>
        <div className="activity-row">
          <span>🔑 Toyota Car Key Fob</span>
          <span className="badge-pill pill-info">Matched (94% Match)</span>
        </div>
      </div>
      <span className="placeholder-tag">Ready for Personal Item Management Implementation</span>
    </div>
  </div>
);

export const NotificationsView = () => (
  <div className="view-wrapper">
    <div className="view-placeholder-card">
      <div className="view-placeholder-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
        🔔
      </div>
      <h3>Notification Center</h3>
      <p>Stay updated on potential matches, verification questions, and secure claim requests.</p>
      <div className="notif-sample-list">
        <div className="notif-sample-item">
          <strong>⚡ High-Confidence Match:</strong> A found report matches your lost "Navy Herschel Backpack" in Central Library.
        </div>
        <div className="notif-sample-item">
          <strong>💬 New Message:</strong> Campus Security sent a verification photo for your claim.
        </div>
      </div>
      <span className="placeholder-tag">Ready for Live Notifications & Real-Time Alerts</span>
    </div>
  </div>
);

export const ProfileView = () => (
  <div className="view-wrapper">
    <div className="view-placeholder-card">
      <div className="view-placeholder-icon" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa' }}>
        👤
      </div>
      <h3>User Profile & Settings</h3>
      <p>Manage your contact verification, preferred recovery meetup spots, and privacy settings.</p>
      <div className="profile-placeholder-summary">
        <div><strong>Name:</strong> Alex Rivera</div>
        <div><strong>Campus Email:</strong> alex.rivera@university.edu</div>
        <div><strong>Verification Status:</strong> Verified Campus Member (Badge ID #8921)</div>
      </div>
      <span className="placeholder-tag">Ready for Profile & Preferences Configuration</span>
    </div>
  </div>
);
