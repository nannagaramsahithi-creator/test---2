import React, { useState } from 'react';
import {
  mockDashboardStats,
  mockRecentMatches,
  mockRecentActivity,
} from '../data/mockDashboardData';

const DashboardView = ({ onNavigate }) => {
  // State for filtering matches
  const [matchFilter, setMatchFilter] = useState('all'); // 'all' | 'high' | 'pending'
  // State for filtering activity
  const [activityFilter, setActivityFilter] = useState('all'); // 'all' | 'match' | 'report' | 'recovered'
  // State for interactive modal
  const [selectedMatch, setSelectedMatch] = useState(null);
  // State for confirmed or dismissed matches
  const [confirmedMatchIds, setConfirmedMatchIds] = useState([]);
  const [dismissedMatchIds, setDismissedMatchIds] = useState([]);
  // Toast notification state
  const [toastMessage, setToastMessage] = useState(null);

  // Show temporary toast notification
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  // Filtered matches
  const filteredMatches = mockRecentMatches.filter((match) => {
    if (dismissedMatchIds.includes(match.id)) return false;
    if (matchFilter === 'high') return match.score >= 90;
    if (matchFilter === 'pending') return match.status.toLowerCase().includes('pending') || match.status.toLowerCase().includes('verification');
    return true;
  });

  // Filtered activities
  const filteredActivities = mockRecentActivity.filter((act) => {
    if (activityFilter === 'all') return true;
    if (activityFilter === 'match') return act.type === 'match';
    if (activityFilter === 'report') return act.type === 'lost' || act.type === 'found';
    if (activityFilter === 'recovered') return act.type === 'recovered' || act.type === 'verification';
    return true;
  });

  // Handle Match Confirmation
  const handleConfirmMatch = (match, e) => {
    if (e) e.stopPropagation();
    if (!confirmedMatchIds.includes(match.id)) {
      setConfirmedMatchIds((prev) => [...prev, match.id]);
      triggerToast(`✅ Match confirmed! Custody desk alerted for ${match.foundItem.title}.`);
    } else {
      triggerToast(`ℹ️ This match is already confirmed.`);
    }
  };

  // Handle Match Dismissal
  const handleDismissMatch = (matchId, e) => {
    if (e) e.stopPropagation();
    setDismissedMatchIds((prev) => [...prev, matchId]);
    if (selectedMatch && selectedMatch.id === matchId) {
      setSelectedMatch(null);
    }
    triggerToast(`Match dismissed from your priority queue.`);
  };

  // Score color helper
  const getScoreColor = (score) => {
    if (score >= 90) return { bg: 'rgba(16, 185, 129, 0.15)', text: '#10b981', border: 'rgba(16, 185, 129, 0.35)' };
    if (score >= 80) return { bg: 'rgba(6, 182, 212, 0.15)', text: '#06b6d4', border: 'rgba(6, 182, 212, 0.35)' };
    return { bg: 'rgba(245, 158, 11, 0.15)', text: '#f59e0b', border: 'rgba(245, 158, 11, 0.35)' };
  };

  return (
    <div className="dashboard-root">
      {/* ============================================================== */}
      {/* 1. DASHBOARD WELCOME & ACTION BAR                              */}
      {/* ============================================================== */}
      <section className="dashboard-welcome-banner">
        <div className="welcome-content">
          <div className="welcome-badge-row">
            <span className="live-engine-pill">
              <span className="pulse-dot" />
              <span>Smart Vector AI Engine Online</span>
            </span>
            <span className="welcome-date">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>

          <h1 className="welcome-heading">
            Campus Recovery Dashboard
          </h1>
          <p className="welcome-subtitle">
            Live overview of missing reports, turned-in belongings, and algorithmic cross-matches across all campus zones.
          </p>
        </div>

        <div className="welcome-actions">
          <button
            id="dash-btn-report-lost"
            className="btn-dash-primary lost-accent"
            onClick={() => onNavigate('report-lost')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>+ Report Lost Item</span>
          </button>

          <button
            id="dash-btn-report-found"
            className="btn-dash-primary found-accent"
            onClick={() => onNavigate('report-found')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>+ Report Found Item</span>
          </button>

          <button
            id="dash-btn-browse-directory"
            className="btn-dash-secondary"
            onClick={() => onNavigate('view-reports')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <span>Browse Reports</span>
          </button>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. SUMMARY CARDS (KPIs)                                        */}
      {/* ============================================================== */}
      <section className="dashboard-summary-section" aria-label="Summary Statistics">
        <div className="summary-cards-grid">
          {/* Card 1: Total Lost Reports */}
          <div
            className="summary-card card-kpi-lost"
            onClick={() => onNavigate('view-reports')}
            title="Click to view all active lost reports"
          >
            <div className="summary-card-header">
              <div className="summary-icon-wrap lost-icon-wrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <span className="summary-trend trend-rose">
                {mockDashboardStats.totalLost.trend}
              </span>
            </div>

            <div className="summary-body">
              <span className="summary-count">{mockDashboardStats.totalLost.count}</span>
              <h2 className="summary-title">{mockDashboardStats.totalLost.label}</h2>
              <p className="summary-subtext">{mockDashboardStats.totalLost.subtext}</p>
            </div>

            <div className="summary-footer">
              <span className="summary-action-link">View all lost items →</span>
            </div>
            <div className="summary-glow-accent lost-glow" />
          </div>

          {/* Card 2: Total Found Reports */}
          <div
            className="summary-card card-kpi-found"
            onClick={() => onNavigate('view-reports')}
            title="Click to view all turned-in found reports"
          >
            <div className="summary-card-header">
              <div className="summary-icon-wrap found-icon-wrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <span className="summary-trend trend-emerald">
                {mockDashboardStats.totalFound.trend}
              </span>
            </div>

            <div className="summary-body">
              <span className="summary-count">{mockDashboardStats.totalFound.count}</span>
              <h2 className="summary-title">{mockDashboardStats.totalFound.label}</h2>
              <p className="summary-subtext">{mockDashboardStats.totalFound.subtext}</p>
            </div>

            <div className="summary-footer">
              <span className="summary-action-link">Inspect found items →</span>
            </div>
            <div className="summary-glow-accent found-glow" />
          </div>

          {/* Card 3: Potential Matches */}
          <div
            className="summary-card card-kpi-matches"
            onClick={() => {
              setMatchFilter('all');
              const el = document.getElementById('recent-matches-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            title="Click to jump to Recent Matches"
          >
            <div className="summary-card-header">
              <div className="summary-icon-wrap matches-icon-wrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
              </div>
              <span className="summary-trend trend-alert">
                <span className="pulse-mini" />
                {mockDashboardStats.potentialMatches.trend}
              </span>
            </div>

            <div className="summary-body">
              <span className="summary-count">{mockDashboardStats.potentialMatches.count}</span>
              <h2 className="summary-title">{mockDashboardStats.potentialMatches.label}</h2>
              <p className="summary-subtext">{mockDashboardStats.potentialMatches.subtext}</p>
            </div>

            <div className="summary-footer">
              <span className="summary-action-link">Review pending matches →</span>
            </div>
            <div className="summary-glow-accent match-glow" />
          </div>

          {/* Card 4: Recovered Items */}
          <div
            className="summary-card card-kpi-recovered"
            onClick={() => onNavigate('my-reports')}
            title="Click to view resolved and recovered reports"
          >
            <div className="summary-card-header">
              <div className="summary-icon-wrap recovered-icon-wrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <span className="summary-trend trend-violet">
                {mockDashboardStats.recoveredItems.trend}
              </span>
            </div>

            <div className="summary-body">
              <span className="summary-count">{mockDashboardStats.recoveredItems.count}</span>
              <h2 className="summary-title">{mockDashboardStats.recoveredItems.label}</h2>
              <p className="summary-subtext">{mockDashboardStats.recoveredItems.subtext}</p>
            </div>

            <div className="summary-footer">
              <span className="summary-action-link">View reunion records →</span>
            </div>
            <div className="summary-glow-accent recovered-glow" />
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. MAIN DASHBOARD CONTENT (SPLIT COLUMNS)                      */}
      {/* ============================================================== */}
      <div className="dashboard-main-grid">
        {/* ============================================================== */}
        {/* LEFT COLUMN: RECENT MATCHES SECTION                            */}
        {/* ============================================================== */}
        <section
          id="recent-matches-section"
          className="dashboard-section recent-matches-panel"
          aria-label="Recent Matches"
        >
          <div className="section-panel-header">
            <div className="header-title-group">
              <div className="section-badge-icon match-header-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
              </div>
              <div>
                <h3 className="section-title">Recent Matches</h3>
                <p className="section-description">
                  Automated similarity analysis matching lost item reports with turned-in campus inventory.
                </p>
              </div>
            </div>

            {/* Match Filter Tabs */}
            <div className="filter-pill-group">
              <button
                className={`filter-pill-btn ${matchFilter === 'all' ? 'active' : ''}`}
                onClick={() => setMatchFilter('all')}
              >
                All Matches ({mockRecentMatches.length - dismissedMatchIds.length})
              </button>
              <button
                className={`filter-pill-btn ${matchFilter === 'high' ? 'active' : ''}`}
                onClick={() => setMatchFilter('high')}
              >
                High Confidence (&gt;90%)
              </button>
              <button
                className={`filter-pill-btn ${matchFilter === 'pending' ? 'active' : ''}`}
                onClick={() => setMatchFilter('pending')}
              >
                Action Needed
              </button>
            </div>
          </div>

          {/* Matches List */}
          <div className="matches-list-container">
            {filteredMatches.length === 0 ? (
              <div className="empty-matches-state">
                <div className="empty-matches-icon">✨</div>
                <h4>No matches in this filter</h4>
                <p>All high-priority matches have been addressed or dismissed.</p>
                <button
                  className="btn-empty-reset"
                  onClick={() => {
                    setMatchFilter('all');
                    setDismissedMatchIds([]);
                  }}
                >
                  Reset Filter & Restore Dismissed
                </button>
              </div>
            ) : (
              filteredMatches.map((match) => {
                const colors = getScoreColor(match.score);
                const isConfirmed = confirmedMatchIds.includes(match.id);

                return (
                  <article
                    key={match.id}
                    className={`match-card ${isConfirmed ? 'is-confirmed' : ''}`}
                    onClick={() => setSelectedMatch(match)}
                  >
                    {/* Top Row: Score Badge + Status Tag + Actions */}
                    <div className="match-card-topbar">
                      <div className="match-score-badge" style={{ background: colors.bg, color: colors.text, borderColor: colors.border }}>
                        <span className="score-number">{match.score}%</span>
                        <span className="score-label">Match Score</span>
                      </div>

                      <div className="match-status-wrap">
                        {isConfirmed ? (
                          <span className="match-status-tag status-confirmed">
                            ✓ Match Confirmed
                          </span>
                        ) : (
                          <span className={`match-status-tag status-${match.urgency}`}>
                            {match.status}
                          </span>
                        )}
                      </div>

                      <div className="match-card-actions-quick" onClick={(e) => e.stopPropagation()}>
                        <button
                          className="btn-quick-dismiss"
                          onClick={(e) => handleDismissMatch(match.id, e)}
                          title="Dismiss this match"
                          aria-label="Dismiss match"
                        >
                          ✕
                        </button>
                      </div>
                    </div>

                    {/* Side-by-Side Comparison Container */}
                    <div className="match-items-comparison">
                      {/* Lost Item Details */}
                      <div className="comparison-side side-lost">
                        <div className="side-indicator-tag lost-tag">
                          <span>Reported Lost</span>
                        </div>
                        <div className="item-content-wrap">
                          <span className="item-category-emoji">{match.lostItem.icon}</span>
                          <div className="item-text-info">
                            <h4 className="item-title">{match.lostItem.title}</h4>
                            <div className="item-meta-row">
                              <span className="meta-item">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                {match.lostItem.owner}
                              </span>
                              <span className="meta-item">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                {match.lostItem.location}
                              </span>
                              <span className="meta-item">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                {match.lostItem.date}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Matching Arrow Divider */}
                      <div className="comparison-divider">
                        <div className="divider-arrow-circle">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                          </svg>
                        </div>
                      </div>

                      {/* Found Item Details */}
                      <div className="comparison-side side-found">
                        <div className="side-indicator-tag found-tag">
                          <span>Discovered & Held</span>
                        </div>
                        <div className="item-content-wrap">
                          <span className="item-category-emoji">{match.foundItem.icon}</span>
                          <div className="item-text-info">
                            <h4 className="item-title">{match.foundItem.title}</h4>
                            <div className="item-meta-row">
                              <span className="meta-item">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                                {match.foundItem.custody}
                              </span>
                              <span className="meta-item">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                {match.foundItem.date}
                              </span>
                              <span className="meta-item finder-name">
                                Logged by: {match.foundItem.finder}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Match Factors / AI Tags */}
                    <div className="match-factors-row">
                      <span className="factors-label">Match Factors:</span>
                      <div className="factor-tags">
                        {match.matchFactors.map((factor, fIdx) => (
                          <span key={fIdx} className="factor-tag">
                            ✓ {factor}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="match-card-bottom" onClick={(e) => e.stopPropagation()}>
                      <button
                        className="btn-match-details"
                        onClick={() => setSelectedMatch(match)}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        <span>Review Full Match Details</span>
                      </button>

                      <div className="match-btn-group-right">
                        {!isConfirmed ? (
                          <button
                            className="btn-match-confirm"
                            onClick={(e) => handleConfirmMatch(match, e)}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            <span>Confirm Match</span>
                          </button>
                        ) : (
                          <span className="confirmed-pill">
                            ✓ Alerted Desk
                          </span>
                        )}
                        <button
                          className="btn-match-dismiss"
                          onClick={(e) => handleDismissMatch(match.id, e)}
                        >
                          Not a Match
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </section>

        {/* ============================================================== */}
        {/* RIGHT COLUMN: RECENT ACTIVITY & CAMPUS HOTSPOTS               */}
        {/* ============================================================== */}
        <div className="dashboard-sidebar-column">
          {/* Recent Activity Section */}
          <section className="dashboard-section recent-activity-panel" aria-label="Recent Activity">
            <div className="section-panel-header">
              <div className="header-title-group">
                <div className="section-badge-icon activity-header-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="section-title">Recent Activity</h3>
                  <p className="section-description">Real-time campus reporting & match stream</p>
                </div>
              </div>

              {/* Activity Filter Tabs */}
              <div className="activity-filter-pills">
                <button
                  className={`activity-tab ${activityFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setActivityFilter('all')}
                >
                  All
                </button>
                <button
                  className={`activity-tab ${activityFilter === 'match' ? 'active' : ''}`}
                  onClick={() => setActivityFilter('match')}
                >
                  Matches
                </button>
                <button
                  className={`activity-tab ${activityFilter === 'report' ? 'active' : ''}`}
                  onClick={() => setActivityFilter('report')}
                >
                  Reports
                </button>
              </div>
            </div>

            {/* Activity Stream Feed */}
            <div className="activity-stream">
              {filteredActivities.map((act, idx) => (
                <div key={act.id} className="activity-stream-item">
                  {/* Timeline Node */}
                  <div className="activity-timeline-indicator">
                    <div className={`activity-icon-badge badge-type-${act.type}`}>
                      <span>{act.icon}</span>
                    </div>
                    {idx !== filteredActivities.length - 1 && (
                      <div className="activity-timeline-line" />
                    )}
                  </div>

                  {/* Activity Details Card */}
                  <div className="activity-content-box">
                    <div className="activity-top-line">
                      <span className={`activity-pill ${act.badgeColor}`}>
                        {act.badge}
                      </span>
                      <span className="activity-timestamp">
                        {act.time}
                      </span>
                    </div>

                    <h4 className="activity-item-title">{act.title}</h4>
                    <p className="activity-item-desc">{act.description}</p>

                    <div className="activity-action-row">
                      <button
                        className="btn-activity-action"
                        onClick={() => {
                          if (act.type === 'match') {
                            const found = mockRecentMatches.find((m) => m.id === 'match-1');
                            if (found) setSelectedMatch(found);
                          } else {
                            onNavigate(act.navTarget);
                          }
                        }}
                      >
                        <span>{act.actionText}</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="activity-panel-footer">
              <button
                className="btn-view-all-activity"
                onClick={() => onNavigate('view-reports')}
              >
                Explore Full Reports Directory →
              </button>
            </div>
          </section>

          {/* Campus Hotspots Widget */}
          <section className="dashboard-section campus-hotspots-card" aria-label="Campus Hotspots">
            <div className="hotspots-header">
              <div className="hotspots-title-wrap">
                <span className="hotspot-emoji">📍</span>
                <div>
                  <h4 className="hotspots-title">Campus Hotspots</h4>
                  <span className="hotspots-sub">Active lost & found zones</span>
                </div>
              </div>
              <span className="hotspots-live-badge">Live Map</span>
            </div>

            <div className="hotspot-zones-grid">
              <div className="hotspot-zone-chip" onClick={() => onNavigate('view-reports')}>
                <span className="zone-name">Central Library</span>
                <span className="zone-count count-high">14 reports</span>
              </div>
              <div className="hotspot-zone-chip" onClick={() => onNavigate('view-reports')}>
                <span className="zone-name">Student Union</span>
                <span className="zone-count count-med">9 reports</span>
              </div>
              <div className="hotspot-zone-chip" onClick={() => onNavigate('view-reports')}>
                <span className="zone-name">Sports Center</span>
                <span className="zone-count count-med">7 reports</span>
              </div>
              <div className="hotspot-zone-chip" onClick={() => onNavigate('view-reports')}>
                <span className="zone-name">Science Quad</span>
                <span className="zone-count count-low">6 reports</span>
              </div>
              <div className="hotspot-zone-chip" onClick={() => onNavigate('view-reports')}>
                <span className="zone-name">West Deck</span>
                <span className="zone-count count-low">4 reports</span>
              </div>
            </div>

            <div className="campus-safety-callout">
              <span className="safety-shield-icon">🛡️</span>
              <p className="safety-text">
                Items in custody can be verified & retrieved at the respective front desk during operating hours (8 AM - 9 PM).
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 4. INTERACTIVE MATCH DETAIL MODAL                              */}
      {/* ============================================================== */}
      {selectedMatch && (
        <div
          className="match-modal-backdrop"
          onClick={() => setSelectedMatch(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-match-title"
        >
          <div
            className="match-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="modal-header">
              <div className="modal-header-left">
                <div
                  className="modal-score-circle"
                  style={{
                    background: getScoreColor(selectedMatch.score).bg,
                    color: getScoreColor(selectedMatch.score).text,
                    border: `2px solid ${getScoreColor(selectedMatch.score).border}`,
                  }}
                >
                  <span className="score-val">{selectedMatch.score}%</span>
                  <span className="score-txt">Score</span>
                </div>
                <div>
                  <h3 id="modal-match-title" className="modal-title">
                    Match Inspection & Verification
                  </h3>
                  <p className="modal-subtitle">
                    Automated similarity confidence calculated from campus reporting metadata
                  </p>
                </div>
              </div>

              <button
                className="btn-modal-close"
                onClick={() => setSelectedMatch(null)}
                aria-label="Close match dialog"
              >
                ✕
              </button>
            </div>

            {/* Modal Comparison Grid */}
            <div className="modal-comparison-grid">
              {/* Lost Item Details */}
              <div className="modal-item-card lost-border">
                <div className="modal-card-badge lost-badge">
                  <span>LOST REPORT</span>
                </div>
                <div className="modal-item-header">
                  <span className="modal-item-icon">{selectedMatch.lostItem.icon}</span>
                  <div>
                    <h4 className="modal-item-name">{selectedMatch.lostItem.title}</h4>
                    <span className="modal-item-category">{selectedMatch.lostItem.category}</span>
                  </div>
                </div>

                <div className="modal-metadata-list">
                  <div className="modal-meta-row">
                    <span className="meta-key">Reported By:</span>
                    <span className="meta-val">{selectedMatch.lostItem.owner}</span>
                  </div>
                  <div className="modal-meta-row">
                    <span className="meta-key">Lost Location:</span>
                    <span className="meta-val">{selectedMatch.lostItem.location}</span>
                  </div>
                  <div className="modal-meta-row">
                    <span className="meta-key">Timestamp:</span>
                    <span className="meta-val">{selectedMatch.lostItem.date}</span>
                  </div>
                  <div className="modal-meta-row">
                    <span className="meta-key">Report Status:</span>
                    <span className="meta-val status-pill-active">Active Search</span>
                  </div>
                </div>
              </div>

              {/* Found Item Details */}
              <div className="modal-item-card found-border">
                <div className="modal-card-badge found-badge">
                  <span>FOUND & IN CUSTODY</span>
                </div>
                <div className="modal-item-header">
                  <span className="modal-item-icon">{selectedMatch.foundItem.icon}</span>
                  <div>
                    <h4 className="modal-item-name">{selectedMatch.foundItem.title}</h4>
                    <span className="modal-item-category">{selectedMatch.foundItem.category}</span>
                  </div>
                </div>

                <div className="modal-metadata-list">
                  <div className="modal-meta-row">
                    <span className="meta-key">Current Custody:</span>
                    <span className="meta-val highlight-custody">{selectedMatch.foundItem.custody}</span>
                  </div>
                  <div className="modal-meta-row">
                    <span className="meta-key">Found By:</span>
                    <span className="meta-val">{selectedMatch.foundItem.finder}</span>
                  </div>
                  <div className="modal-meta-row">
                    <span className="meta-key">Timestamp:</span>
                    <span className="meta-val">{selectedMatch.foundItem.date}</span>
                  </div>
                  <div className="modal-meta-row">
                    <span className="meta-key">Storage Status:</span>
                    <span className="meta-val status-pill-secure">Secure Locked Storage</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Match Factor Confidence Bars */}
            <div className="modal-factors-section">
              <h4 className="factors-heading">Algorithmic Correlation Breakdown</h4>
              <div className="factor-bars-grid">
                <div className="factor-bar-item">
                  <div className="bar-label-row">
                    <span>Category & Classification</span>
                    <strong style={{ color: '#10b981' }}>100%</strong>
                  </div>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: '100%', background: '#10b981' }} />
                  </div>
                </div>

                <div className="factor-bar-item">
                  <div className="bar-label-row">
                    <span>Location Proximity (Campus Map)</span>
                    <strong style={{ color: '#06b6d4' }}>96%</strong>
                  </div>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: '96%', background: '#06b6d4' }} />
                  </div>
                </div>

                <div className="factor-bar-item">
                  <div className="bar-label-row">
                    <span>Time Window Correlation</span>
                    <strong style={{ color: '#06b6d4' }}>92%</strong>
                  </div>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: '92%', background: '#06b6d4' }} />
                  </div>
                </div>

                <div className="factor-bar-item">
                  <div className="bar-label-row">
                    <span>Visual & Keyword Attributes</span>
                    <strong style={{ color: '#8b5cf6' }}>89%</strong>
                  </div>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: '89%', background: '#8b5cf6' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Verification Checklist */}
            <div className="modal-verification-box">
              <h4 className="verification-title">Owner Verification Protocol</h4>
              <ul className="verification-steps">
                <li>Show photo student or staff ID at <strong>{selectedMatch.foundItem.custody}</strong>.</li>
                <li>Provide identifying mark, contents, or PIN/passcode verification.</li>
                <li>Sign physical or digital release acknowledgment.</li>
              </ul>
            </div>

            {/* Modal Actions */}
            <div className="modal-footer-actions">
              <button
                className="btn-modal-cancel"
                onClick={() => setSelectedMatch(null)}
              >
                Close View
              </button>
              <button
                className="btn-modal-not-match"
                onClick={() => handleDismissMatch(selectedMatch.id)}
              >
                Flag as Incorrect Match
              </button>
              <button
                className="btn-modal-confirm-primary"
                onClick={() => {
                  handleConfirmMatch(selectedMatch);
                  setSelectedMatch(null);
                }}
              >
                ✓ Confirm Match & Notify Custody
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 5. FLOATING TOAST NOTIFICATION                                 */}
      {/* ============================================================== */}
      {toastMessage && (
        <div className="dashboard-toast">
          <span className="toast-icon">⚡</span>
          <span className="toast-text">{toastMessage}</span>
          <button
            className="toast-close"
            onClick={() => setToastMessage(null)}
            aria-label="Dismiss toast"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default DashboardView;
