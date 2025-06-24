const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const n = Number(input[0]);
const grid = input.slice(1, n + 1).map(line => line.trim().split(' ').map(Number));

// Please write your code here.
let result = 0;

for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
        const newGrid = explode(grid, c, r);
        const checked = Array.from({ length: n }, () => new Array(n).fill(false));
        let count = 0;

        // 시계 방향
        const dx = [1, 0, -1, 0];
        const dy = [0, 1, 0, -1];

        for (let r2 = 0; r2 < n; r2++) {
            for (let c2 = 0; c2 < n; c2++) {
                for (let i = 0; i < 4; i++) {
                    const nx = c2 + dx[i];
                    const ny = r2 + dy[i];

                    if (newGrid[r2][c2] === 0) continue;
                    
                    if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue;

                    if (newGrid[r2][c2] === newGrid[ny][nx] && !checked[ny][nx]) {
                        checked[r2][c2] = true;
                        count++;
                    }
                }
            }
        }

        result = Math.max(count, result);
    }
}

console.log(result);

// helpers
function explode(grid, cx, cy) {
    let newGrid = grid.map((row) => [...row]);
    
    // 시계 방향
    const dx = [1, 0, -1, 0];
    const dy = [0, 1, 0, -1];

    const value = grid[cy][cx];

    newGrid[cy][cx] = 0;

    for (let i = 0; i < value; i++) {
        for (let j = 0; j < 4; j++) {
            const nx = cx + (dx[j] * i);
            const ny = cy + (dy[j] * i);

            if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue;

            newGrid[ny][nx] = 0;
        }
    }

    newGrid = drop(newGrid);

    return newGrid
}

function drop(grid) {
    const newGrid = Array.from({ length: n }, () => new Array(n).fill(0));

    for (let c = 0; c < n; c++) {
        let keepRow = n - 1;

        for (let r = n - 1; r >= 0; r--) {
            if (grid[r][c] === 0) continue;

            newGrid[keepRow][c] = grid[r][c];
            keepRow--;
        }
    }

    return newGrid;
}