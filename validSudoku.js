function isValidSudoku(board) {
    // Helper function to check if a number can be placed at a specific position
    function isValidPlacement(row, col, num) {
        // Check if the number exists in the current row or column
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === num || board[i][col] === num) {
                return false;
            }
        }

        // Check if the number exists in the 3x3 subgrid
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[startRow + i][startCol + j] === num) {
                    return false;
                }
            }
        }

        // If the number can be placed, return true
        return true;
    }

    // Main logic to solve the Sudoku puzzle
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] !== '.') {
                // Skip filled cells
                continue;
            }

            // Try placing numbers from '1' to '9'
            for (let num = '1'; num <= '9'; num++) {
                if (isValidPlacement(row, col, num)) {
                    // Place the number if it's valid
                    board[row][col] = num;

                    // Recursively try to fill the rest of the board
                    if (isValidSudoku(board)) {
                        return true;
                    }

                    // If placing the current number doesn't lead to a solution, backtrack
                    board[row][col] = '.';
                }
            }

            // If no number can be placed at the current position, backtrack
            return false;
        }
    }

    // If the entire board is filled, the Sudoku is solved
    return true;
}

// Example usage:
const sudokuBoard = [
    ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
    ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
    ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
    ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
    ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
    ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
    ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
    ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
    ['.', '.', '.', '.', '8', '.', '.', '7', '9']
];

console.log(isValidSudoku(sudokuBoard));
