import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { Square, calculateWinner } from './App';

test('<Square />', () => {
  render(<Square value={'X'} onSquareClick={() => vi.fn()} />);

  expect(screen.getByRole('button')).toHaveTextContent('X');
});

test('calculateWinner() で勝者を判定する', () => {
  const winnerNull = calculateWinner([
    null, null, null,
    null, null, null,
    null, null, null,
  ]);
  expect(winnerNull).toBe(null);

  const draw = calculateWinner([
    'O', 'X', 'O',
    'X', 'X', 'O',
    'X', 'O', 'X',
  ]);
  expect(draw).toBe(null);

  const winnerX = calculateWinner([
    'X', 'O', null,
    'X', 'O', null,
    'X', null, null,
  ]);
  expect(winnerX).toBe('X');

  const winnerO = calculateWinner([
    'X', 'O', null,
    null, 'O', 'X',
    'X', 'O', null,
  ]);
  expect(winnerO).toBe('O');
});
