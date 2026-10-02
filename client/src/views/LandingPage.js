import React, { useState } from 'react';
import {
  mockLostItems,
  mockFoundItems,
  mockCategories,
  mockCampusLocations,
} from '../data/mockData';

const LandingPage = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLocation, setSelectedLocation] = useState('All Campus Locations');
  const [selectedItemModal, setSelectedItemModal] = useState(null);

  // Filter function for search bar interaction
  const filterItem = (item) => {
    const matchesSearch =
      searchTerm === '' ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All Categories' || item.category === selectedCategory;

    const matchesLocation =
      selectedLocation === 'All Campus Locations' ||
      item.location.toLowerCase().includes(selectedLocation.toLowerCase());

    return matchesSearch && matchesCategory && matchesLocation;
  };

  const filteredLostItems = mockLostItems.filter(filterItem);
  const filteredFoundItems = mockFoundItems.filter(filterItem);

  return (
    <div className="landing-page-root">
      {/* ============================================================== */}
      {/* 1. HERO SECTION                                                */}
      {/* ============================================================== */}
      <section className="landing-hero">
        <div className="hero-badge-pill">
          <span className="hero-sparkle">✨</span>
          <span>Smart Community Lost & Found Platform</span>
        </div>

        <h1 className="hero-main-heading">
          Lost Something? Found an Item? <br />
          <span className="hero-highlight">We Reconnect You Faster.</span>
        </h1>

        <p className="hero-subtext">
          A centralized, intelligent network for reporting misplaced belongings and discovering found items across campus. Seamlessly matching reports by attributes, timestamp, and location.
        </p>

        {/* Primary Call-to-Action Buttons */}
        <div className="hero-cta-group">
          <button
            className="btn-hero-lost"
            onClick={() => onNavigate('report-lost')}
          >
            <div className="cta-icon-wrap">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <div className="cta-text-wrap">
              <strong>Report Lost Item</strong>
              <span>I misplaced a belonging</span>
            </div>
          </button>

          <button
            className="btn-hero-found"
            onClick={() => onNavigate('report-found')}
          >
            <div className="cta-icon-wrap">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <div className="cta-text-wrap">
              <strong>Report Found Item</strong>
              <span>I discovered property</span>
            </div>
          </button>
        </div>

        {/* Hero Interactive Search Bar */}
        <div className="hero-search-card">
          <div className="search-inputs-grid">
            <div className="search-input-field">
              <span className="input-prefix-icon">🔍</span>
              <input
                type="text"
                placeholder="What are you looking for? (e.g. AirPods, keys, wallet, bottle)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="hero-input"
              />
              {searchTerm && (
                <button
                  className="clear-search-btn"
                  onClick={() => setSearchTerm('')}
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="search-select-field">
              <span className="input-prefix-icon">🏷️</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="hero-select"
              >
                {mockCategories.map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="search-select-field">
              <span className="input-prefix-icon">📍</span>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="hero-select"
              >
                {mockCampusLocations.map((loc, idx) => (
                  <option key={idx} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <button
              className="btn-search-submit"
              onClick={() => onNavigate('view-reports')}
            >
              Browse Directory
            </button>
          </div>

          {(searchTerm || selectedCategory !== 'All Categories' || selectedLocation !== 'All Campus Locations') && (
            <div className="active-filters-bar">
              <span>Showing results for:</span>
              {searchTerm && <span className="filter-pill">Keyword: "{searchTerm}"</span>}
              {selectedCategory !== 'All Categories' && <span className="filter-pill">Category: {selectedCategory}</span>}
              {selectedLocation !== 'All Campus Locations' && <span className="filter-pill">Zone: {selectedLocation}</span>}
              <button
                className="btn-reset-filters"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All Categories');
                  setSelectedLocation('All Campus Locations');
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. LIVE IMPACT METRICS STRIP                                   */}
      {/* ============================================================== */}
      <section className="metrics-strip">
        <div className="metric-item">
          <span className="metric-number">48</span>
          <span className="metric-title">Active Lost Items</span>
          <span className="metric-sub">Across campus zones</span>
        </div>
        <div className="metric-divider" />
        <div className="metric-item">
          <span className="metric-number">35</span>
          <span className="metric-title">Found Belongings</span>
          <span className="metric-sub">In verified safekeeping</span>
        </div>
        <div className="metric-divider" />
        <div className="metric-item">
          <span className="metric-number">89.4%</span>
          <span className="metric-title">Smart Match Rate</span>
          <span className="metric-sub">Location & attribute match</span>
        </div>
        <div className="metric-divider" />
        <div className="metric-item">
          <span className="metric-number">&lt; 24h</span>
          <span className="metric-title">Average Recovery</span>
          <span className="metric-sub">Direct coordinator handoff</span>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. RECENT LOST ITEMS SECTION                                   */}
      {/* ============================================================== */}
      <section className="feed-section">
        <div className="section-header-row">
          <div className="section-title-wrap">
            <div className="section-indicator ind-lost" />
            <div>
              <h2 className="section-title">Recently Reported Lost Items</h2>
              <p className="section-sub">Misplaced belongings actively being searched for by students & staff</p>
            </div>
          </div>
          <button
            className="btn-view-all"
            onClick={() => onNavigate('view-reports')}
          >
            <span>View All Lost Items ({mockLostItems.length})</span>
            <span>→</span>
          </button>
        </div>

        {filteredLostItems.length === 0 ? (
          <div className="empty-feed-card">
            <span className="empty-icon">🔍</span>
            <h4>No matching lost items found</h4>
            <p>Try adjusting your search keyword or selected category/location.</p>
          </div>
        ) : (
          <div className="items-cards-grid">
            {filteredLostItems.map((item) => (
              <div
                key={item.id}
                className="item-card card-lost-item"
                onClick={() => setSelectedItemModal(item)}
              >
                <div className="card-media-banner" style={{ background: item.imageBg }}>
                  <span className="card-item-icon">{item.icon}</span>
                  <div className="card-banner-badges">
                    <span className="badge-category">{item.category}</span>
                    <span className="badge-urgency">{item.urgency}</span>
                  </div>
                </div>

                <div className="card-body">
                  <h3 className="card-title" title={item.title}>{item.title}</h3>
                  <p className="card-desc">{item.description}</p>

                  <div className="card-location-row">
                    <span className="loc-icon">📍</span>
                    <span className="loc-text">{item.location}</span>
                  </div>

                  <div className="card-footer-row">
                    <span className="time-ago">🕒 {item.dateReported}</span>
                    <button
                      className="btn-card-inspect"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedItemModal(item);
                      }}
                    >
                      I Found This →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ============================================================== */}
      {/* 4. RECENT FOUND ITEMS SECTION                                  */}
      {/* ============================================================== */}
      <section className="feed-section" style={{ marginTop: '48px' }}>
        <div className="section-header-row">
          <div className="section-title-wrap">
            <div className="section-indicator ind-found" />
            <div>
              <h2 className="section-title">Recently Reported Found Items</h2>
              <p className="section-sub">Belongings discovered and logged into custody awaiting their rightful owner</p>
            </div>
          </div>
          <button
            className="btn-view-all"
            onClick={() => onNavigate('view-reports')}
          >
            <span>View All Found Items ({mockFoundItems.length})</span>
            <span>→</span>
          </button>
        </div>

        {filteredFoundItems.length === 0 ? (
          <div className="empty-feed-card">
            <span className="empty-icon">🎁</span>
            <h4>No matching found items discovered</h4>
            <p>Try clearing your search filters above.</p>
          </div>
        ) : (
          <div className="items-cards-grid">
            {filteredFoundItems.map((item) => (
              <div
                key={item.id}
                className="item-card card-found-item"
                onClick={() => setSelectedItemModal(item)}
              >
                <div className="card-media-banner" style={{ background: item.imageBg }}>
                  <span className="card-item-icon">{item.icon}</span>
                  <div className="card-banner-badges">
                    <span className="badge-category">{item.category}</span>
                    <span className="badge-status-found">Discovered</span>
                  </div>
                </div>

                <div className="card-body">
                  <h3 className="card-title" title={item.title}>{item.title}</h3>
                  <p className="card-desc">{item.description}</p>

                  <div className="card-location-row custody-row">
                    <span className="loc-icon">🏢</span>
                    <span className="loc-text"><strong>Custody:</strong> {item.custody}</span>
                  </div>

                  <div className="card-location-row" style={{ marginTop: '4px' }}>
                    <span className="loc-icon">📍</span>
                    <span className="loc-text">{item.location}</span>
                  </div>

                  <div className="card-footer-row">
                    <span className="time-ago">🕒 {item.dateReported}</span>
                    <button
                      className="btn-card-claim"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedItemModal(item);
                      }}
                    >
                      Claim Property →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ============================================================== */}
      {/* 5. HOW IT WORKS 3-STEP RECOVERY PROCESS                        */}
      {/* ============================================================== */}
      <section className="workflow-section">
        <div className="workflow-header">
          <span className="workflow-badge">How It Works</span>
          <h2 className="workflow-title">Smart Recovery in 3 Steps</h2>
          <p className="workflow-sub">Built for seamless reporting, verified claiming, and secure handshakes</p>
        </div>

        <div className="workflow-cards-grid">
          <div className="workflow-card">
            <div className="step-num">01</div>
            <div className="step-icon-circle" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171' }}>
              📝
            </div>
            <h3>Report Belonging</h3>
            <p>
              Submit distinctive details, photos, category, and precise campus location in under 60 seconds.
            </p>
          </div>

          <div className="workflow-card">
            <div className="step-num">02</div>
            <div className="step-icon-circle" style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#38bdf8' }}>
              ⚡
            </div>
            <h3>Intelligent Matching</h3>
            <p>
              Our engine compares item attributes, geo-radius, and timestamps to detect high-confidence correlations.
            </p>
          </div>

          <div className="workflow-card">
            <div className="step-num">03</div>
            <div className="step-icon-circle" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
              🤝
            </div>
            <h3>Coordinated Handoff</h3>
            <p>
              Verify ownership through secure security questions, message the finder, and pick up your belonging safely.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* ITEM DETAIL QUICK MODAL                                         */}
      {/* ============================================================== */}
      {selectedItemModal && (
        <div className="modal-backdrop" onClick={() => setSelectedItemModal(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-banner" style={{ background: selectedItemModal.imageBg }}>
              <span className="modal-big-icon">{selectedItemModal.icon}</span>
              <button
                className="btn-close-modal"
                onClick={() => setSelectedItemModal(null)}
              >
                ✕
              </button>
            </div>

            <div className="modal-content-body">
              <div className="modal-tags-row">
                <span className={`pill-status ${selectedItemModal.status === 'Lost' ? 'pill-lost' : 'pill-found'}`}>
                  {selectedItemModal.status === 'Lost' ? '🔴 Lost Report' : '🟢 Found Item'}
                </span>
                <span className="pill-category">{selectedItemModal.category}</span>
                {selectedItemModal.urgency && (
                  <span className="pill-urgency">{selectedItemModal.urgency}</span>
                )}
              </div>

              <h2 className="modal-item-title">{selectedItemModal.title}</h2>
              <p className="modal-item-desc">{selectedItemModal.description}</p>

              <div className="modal-meta-grid">
                <div className="meta-box">
                  <span className="meta-label">Location</span>
                  <span className="meta-val">📍 {selectedItemModal.location}</span>
                </div>
                <div className="meta-box">
                  <span className="meta-label">Timestamp</span>
                  <span className="meta-val">🕒 Reported {selectedItemModal.dateReported}</span>
                </div>
                {selectedItemModal.custody && (
                  <div className="meta-box full-width">
                    <span className="meta-label">Current Custody</span>
                    <span className="meta-val">🏢 {selectedItemModal.custody}</span>
                  </div>
                )}
              </div>

              <div className="modal-action-row">
                {selectedItemModal.status === 'Lost' ? (
                  <button
                    className="btn-modal-primary btn-found-action"
                    onClick={() => {
                      setSelectedItemModal(null);
                      onNavigate('report-found');
                    }}
                  >
                    I Have Found This Item
                  </button>
                ) : (
                  <button
                    className="btn-modal-primary btn-claim-action"
                    onClick={() => {
                      setSelectedItemModal(null);
                      onNavigate('notifications');
                    }}
                  >
                    Initiate Claim for This Item
                  </button>
                )}
                <button
                  className="btn-modal-secondary"
                  onClick={() => setSelectedItemModal(null)}
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
