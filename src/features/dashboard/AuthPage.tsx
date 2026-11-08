
import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Compass } from 'lucide-react'
import { useAuth } from '../../app/AuthProvider'

type AuthPageProps = {
  mode: 'login' | 'register'
}

export default function AuthPage({ mode }: AuthPageProps) {
  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const isRegister = mode === 'register'

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setError('')
    setMessage('')

    if (isRegister && name.trim().length < 2) {
      setError('Please enter your name.')
      return
    }

    if (password.length < 8) {
      setError('Your password must contain at least 8 characters.')
      return
    }

    setLoading(true)

    try {
      const result = isRegister
        ? await signUp(email.trim(), password, name.trim())
        : await signIn(email.trim(), password)

      if (result.error) {
        setError(result.error.message)
        return
      }

      if (isRegister && !result.data.session) {
        setMessage(
          'Account created! Please check your email to confirm your account before logging in.'
        )
        return
      }

      navigate('/dashboard', { replace: true })
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">

        <Link to="/login" className="brand auth-brand">
          <span className="brand-symbol">
            <Compass size={20} />
          </span>

          <span>
            momentum<span className="brand-dot">.</span>
          </span>
        </Link>

        <div className="auth-heading">
          <span className="eyebrow">
            YOUR NEXT CHAPTER STARTS HERE
          </span>

          <h1>
            {isRegister ? 'Create your account' : 'Welcome back.'}
          </h1>

          <p>
            {isRegister
              ? 'Build better routines and make progress towards what matters.'
              : 'Sign in and pick up where your progress left off.'}
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          {isRegister && (
            <label className="field-label">
              Your name

              <input
                className="field-input"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your name"
                maxLength={40}
                required
              />
            </label>
          )}

          <label className="field-label">
            Email address

            <input
              className="field-input"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </label>

          <label className="field-label">
            Password

            <input
              className="field-input"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              minLength={8}
              required
            />
          </label>

          {error && (
            <p className="auth-error" role="alert">
              {error}
            </p>
          )}

          {message && (
            <p className="auth-message" role="status">
              {message}
            </p>
          )}

          <button
            className="button button-primary auth-submit"
            type="submit"
            disabled={loading}
          >
            {loading
              ? 'Please wait...'
              : isRegister
                ? 'Create account'
                : 'Sign in'}
          </button>

        </form>

        <p className="auth-switch">
          {isRegister
            ? 'Already have an account? '
            : "Don't have an account? "}

          <Link to={isRegister ? '/login' : '/register'}>
            {isRegister ? 'Sign in' : 'Create one'}
          </Link>
        </p>

      </div>
    </div>
  )
}
