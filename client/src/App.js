import React, { useState } from 'react';
import MainLayout from './components/layout/MainLayout';
import LandingPage from './views/LandingPage';
import DashboardView from './views/DashboardView';
import {
  ReportLostView,
  ReportFoundView,
  ViewReportsView,
  MyReportsView,
  NotificationsView,
  ProfileView,
} from './views/NavigationViews';
import './App.css';

function App() {
  const [activeNav, setActiveNav] = useState('dashboard');

  const renderActiveView = () => {
    switch (activeNav) {
      case 'dashboard':
        return <DashboardView onNavigate={setActiveNav} />;
      case 'home':
      case 'landing':
        return <LandingPage onNavigate={setActiveNav} />;
      case 'report-lost':
        return <ReportLostView onNavigate={setActiveNav} />;
      case 'report-found':
        return <ReportFoundView onNavigate={setActiveNav} />;
      case 'view-reports':
        return <ViewReportsView onNavigate={setActiveNav} />;
      case 'my-reports':
        return <MyReportsView onNavigate={setActiveNav} />;
      case 'notifications':
        return <NotificationsView onNavigate={setActiveNav} />;
      case 'profile':
        return <ProfileView onNavigate={setActiveNav} />;
      default:
        return <LandingPage onNavigate={setActiveNav} />;
    }
  };

  return (
    <MainLayout activeNav={activeNav} onNavigate={setActiveNav}>
      {renderActiveView()}
    </MainLayout>
  );
}

export default App;
