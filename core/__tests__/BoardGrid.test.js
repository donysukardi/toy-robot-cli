import BoardGrid from '../BoardGrid';

describe('BoardGrid', () => {
  it('should render cells in rows with given width and height', () => {
    const renderCell = ({ row, column }) => `[${column},${row}]`;
    const renderRow = ({ children }) => children.join(',');

    const result = BoardGrid({ width: 3, height: 3, renderRow, renderCell });
    expect(result).toMatchInlineSnapshot(`
      Array [
        "[0,2],[1,2],[2,2]",
        "[0,1],[1,1],[2,1]",
        "[0,0],[1,0],[2,0]",
      ]
    `);
  });
});
