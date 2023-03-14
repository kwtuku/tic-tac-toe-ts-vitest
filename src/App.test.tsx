import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Game, { Square, Board, calculateWinner } from './App'

test('<Square />', () => {
  render(<Square value={'X'} onSquareClick={() => vi.fn()} />)

  expect(screen.getByRole('button')).toHaveTextContent('X')
})

test('<Board />', async () => {
  const spy = vi.fn()
  render(<Board xIsNext={true} squares={[]} onPlay={spy} />)

  await userEvent.click(screen.getAllByRole('button')[0])

  expect(spy).toHaveBeenCalled()

  spy.mockRestore()
})

test('<Game />', async () => {
  render(<Game />)

  // | X |   |   |
  // |   |   |   |
  // |   |   |   |
  const button0 = screen.getAllByRole('button')[0]
  await userEvent.click(button0)
  expect(button0).toHaveTextContent('X')

  // | X |   |   |
  // | O |   |   |
  // |   |   |   |
  const button3 = screen.getAllByRole('button')[3]
  await userEvent.click(button3)
  expect(button3).toHaveTextContent('O')

  // | X | X |   |
  // | O |   |   |
  // |   |   |   |
  const button1 = screen.getAllByRole('button')[1]
  await userEvent.click(button1)
  expect(button1).toHaveTextContent('X')

  // | X | X |   |
  // | O | O |   |
  // |   |   |   |
  const button4 = screen.getAllByRole('button')[4]
  await userEvent.click(button4)
  expect(button4).toHaveTextContent('O')

  // | X | X |   |
  // | O | O |   |
  // | X |   |   |
  const button6 = screen.getAllByRole('button')[6]
  await userEvent.click(button6)
  expect(button6).toHaveTextContent('X')

  // | X | X |   |
  // | O | O |   |
  // | X | O |   |
  const button7 = screen.getAllByRole('button')[7]
  await userEvent.click(button7)
  expect(button7).toHaveTextContent('O')

  // | X | X | X |
  // | O | O |   |
  // | X | O |   |
  const button2 = screen.getAllByRole('button')[2]
  await userEvent.click(button2)
  expect(button2).toHaveTextContent('X')

  expect(screen.getByTestId('status')).toHaveTextContent('Winner: X')

  // | X | X | X |
  // | O | O |   |
  // | X | O |   |
  const button5 = screen.getAllByRole('button')[5]
  await userEvent.click(button5)
  expect(button5).toHaveTextContent('')

  // |   |   |   |
  // |   |   |   |
  // |   |   |   |
  await userEvent.click(screen.getByTestId('step-#0'))

  // |   |   |   |
  // |   |   |   |
  // |   |   | X |
  const button8 = screen.getAllByRole('button')[8]
  await userEvent.click(button8)
  expect(button8).toHaveTextContent('X')

  expect(screen.queryByText(/move #2/)).toBeNull()
})

test('calculateWinner() で勝者を判定する', () => {
  // prettier-ignore
  const winnerNull = calculateWinner([
    null, null, null,
    null, null, null,
    null, null, null,
  ])
  expect(winnerNull).toBe(null)

  // prettier-ignore
  const draw = calculateWinner([
    'O', 'X', 'O',
    'X', 'X', 'O',
    'X', 'O', 'X'
  ])
  expect(draw).toBe(null)

  // prettier-ignore
  const winnerX = calculateWinner([
    'X', 'O', null,
    'X', 'O', null,
    'X', null, null,
  ])
  expect(winnerX).toBe('X')

  // prettier-ignore
  const winnerO = calculateWinner([
    'X', 'O', null,
    null, 'O', 'X',
    'X', 'O', null,
  ])
  expect(winnerO).toBe('O')
})
