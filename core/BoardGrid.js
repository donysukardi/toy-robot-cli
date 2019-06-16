export default function BoardGrid(props) {
  const { width, height, renderRow, renderCell } = props;
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
