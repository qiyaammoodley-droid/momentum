import { ArrowUpRight, CalendarDays, Check, ChevronRight, Circle, Clock3, Flame, Plus, Sparkles, Target, TrendingUp } from 'lucide-react'

const tasks = [
  { title: 'Complete React hooks lesson', goal: 'Learn React fundamentals', time: '10:30 AM', done: false },
  { title: 'Review yesterday’s journal', goal: 'Improve trading journal discipline', time: '1:00 PM', done: false },
  { title: 'Plan the next gym session', goal: 'Build a consistent gym routine', time: '5:30 PM', done: true },
]

const goals = [
  { title: 'Learn React fundamentals', category: 'STUDY', progress: 68, color: 'green', detail: '4 of 6 tasks complete' },
  { title: 'Build a consistent gym routine', category: 'FITNESS', progress: 42, color: 'mint', detail: '3 of 7 tasks complete' },
  { title: 'Improve trading journal discipline', category: 'TRADING', progress: 25, color: 'gold', detail: '1 of 4 tasks complete' },
]

function greeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

export default function DashboardPage() {
  const date = new Intl.DateTimeFormat('en-ZA', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date())

  return (
    <div className="dashboard-page">
      <section className="welcome-row">
        <div>
          <div className="eyebrow"><span className="eyebrow-dot" /> YOUR PERSONAL DASHBOARD</div>
          <h1>{greeting()}, let's make it count<span className="heading-period">.</span></h1>
          <p className="welcome-subtitle">A little progress each day adds up to big results.</p>
        </div>
        <div className="date-chip"><CalendarDays size={16} />{date}</div>
      </section>

      <section className="stat-grid" aria-label="Your progress overview">
        <article className="stat-card">
          <div className="stat-top"><span className="stat-icon green-icon"><Target size={18} /></span><span className="stat-caption">IN MOTION</span></div>
          <div className="stat-value">3</div>
          <div className="stat-bottom"><strong>Active goals</strong><span>Keep your focus</span></div>
        </article>
        <article className="stat-card">
          <div className="stat-top"><span className="stat-icon amber-icon"><Clock3 size={18} /></span><span className="stat-caption">ON YOUR LIST</span></div>
          <div className="stat-value">2</div>
          <div className="stat-bottom"><strong>Tasks due today</strong><span>One step at a time</span></div>
        </article>
        <article className="stat-card">
          <div className="stat-top"><span className="stat-icon mint-icon"><Flame size={18} /></span><span className="stat-caption">SHOWING UP</span></div>
          <div className="stat-value">1<span className="stat-total"> / 3</span></div>
          <div className="stat-bottom"><strong>Habits completed</strong><span>Build the rhythm</span></div>
        </article>
        <article className="focus-card">
          <div className="focus-sparkle"><Sparkles size={18} /></div>
          <div><span className="focus-label">A NOTE TO SELF</span><strong>Consistency beats intensity.</strong><p>Show up for the plan, even when motivation is quiet.</p></div>
        </article>
      </section>

      <section className="content-grid">
        <article className="panel tasks-panel">
          <div className="panel-heading"><div><div className="section-kicker">STAY IN THE FLOW</div><h2>Today's tasks</h2></div><button className="text-action" type="button">View all <ChevronRight size={15} /></button></div>
          <div className="task-list">
            {tasks.map((task) => (
              <div className={`task-row ${task.done ? 'task-done' : ''}`} key={task.title}>
                <button className={`task-check ${task.done ? 'checked' : ''}`} type="button" aria-label={`${task.done ? 'Mark incomplete' : 'Mark complete'}: ${task.title}`}>
                  {task.done ? <Check size={14} /> : <Circle size={17} />}
                </button>
                <div className="task-main"><strong>{task.title}</strong><span>{task.goal}</span></div>
                <span className="task-time">{task.time}</span>
              </div>
            ))}
          </div>
          <button className="add-task-button" type="button"><Plus size={16} /> Add a task</button>
        </article>

        <article className="panel goals-panel">
          <div className="panel-heading"><div><div className="section-kicker">THE BIG PICTURE</div><h2>Goal progress</h2></div><button className="icon-link" type="button" aria-label="View goals"><ArrowUpRight size={18} /></button></div>
          <div className="goal-list">
            {goals.map((goal) => (
              <div className="goal-item" key={goal.title}>
                <div className="goal-line"><div><span className="goal-category">{goal.category}</span><strong>{goal.title}</strong></div><b>{goal.progress}%</b></div>
                <div className="progress-track"><div className={`progress-fill ${goal.color}`} style={{ width: `${goal.progress}%` }} /></div>
                <span className="goal-detail">{goal.detail}</span>
              </div>
            ))}
          </div>
          <button className="all-goals-button" type="button">See all goals <ChevronRight size={15} /></button>
        </article>
      </section>

      <section className="bottom-grid">
        <article className="upcoming-card">
          <div className="upcoming-icon"><CalendarDays size={19} /></div>
          <div className="upcoming-copy"><span className="section-kicker">LOOKING AHEAD</span><strong>Your week, in view</strong><p>Keep your deadlines and plans in one place.</p></div>
          <button className="upcoming-link" type="button" aria-label="Open calendar"><ChevronRight size={19} /></button>
        </article>
        <article className="review-card">
          <div className="review-graphic"><TrendingUp size={21} /></div>
          <div className="review-copy"><span className="section-kicker">REFLECT & RESET</span><strong>Make your progress visible</strong><p>Take a few minutes to review the week and set your next focus.</p></div>
          <button className="review-button" type="button">Weekly review <ArrowUpRight size={15} /></button>
        </article>
      </section>
      <footer className="dashboard-footer">Built for progress, not perfection. <span>Keep moving forward.</span></footer>
    </div>
  )
}
