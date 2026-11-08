import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import DashboardPage from './DashboardPage'

describe('DashboardPage', () => {
  it('shows the dashboard overview and the PRD sample goals', () => {
    render(<MemoryRouter><DashboardPage /></MemoryRouter>)

    expect(screen.getByRole('heading', { name: /let's make it count/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: "Today's tasks" })).toBeInTheDocument()
    expect(screen.getAllByText('Learn React fundamentals').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Improve trading journal discipline').length).toBeGreaterThan(0)
  })
})
