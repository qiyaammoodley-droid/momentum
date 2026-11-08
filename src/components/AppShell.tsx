import { NavLink, Outlet } from 'react-router-dom'
import {
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Compass,
  LayoutDashboard,
  Menu,
  Sparkles,
  Target,
  UserRound,
} from 'lucide-react'
import { useState } from 'react'

const navigation = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Goals', to: '/goals', icon: Target },
  { label: 'Calendar', to: '/calendar', icon: CalendarDays },
  { label: 'Habits', to: '/habits', icon: CheckCircle2 },
]

export default function AppShell() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="app-frame">
      <aside className="sidebar" aria-label="Main navigation">
        <NavLink to="/dashboard" className="brand-lockup" aria-label="Momentum home">
          <span className="brand-mark"><Compass size={21} strokeWidth={2.3} /></span>
          <span>momentum<span className="brand-period">.</span></span>
        </NavLink>

        <div className="sidebar-label">WORKSPACE</div>
        <nav className="nav-list">
          {navigation.map(({ label, to, icon: Icon }) => (
            <NavLink key={label} to={to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <Icon size={18} strokeWidth={1.9} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-label tools-label">YOUR TOOLS</div>
        <NavLink to="/ai-assistant" className="nav-link">
          <Sparkles size={18} strokeWidth={1.9} />
          <span>AI assistant</span>
          <span className="new-tag">NEW</span>
        </NavLink>
        <NavLink to="/weekly-review" className="nav-link">
          <Compass size={18} strokeWidth={1.9} />
          <span>Weekly review</span>
        </NavLink>

        <div className="sidebar-bottom">
          <div className="help-card">
            <div className="help-icon"><CircleHelp size={17} /></div>
            <strong>One step at a time.</strong>
            <p>Progress is built in the small things you do consistently.</p>
          </div>
          <button className="profile-button" type="button">
            <span className="avatar">QM</span>
            <span className="profile-copy"><strong>Your workspace</strong><small>Personal account</small></span>
            <ChevronDown size={16} className="profile-chevron" />
          </button>
        </div>
      </aside>

      <div className="main-column">
        <header className="topbar">
          <button className="mobile-menu-button icon-button" type="button" aria-label="Open navigation" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu size={20} />
          </button>
          <div className="breadcrumb"><span>Workspace</span><span className="breadcrumb-slash">/</span><strong>Overview</strong></div>
          <div className="topbar-actions">
            <span className="today-pill">Your next chapter starts today</span>
            <button className="avatar avatar-small" type="button" aria-label="Profile">QM</button>
          </div>
        </header>
        {mobileMenuOpen && (
          <div className="mobile-nav-panel">
            {navigation.map(({ label, to, icon: Icon }) => (
              <NavLink key={label} to={to} onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">
                <Icon size={18} /> {label}
              </NavLink>
            ))}
          </div>
        )}
        <main className="page-content"><Outlet /></main>
      </div>

      <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
        {navigation.map(({ label, to, icon: Icon }) => (
          <NavLink key={label} to={to} className={({ isActive }) => `mobile-bottom-link ${isActive ? 'active' : ''}`}>
            <Icon size={19} /><span>{label}</span>
          </NavLink>
        ))}
        <button className="mobile-bottom-link" type="button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <UserRound size={19} /><span>More</span>
        </button>
      </nav>
    </div>
  )
}
