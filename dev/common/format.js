import { getBorderCharacters, table } from 'table';

export const format = (title, initial, incremented, extended, spun) =>
  table(
    [
      [title, ''],
      ['Initial', initial],
      ['Incremented', incremented],
      ['Extended', extended],
      ['Spun', spun],
    ],
    {
      border: getBorderCharacters('norc'),
      spanningCells: [{ col: 0, colSpan: 2, row: 0 }],
    }
  );
