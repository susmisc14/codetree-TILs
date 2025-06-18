const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);
const grid = input.slice(1, n + 1).map(line => line.split(' ').map(Number));
const bombColumns = input.slice(n + 1, n + 1 + m).map(Number);

// Please Write your code here.
let newGrid = grid.map((row) => [...row]);

for (let y = 0; y < m; y++) {
    const bombColumn = bombColumns[y];
    newGrid = explode(newGrid, bombColumn - 1, y);
}

for (const row of newGrid) {
    console.log(row.join(" "));
}

// 헬퍼 함수
function explode(grid, x, y) {
    const cloned = grid.map((row) => [...row]);
    const n = cloned.length;

    // 시계 방향
    const dy = [0, 1, 0, -1];
    const dx = [1, 0, -1, 0];

    if (cloned[y][x] === 0) {
        y = Math.min(y + 1, n - 1);
    }

    const currentValue = cloned[y][x];
    
    cloned[y][x] = 0;

    for (let i = 1; i < currentValue; i++) { 
        for (let j = 0; j < 4; j++) {
            const nx = x + (dx[j] * i);
            const ny = y + (dy[j] * i);

            if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue;

            cloned[ny][nx] = 0;
        }
    }

    return drop(cloned);
}

function drop (grid) {
    const cloned = grid.map((row) => [...row]);
    const n = cloned.length;
    
    for (let i = 0; i < n; i++) {
        let keepRow = null;
        
        for (let j = n - 1; j >= 0; j--) {
            if (cloned[j][i] === 0) {
                keepRow = j;
                continue;
            };

            if (keepRow !== null) {
                cloned[keepRow][i] = cloned[j][i];
                cloned[j][i] = 0;
                keepRow = j;
            }
        }
    }

    return cloned;
}