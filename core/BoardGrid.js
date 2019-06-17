// Render grid with reversed y index, i.e. 0 index is at the bottom of the grid
export default function BoardGrid({ width, height, renderRow, renderCell }) {
  return Array.from({ length: height }).map((_, deltaY) => {
    const yIdx = height - deltaY - 1; // Reverse Y for display
    return renderRow({
      key: yIdx,
      row: yIdx,
      children: Array.from({ length: width }).map((_, deltaX) => {
        const xIdx = deltaX;
        return renderCell({
          key: xIdx,
          row: yIdx,
          column: xIdx,
        });
      }),
    });
  });
}
