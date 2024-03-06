export default function GameBoard({ onSelectSquare, board }) {
    return <ol id="game-board">
        {board.map((row, rowIndex) => (<li key={rowIndex}>
            <ol>
                {row.map((symbol, colIndex) =>
                (<li key={colIndex}>
                    {symbol === null ?
                        <button onClick={() => onSelectSquare(rowIndex, colIndex)}>{symbol}</button> :
                        <button disabled>{symbol}</button>}
                </li>))}
            </ol>
        </li>))}
    </ol>
}