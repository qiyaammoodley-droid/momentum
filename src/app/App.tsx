import { useEffect, useState } from 'react'
import type { ElementType, ReactNode } from 'react'
import { useAuth } from './AuthProvider'
import { getUserProfile, saveUserProfile } from '../lib/momentum-database'
import AuthPage from '../features/dashboard/AuthPage'
import { NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import {
  Activity, ArrowRight, ArrowUpRight, CalendarDays, Check,
  CheckCircle2, Clock3, Compass, Flame, LayoutDashboard,
  LogOut, Menu, Moon, MoreHorizontal, Plus, Settings, ShieldCheck, Sparkles,
  Sun, Target, Trash2, Trophy, UserRound, X, Zap,
} from 'lucide-react'

type Task = { id: number; title: string; done: boolean; due: string; goal: string }
type Goal = { id: number; title: string; category: string; deadline: string; color: string; tasks: Task[]; archived?: boolean }
type Habit = { id: number; title: string; days: number[]; done: number[]; icon: string }
type Preferences = { name: string; accent: string; theme: 'light' | 'dark' | 'system'; density: 'comfortable' | 'compact'; focus: string; aiGoals: boolean; aiTasks: boolean; aiHabits: boolean; aiReviews: boolean; aiTone: string }
type State = { goals: Goal[]; habits: Habit[]; preferences: Preferences; review: string }

const seed: State = {
  preferences: { name: 'Alex Morgan', accent: '#167D63', theme: 'light', density: 'comfortable', focus: 'Build a consistent routine', aiGoals: true, aiTasks: true, aiHabits: false, aiReviews: false, aiTone: 'Direct & encouraging' },
  goals: [
    { id: 1, title: 'Become a confident trader', category: 'Learning', deadline: '2026-12-31', color: '#167D63', tasks: [
      { id: 11, title: 'Review last week’s trading journal', done: true, due: '2026-11-08', goal: 'Become a confident trader' },
      { id: 12, title: 'Backtest one setup for 30 minutes', done: false, due: '2026-11-09', goal: 'Become a confident trader' },
      { id: 13, title: 'Write down three lessons learned', done: false, due: '2026-11-10', goal: 'Become a confident trader' },
    ] },
    { id: 2, title: 'Get stronger and fitter', category: 'Health & fitness', deadline: '2027-01-31', color: '#D18B42', tasks: [
      { id: 21, title: 'Complete three strength sessions', done: true, due: '2026-11-08', goal: 'Get stronger and fitter' },
      { id: 22, title: 'Plan meals for the week', done: false, due: '2026-11-11', goal: 'Get stronger and fitter' },
    ] },
    { id: 3, title: 'Build my developer portfolio', category: 'Career', deadline: '2027-02-28', color: '#7186D9', tasks: [
      { id: 31, title: 'Polish the project case study', done: false, due: '2026-11-12', goal: 'Build my developer portfolio' },
      { id: 32, title: 'Publish portfolio update', done: false, due: '2026-11-15', goal: 'Build my developer portfolio' },
    ] },
  ],
  habits: [
    { id: 1, title: 'Read for 20 minutes', days: [1,2,3,4,5,6,0], done: [1,2,3,4,5], icon: '📚' },
    { id: 2, title: 'Move your body', days: [1,2,3,4,5,6,0], done: [1,2,4,5], icon: '🏃' },
    { id: 3, title: 'Plan tomorrow', days: [1,2,3,4,5,0], done: [1,2,3,4], icon: '📝' },
  ], review: '',
}

function loadState(storageKey: string, displayName: string): State {
  try {
    const raw = localStorage.getItem(storageKey)
    if (raw) {
      const saved = JSON.parse(raw) as Partial<State>
      return {
        ...seed,
        ...saved,
        preferences: {
          ...seed.preferences,
          name: displayName || seed.preferences.name,
          ...saved.preferences,
        },
      }
    }
  } catch {
    // Start with a fresh workspace if saved data cannot be read.
  }

  return {
    ...seed,
    preferences: {
      ...seed.preferences,
      name: displayName || seed.preferences.name,
    },
    goals: seed.goals.map(goal => ({
      ...goal,
      tasks: goal.tasks.map(task => ({ ...task })),
    })),
    habits: seed.habits.map(habit => ({
      ...habit,
      days: [...habit.days],
      done: [...habit.done],
    })),
  }
}

function useMomentum(userId: string, displayName: string) {
  const storageKey = `momentum-state-${userId}`
  const [state, setState] = useState<State>(() => loadState(storageKey, displayName))
  const [profileLoaded, setProfileLoaded] = useState(false)

  // Load the signed-in user's profile from Supabase.
  useEffect(() => {
    let isActive = true

    async function loadProfile() {
      try {
        const preferences = await getUserProfile(userId)

        if (isActive) {
          setState(current => ({
            ...current,
            preferences: {
              ...current.preferences,
              ...preferences,
              name: preferences.name || displayName,
            },
          }))
        }
      } catch (error) {
        console.error('Could not load Momentum profile:', error)
      } finally {
        if (isActive) setProfileLoaded(true)
      }
    }

    void loadProfile()

    return () => {
      isActive = false
    }
  }, [userId, displayName])

  // Keep goals, tasks, habits and reviews in this account's browser storage for now.
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(state))
  }, [state, storageKey])

  // Save profile preferences to Supabase after the initial profile load.
  // A short delay avoids sending a request for every keystroke in Settings.
  useEffect(() => {
    if (!profileLoaded) return

    const timeout = window.setTimeout(() => {
      void saveUserProfile(userId, state.preferences).catch(error => {
        console.error('Could not save Momentum profile:', error)
      })
    }, 600)

    return () => window.clearTimeout(timeout)
  }, [userId, state.preferences, profileLoaded])

  useEffect(() => {
    document.documentElement.dataset.theme = state.preferences.theme
    document.documentElement.dataset.density = state.preferences.density
    document.documentElement.style.setProperty('--accent', state.preferences.accent)
  }, [state.preferences])

  const update = (patch: Partial<State>) =>
    setState(current => ({ ...current, ...patch }))

  const toggleTask = (goalId: number, taskId: number) =>
    update({
      goals: state.goals.map(g =>
        g.id !== goalId
          ? g
          : {
              ...g,
              tasks: g.tasks.map(t =>
                t.id === taskId ? { ...t, done: !t.done } : t
              ),
            }
      ),
    })

  return { state, setState, update, toggleTask, storageKey }
}

const nav = [
  { label: 'Overview', to: '/dashboard', icon: LayoutDashboard },
  { label: 'My goals', to: '/goals', icon: Target },
  { label: 'Calendar', to: '/calendar', icon: CalendarDays },
  { label: 'Habits', to: '/habits', icon: CheckCircle2 },
]

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="auth-page">Loading Momentum...</div>
  }

  const displayName =
    user?.user_metadata?.display_name ||
    user?.user_metadata?.full_name ||
    user?.email?.split('@')[0] ||
    'Momentum member'

  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/dashboard" replace /> : <AuthPage mode="login" />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to="/dashboard" replace /> : <AuthPage mode="register" />}
      />
      <Route
        path="/*"
        element={
          user
            ? <AuthenticatedWorkspace key={user.id} userId={user.id} displayName={displayName} />
            : <Navigate to="/login" replace />
        }
      />
    </Routes>
  )
}

function AuthenticatedWorkspace({
  userId,
  displayName,
}: {
  userId: string
  displayName: string
}) {
  const store = useMomentum(userId, displayName)
  return <Shell store={store} />
}

function Shell({ store }: { store: ReturnType<typeof useMomentum> }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { signOut } = useAuth()
  const location = useLocation()
  const page = [...nav, { label: 'AI Growth Coach', to: '/ai-assistant', icon: Sparkles }, { label: 'Weekly review', to: '/weekly-review', icon: Activity }, { label: 'Settings', to: '/settings', icon: Settings }].find(n => n.to === location.pathname)
  const initials = store.state.preferences.name.split(' ').map(s => s[0]).slice(0,2).join('').toUpperCase()
  return <div className="app-frame">
    <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
      <NavLink to="/dashboard" className="brand"><span className="brand-symbol"><Compass size={20}/></span><span>momentum<span className="brand-dot">.</span></span></NavLink>
      <div className="side-caption">YOUR SPACE</div>
      <nav className="side-nav">{nav.map(({label,to,icon:Icon}) => <NavLink key={to} to={to} onClick={() => setMobileOpen(false)} className={({isActive}) => `side-link ${isActive ? 'selected' : ''}`}><Icon size={18}/><span>{label}</span></NavLink>)}</nav>
      <div className="side-caption side-caption-gap">PERSONAL GROWTH</div>
      <NavLink to="/ai-assistant" onClick={() => setMobileOpen(false)} className={({isActive}) => `side-link ${isActive ? 'selected' : ''}`}><Sparkles size={18}/><span>AI Growth Coach</span><span className="side-new">AI</span></NavLink>
      <NavLink to="/weekly-review" onClick={() => setMobileOpen(false)} className={({isActive}) => `side-link ${isActive ? 'selected' : ''}`}><Activity size={18}/><span>Weekly review</span></NavLink>
      <div className="sidebar-bottom"><div className="side-quote"><span className="quote-icon"><Zap size={16}/></span><strong>Small steps. Real change.</strong><p>Your future is shaped by what you do consistently.</p></div><NavLink to="/settings" className="profile-link"><span className="avatar">{initials}</span><span className="profile-meta"><b>{store.state.preferences.name}</b><small>Personal workspace</small></span><Settings size={16}/></NavLink></div>
    </aside>
    <div className="main-column"><header className="topbar"><button className="icon-btn mobile-menu" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu"><Menu size={20}/></button><div className="crumb"><span>Workspace</span><span>/</span><b>{page?.label || 'Overview'}</b></div><div className="top-actions"><span className="date-chip"><span className="live-dot"/> Your growth space</span><NavLink to="/settings" className="avatar avatar-top">{initials}</NavLink><button className="button button-quiet" type="button" onClick={() => void signOut()}><LogOut size={16}/> Sign out</button></div></header><main className="page-wrap"><RoutesContent /></main></div>
    <nav className="mobile-tabs">{nav.map(({label,to,icon:Icon}) => <NavLink key={to} to={to} className={({isActive}) => isActive ? 'mobile-tab active' : 'mobile-tab'}><Icon size={19}/><span>{label === 'Overview' ? 'Home' : label}</span></NavLink>)}<NavLink to="/settings" className="mobile-tab"><UserRound size={19}/><span>More</span></NavLink></nav>
  </div>
  function RoutesContent() { return <Routes><Route path="/" element={<Navigate to="/dashboard" replace/>}/><Route path="/dashboard" element={<Dashboard store={store}/>}/><Route path="/goals" element={<Goals store={store}/>}/><Route path="/calendar" element={<CalendarPage store={store}/>}/><Route path="/habits" element={<Habits store={store}/>}/><Route path="/ai-assistant" element={<Assistant store={store}/>}/><Route path="/weekly-review" element={<WeeklyReview store={store}/>}/><Route path="/settings" element={<SettingsPage store={store}/>}/></Routes> }
}

type Store = ReturnType<typeof useMomentum>
function PageHeading({eyebrow,title,description,action}:{eyebrow:string;title:string;description:string;action?:ReactNode}) { return <div className="page-heading"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{description}</p></div>{action}</div> }
function StatCard({label,value,detail,icon:Icon,trend}:{label:string;value:string;detail:string;icon:ElementType;trend?:string}) { return <article className="stat-card"><div className="stat-top"><span>{label}</span><span className="stat-icon"><Icon size={18}/></span></div><div className="stat-value">{value}</div><div className="stat-detail">{trend && <span className="trend"><ArrowUpRight size={13}/>{trend}</span>}{detail}</div></article> }
function progress(g:Goal) { const active = g.tasks.filter(t => !t.done); return g.tasks.length ? Math.round((g.tasks.length-active.length)/g.tasks.length*100) : 0 }
function Dashboard({store}:{store:Store}) {
  const {state,toggleTask} = store
  const goals = state.goals.filter(g => !g.archived)
  const tasks = goals.flatMap(g => g.tasks.map(t => ({...t,goalId:g.id})))
  const completed = tasks.filter(t => t.done).length
  const pending = tasks.filter(t => !t.done)
  const overall = goals.length ? Math.round(goals.reduce((a,g)=>a+progress(g),0)/goals.length) : 0
  return <><PageHeading eyebrow="SUNDAY, 8 NOVEMBER 2026" title={`Good to see you, ${state.preferences.name.split(' ')[0]}.`} description="A little progress today goes a long way. Here's your snapshot." action={<NavLink className="button button-primary" to="/goals"><Plus size={17}/> New goal</NavLink>}/>
    <section className="stat-grid"><StatCard label="Active goals" value={String(goals.length)} detail="Keep your direction clear" icon={Target}/><StatCard label="Tasks completed" value={`${completed}/${tasks.length}`} detail="Across your active goals" icon={CheckCircle2} trend={tasks.length ? `${Math.round(completed/tasks.length*100)}%` : undefined}/><StatCard label="Overall progress" value={`${overall}%`} detail="Average goal completion" icon={Activity}/><StatCard label="Habit streak" value="5 days" detail="You're building consistency" icon={Flame}/></section>
    <div className="dashboard-grid"><section className="panel goals-panel"><div className="panel-heading"><div><h2>Your goals</h2><p>Keep the important things moving.</p></div><NavLink to="/goals" className="text-link">View all <ArrowRight size={15}/></NavLink></div><div className="goal-list">{goals.map(g=><div className="goal-row" key={g.id}><span className="goal-dot" style={{background:g.color}}/><div className="goal-main"><div className="goal-title-line"><b>{g.title}</b><span>{progress(g)}%</span></div><div className="progress-track"><span style={{width:`${progress(g)}%`,background:g.color}}/></div><small>{g.category} · {g.tasks.filter(t=>!t.done).length} tasks left</small></div></div>)}</div><NavLink to="/goals" className="panel-footer-link">Manage your goals <ArrowRight size={15}/></NavLink></section>
    <section className="panel tasks-panel"><div className="panel-heading"><div><h2>Next up</h2><p>Your next small wins.</p></div><span className="count-pill">{pending.length} open</span></div><div className="task-list">{pending.slice(0,5).map(t=><label className="task-row" key={t.id}><input type="checkbox" checked={false} onChange={()=>toggleTask(t.goalId,t.id)}/><span className="task-copy"><b>{t.title}</b><small>{t.goal}</small></span><span className="task-date">{new Date(`${t.due}T12:00:00`).toLocaleDateString('en-ZA',{day:'numeric',month:'short'})}</span></label>)}{!pending.length&&<div className="empty-state">All caught up. Enjoy the breathing room. ✨</div>}</div><NavLink to="/calendar" className="panel-footer-link">See your schedule <ArrowRight size={15}/></NavLink></section>
    <section className="panel habit-summary"><div className="panel-heading"><div><h2>Daily habits</h2><p>Consistency beats intensity.</p></div><NavLink to="/habits" className="text-link">Open habits <ArrowRight size={15}/></NavLink></div><div className="habit-mini-list">{state.habits.map(h=><div className="habit-mini" key={h.id}><span className="habit-emoji">{h.icon}</span><b>{h.title}</b><span className="habit-week">{['M','T','W','T','F','S','S'].map((d,i)=><i key={i} className={h.done.includes(i===6?0:i+1)?'day-done':''}>{h.done.includes(i===6?0:i+1)?'✓':d}</i>)}</span></div>)}</div></section>
    <section className="coach-card"><div className="coach-orb"><Sparkles size={22}/></div><div className="coach-copy"><span>YOUR PERSONAL GROWTH COACH</span><h2>Turn a big ambition into your next clear step.</h2><p>Get a thoughtful plan based on the goals and routines you choose to share.</p><NavLink to="/ai-assistant" className="button button-light">Talk to your coach <ArrowRight size={16}/></NavLink></div><div className="coach-decoration">✳</div></section></div>
  </>
}

function Goals({store}:{store:Store}) {
  const [show,setShow]=useState(false),[showTask,setShowTask]=useState(false),[title,setTitle]=useState(''),[category,setCategory]=useState('Personal'),[deadline,setDeadline]=useState('2026-12-31'),[taskTitle,setTaskTitle]=useState(''),[taskDue,setTaskDue]=useState('2026-11-12'),[taskGoalId,setTaskGoalId]=useState<number>(activeGoalId())
  const active=store.state.goals.filter(g=>!g.archived)
  function activeGoalId(){return store.state.goals.find(g=>!g.archived)?.id ?? 0}
  const addTask=()=>{const goal=store.state.goals.find(g=>g.id===taskGoalId);if(!goal||!taskTitle.trim()||taskTitle.trim().length>120)return;store.update({goals:store.state.goals.map(g=>g.id!==taskGoalId?g:{...g,tasks:[...g.tasks,{id:Date.now(),title:taskTitle.trim(),done:false,due:taskDue,goal:g.title}]})});setTaskTitle('');setShowTask(false)}
  const add=()=>{if(title.trim().length<3||title.trim().length>80||active.length>=20)return;store.update({goals:[...store.state.goals,{id:Date.now(),title:title.trim(),category,deadline,color:['#167D63','#D18B42','#7186D9','#C06C84'][active.length%4],tasks:[]}]});setTitle('');setShow(false)}
  return <><PageHeading eyebrow="DIRECTION & PURPOSE" title="Your goals" description="Give your ambition a destination, then make a plan to get there." action={<button className="button button-primary" onClick={()=>setShow(true)}><Plus size={17}/> Create a goal</button>}/><div className="goal-cards">{active.map(g=><article className="goal-card" key={g.id}><div className="goal-card-top"><span className="category-pill">{g.category}</span><button className="icon-btn" title="Archive goal" onClick={()=>store.update({goals:store.state.goals.map(x=>x.id===g.id?{...x,archived:true}:x)})}><MoreHorizontal size={19}/></button></div><h2>{g.title}</h2><p className="muted">Target date: {new Date(`${g.deadline}T12:00:00`).toLocaleDateString('en-ZA',{day:'numeric',month:'long',year:'numeric'})}</p><div className="goal-progress-label"><b>{progress(g)}% complete</b><span>{g.tasks.filter(t=>!t.done).length} tasks remaining</span></div><div className="progress-track large"><span style={{width:`${progress(g)}%`,background:g.color}}/></div><div className="goal-card-bottom"><span>{g.tasks.filter(t=>t.done).length} of {g.tasks.length} tasks done</span><button className="text-link" onClick={()=>{setTaskGoalId(g.id);setShowTask(true)}}>Add task <Plus size={14}/></button></div><div className="goal-task-list">{g.tasks.map(t=><label key={t.id} className="goal-task-item"><input type="checkbox" checked={t.done} onChange={()=>store.toggleTask(g.id,t.id)}/><span className={t.done?'task-complete':''}>{t.title}</span></label>)}</div></article>)}</div>{store.state.goals.some(g=>g.archived)&&<section className="panel archived-panel"><h3>Archived goals</h3>{store.state.goals.filter(g=>g.archived).map(g=><div className="archived-row" key={g.id}><span>{g.title}</span><button className="text-link" onClick={()=>store.update({goals:store.state.goals.map(x=>x.id===g.id?{...x,archived:false}:x)})}>Restore</button></div>)}</section>}
    {showTask&&<Modal title="Add a task" close={()=>setShowTask(false)}><label className="field-label">Task title<input className="field-input" autoFocus maxLength={120} value={taskTitle} onChange={e=>setTaskTitle(e.target.value)} placeholder="e.g. Complete one focused study session"/></label><label className="field-label">Attach to goal<select className="field-input" value={taskGoalId} onChange={e=>setTaskGoalId(Number(e.target.value))}>{active.map(g=><option key={g.id} value={g.id}>{g.title}</option>)}</select></label><label className="field-label">Due date<input type="date" className="field-input" value={taskDue} onChange={e=>setTaskDue(e.target.value)}/></label><div className="modal-actions"><button className="button button-quiet" onClick={()=>setShowTask(false)}>Cancel</button><button className="button button-primary" disabled={!taskTitle.trim()||!active.length} onClick={addTask}>Add task</button></div></Modal>}
    {show&&<Modal title="Create a new goal" close={()=>setShow(false)}><label className="field-label">What do you want to achieve?<input className="field-input" autoFocus value={title} maxLength={80} onChange={e=>setTitle(e.target.value)} placeholder="e.g. Run my first 10K"/></label><label className="field-label">Area of life<select className="field-input" value={category} onChange={e=>setCategory(e.target.value)}>{['Personal','Career','Learning','Health & fitness','Finance','Relationships','Other'].map(x=><option key={x}>{x}</option>)}</select></label><label className="field-label">Target date<input type="date" className="field-input" value={deadline} onChange={e=>setDeadline(e.target.value)}/></label><div className="modal-actions"><button className="button button-quiet" onClick={()=>setShow(false)}>Cancel</button><button className="button button-primary" disabled={title.trim().length<3} onClick={add}>Create goal</button></div></Modal>}
  </>
}

function Modal({title,close,children}:{title:string;close:()=>void;children:ReactNode}) { return <div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)close()}}><div className="modal"><div className="modal-head"><h2>{title}</h2><button className="icon-btn" onClick={close}><X size={19}/></button></div>{children}</div></div> }
function CalendarPage({store}:{store:Store}) { const [week,setWeek]=useState(0); const start=new Date(2026,10,9+week*7); const days=Array.from({length:7},(_,i)=>new Date(start.getFullYear(),start.getMonth(),start.getDate()+i)); const tasks=store.state.goals.flatMap(g=>g.tasks.map(t=>({...t,goalColor:g.color}))); return <><PageHeading eyebrow="YOUR TIME, YOUR TERMS" title="Calendar" description="A clear view of what’s coming up, one week at a time."/><section className="panel calendar-panel"><div className="calendar-toolbar"><div><h2>{days[0].toLocaleDateString('en-ZA',{month:'long',year:'numeric'})}</h2><p>Monday to Sunday</p></div><div className="calendar-controls"><button className="button button-quiet" onClick={()=>setWeek(w=>w-1)}>←</button><button className="button button-quiet" onClick={()=>setWeek(0)}>Today</button><button className="button button-quiet" onClick={()=>setWeek(w=>w+1)}>→</button></div></div><div className="calendar-grid">{days.map(d=><div className="calendar-day" key={d.toISOString()}><div className="calendar-day-head"><small>{d.toLocaleDateString('en-US',{weekday:'short'})}</small><b>{d.getDate()}</b></div><div className="calendar-events">{tasks.filter(t=>t.due===`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`).map(t=><div className={`calendar-event ${t.done?'event-done':''}`} key={t.id} style={{borderLeftColor:t.goalColor}}><b>{t.title}</b><small>{t.goal}</small></div>)}</div></div>)}</div></section><p className="calendar-note"><Clock3 size={15}/> Your week starts on Monday. Dates are displayed in your local timezone.</p></> }
function Habits({store}:{store:Store}) { const [newHabit,setNewHabit]=useState(''); const toggle=(id:number,day:number)=>store.update({habits:store.state.habits.map(h=>h.id!==id?h:{...h,done:h.done.includes(day)?h.done.filter(x=>x!==day):[...h.done,day]})}); const add=()=>{if(!newHabit.trim())return;store.update({habits:[...store.state.habits,{id:Date.now(),title:newHabit.trim(),days:[1,2,3,4,5,6,0],done:[],icon:'🌱'}]});setNewHabit('')}; return <><PageHeading eyebrow="THE DAILY REPS" title="Your habits" description="Make the actions that matter easier to repeat."/><section className="panel habits-panel"><div className="panel-heading"><div><h2>This week's rhythm</h2><p>Tap a day to mark a habit complete.</p></div><span className="count-pill">{store.state.habits.length} habits</span></div><div className="habit-table-head"><span>HABIT</span><div>{['M','T','W','T','F','S','S'].map((d,i)=><span key={i}>{d}</span>)}</div></div>{store.state.habits.map(h=><div className="habit-table-row" key={h.id}><div className="habit-name"><span>{h.icon}</span><b>{h.title}</b></div><div className="habit-checks">{[1,2,3,4,5,6,0].map((day,i)=><button key={day} aria-label={`${h.title}, ${['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'][i]}`} onClick={()=>toggle(h.id,day)} className={h.done.includes(day)?'habit-check checked':'habit-check'}>{h.done.includes(day)?<Check size={14}/>:''}</button>)}</div></div>)}<div className="add-habit-row"><input className="field-input" value={newHabit} onChange={e=>setNewHabit(e.target.value)} onKeyDown={e=>e.key==='Enter'&&add()} placeholder="Add a habit you want to build..."/><button className="button button-primary" onClick={add} disabled={!newHabit.trim()}><Plus size={16}/> Add habit</button></div></section><div className="tip-strip"><Flame size={18}/><span><b>Consistency tip:</b> Start so small that skipping feels harder than doing it.</span></div></> }
function Assistant({store}:{store:Store}) { const [prompt,setPrompt]=useState('Help me turn my goals into a realistic plan for this week.'); const [answer,setAnswer]=useState(''); const [loading,setLoading]=useState(false); const p=store.state.preferences; const allowed=p.aiGoals||p.aiTasks||p.aiHabits||p.aiReviews; const generate=()=>{if(!prompt.trim())return;setLoading(true);setTimeout(()=>{const context=[p.aiGoals?`${store.state.goals.filter(g=>!g.archived).length} active goals`:null,p.aiTasks?`${store.state.goals.flatMap(g=>g.tasks).filter(t=>!t.done).length} open tasks`:null,p.aiHabits?`${store.state.habits.length} habits`:null].filter(Boolean).join(', ');setAnswer(`Here's a grounded way to approach it.\n\n1. Pick the one outcome that would make this week feel meaningful.\n2. Break it into two or three actions that fit into your actual calendar.\n3. Protect one focused session for the hardest action.\n4. At the end of the week, review what worked and adjust without beating yourself up.\n\n${allowed&&context?`I used the information you allowed me to consider: ${context}.`:'I kept this general because you have not enabled personal workspace context.'}\n\nYour next move: choose one 25-minute action and schedule it today. Momentum comes from evidence, not hype.`);setLoading(false)},450)}; return <><PageHeading eyebrow="THINK CLEARER. MOVE SMARTER." title="AI Growth Coach" description="A planning partner for your goals, habits and next steps."/><div className="assistant-layout"><section className="panel assistant-main"><div className="assistant-welcome"><div className="assistant-icon"><Sparkles size={23}/></div><div><h2>Your thinking partner</h2><p>Ask for a plan, a reset, a reflection prompt or help breaking down a goal.</p></div></div><div className="prompt-chips">{['Plan my week','Break down a big goal','Help me get back on track'].map(x=><button key={x} onClick={()=>setPrompt(x)}>{x}</button>)}</div><label className="field-label">What would you like help with?<textarea className="field-input prompt-box" value={prompt} maxLength={500} onChange={e=>setPrompt(e.target.value)}/><small className="field-hint">{prompt.length}/500 characters</small></label><button className="button button-primary generate-button" onClick={generate} disabled={!prompt.trim()||loading}><Sparkles size={17}/>{loading?'Thinking...':'Build my next steps'}</button>{answer&&<div className="ai-answer"><div className="answer-heading"><Sparkles size={16}/> Your draft plan <span className="draft-tag">DRAFT</span></div><p>{answer}</p><small>Review and adapt these suggestions. Nothing is automatically added to your goals or calendar.</small></div>}</section><aside className="panel privacy-panel"><div className="privacy-icon"><ShieldCheck size={20}/></div><h3>Your AI boundaries</h3><p>You decide what context the coach can use. Change permissions any time in Settings.</p><div className="permission-list">{[['Goals',p.aiGoals],['Tasks',p.aiTasks],['Habits',p.aiHabits],['Weekly reviews',p.aiReviews]].map(([label,on])=><div className="permission-row" key={String(label)}><span>{label}</span><span className={on?'permission-on':'permission-off'}>{on?'Allowed':'Not shared'}</span></div>)}</div><NavLink to="/settings" className="text-link">Manage permissions <ArrowRight size={15}/></NavLink><div className="privacy-foot"><ShieldCheck size={14}/> No data is sent to an AI provider in this local demo.</div></aside></div></> }
function WeeklyReview({store}:{store:Store}) { const [reflection,setReflection]=useState(store.state.review); const tasks=store.state.goals.flatMap(g=>g.tasks); const done=tasks.filter(t=>t.done).length; return <><PageHeading eyebrow="PAUSE. NOTICE. ADJUST." title="Weekly review" description="Look back with honesty, then choose what deserves your energy next."/><div className="review-grid"><section className="panel review-score"><span className="review-icon"><Trophy size={21}/></span><div className="eyebrow">YOUR WEEK IN NUMBERS</div><div className="review-number">{done}<small>/{tasks.length}</small></div><h2>Tasks completed</h2><p>You completed {tasks.length?Math.round(done/tasks.length*100):0}% of the tasks currently in your workspace. This is information, not a judgement.</p></section><section className="panel review-form"><h2>Make sense of the week</h2><p>Capture the lesson while it's fresh. Your reflection stays in this browser for now.</p><label className="field-label">What went well, and what did you learn?<textarea className="field-input review-textarea" value={reflection} onChange={e=>setReflection(e.target.value)} placeholder="I made progress when... Next week I want to..."/></label><button className="button button-primary" onClick={()=>store.update({review:reflection})}><Check size={16}/> Save reflection</button></section></div></> }
function SettingsPage({store}:{store:Store}) { const p=store.state.preferences; const change=(patch:Partial<Preferences>)=>store.update({preferences:{...p,...patch}}); const accents=[['Forest','#167D63'],['Ocean','#3977B8'],['Violet','#8064B8'],['Sunset','#C66B4E'],['Rose','#C05D78'],['Graphite','#53635B']]; return <><PageHeading eyebrow="MAKE IT YOURS" title="Personalise your space" description="Your workspace should fit the way you think and work."/><div className="settings-layout"><section className="panel settings-section"><div className="settings-title"><div className="settings-icon"><UserRound size={18}/></div><div><h2>Your profile</h2><p>A name that makes this space feel like yours.</p></div></div><label className="field-label">Display name<input className="field-input" value={p.name} maxLength={40} onChange={e=>change({name:e.target.value})}/></label><label className="field-label">Main focus right now<input className="field-input" value={p.focus} maxLength={100} onChange={e=>change({focus:e.target.value})}/></label></section><section className="panel settings-section"><div className="settings-title"><div className="settings-icon"><Sun size={18}/></div><div><h2>Look and feel</h2><p>Choose a visual style that feels right.</p></div></div><div className="field-label">Accent colour<div className="accent-options">{accents.map(([name,color])=><button key={name} title={name} aria-label={`${name} accent`} className={p.accent===color?'accent-swatch chosen':'accent-swatch'} style={{background:color}} onClick={()=>change({accent:color})}>{p.accent===color&&<Check size={16}/>}</button>)}</div></div><div className="field-label">Appearance<div className="choice-row"><button className={p.theme==='light'?'choice selected':'choice'} onClick={()=>change({theme:'light'})}><Sun size={17}/> Light</button><button className={p.theme==='dark'?'choice selected':'choice'} onClick={()=>change({theme:'dark'})}><Moon size={17}/> Dark</button></div></div><div className="field-label">Layout density<div className="choice-row"><button className={p.density==='comfortable'?'choice selected':'choice'} onClick={()=>change({density:'comfortable'})}>Comfortable</button><button className={p.density==='compact'?'choice selected':'choice'} onClick={()=>change({density:'compact'})}>Compact</button></div></div></section><section className="panel settings-section ai-settings"><div className="settings-title"><div className="settings-icon"><Sparkles size={18}/></div><div><h2>AI permissions & privacy</h2><p>Granular control over what your Growth Coach may consider.</p></div></div><div className="consent-notice"><ShieldCheck size={18}/><span>These are explicit context-sharing preferences. You can switch each one off at any time. This demo does not send your data to an external AI service.</span></div>{([{key:'aiGoals',label:'Goals',desc:'Goal titles, categories and target dates.'},{key:'aiTasks',label:'Tasks',desc:'Task titles, due dates and completion status.'},{key:'aiHabits',label:'Habits',desc:'Habit names and completion patterns.'},{key:'aiReviews',label:'Weekly reviews',desc:'Your saved weekly reflections.'}] as const).map(item=><div className="toggle-row" key={item.key}><div><b>{item.label}</b><small>{item.desc}</small></div><button role="switch" aria-checked={p[item.key]} className={p[item.key]?'switch on':'switch'} onClick={()=>change({[item.key]:!p[item.key]} as Partial<Preferences>)}><span/></button></div>)}<label className="field-label ai-tone-field">Coach communication style<select className="field-input" value={p.aiTone} onChange={e=>change({aiTone:e.target.value})}>{['Direct & encouraging','Calm & thoughtful','Analytical & challenging','Friendly & conversational'].map(x=><option key={x}>{x}</option>)}</select></label></section><section className="panel settings-section"><div className="settings-title"><div className="settings-icon"><ShieldCheck size={18}/></div><div><h2>Your data</h2><p>Local demo storage and reset controls.</p></div></div><p className="muted">Your profile preferences are synced to Supabase. Goals, tasks, habits and weekly reviews are still stored in this browser and are not yet synced across devices.</p><button className="button button-danger-outline" onClick={()=>{if(confirm('Reset all Momentum demo data? This cannot be undone.')){localStorage.removeItem(store.storageKey);window.location.reload()}}}><Trash2 size={16}/> Reset demo data</button></section></div></> }

export default App

