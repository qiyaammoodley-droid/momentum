import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('Momentum app', () => {
  it('renders the personalised dashboard and primary navigation', () => {
    render(<MemoryRouter initialEntries={['/dashboard']}><App /></MemoryRouter>)
    expect(screen.getByRole('heading', { name: /good to see you/i })).toBeInTheDocument()
    expect(screen.getByText('Your goals')).toBeInTheDocument()
   expect(screen.getAllByRole('link', { name: /my goals/i })).toHaveLength(2)
  })
})
