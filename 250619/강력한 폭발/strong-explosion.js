const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const n = Number(input[0]);
const grid = input.slice(1, 1 + n).map(line => line.split(' ').map(Number));

// Please Write your code here.
const bombs = [
    [[0, -1], [0, -2], [0, 1], [0, 2]],
    [[0, -1], [1, 0], [0, 1], [-1, 0]],
    [[-1, -1], [1, -1], [1, 1], [-1, 1]],
];

const bombLocation = [];
for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        if (grid[i][j] === 1) {
            bombLocation.push([j, i]);
        }
    }
}

const result = (function recursive(grid, turn) {
    if (turn === bombLocation.length) {
        return countDestroyed(grid);
    }

    const [x, y] = bombLocation[turn];
    let count = 0;

    for (const bomb of bombs) {
        const cloned = grid.map((row) => [...row]);
        const n = cloned.length;

        cloned[y][x] = -1;
        
        for (const [dx, dy] of bomb) {
            const nx = x + dx;
            const ny = y + dy;

            if (nx >= 0 && nx < n && ny >= 0 && ny < n) {
                cloned[ny][nx] = -1;
            }
        }

        count = Math.max(recursive(cloned, turn + 1), count);
    }

    return count;
})(grid, 0);

console.log(result);

// 헬퍼 함수
function countDestroyed(grid) {
    const n = grid.length;
    let count = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === -1) {
                count++;
            }
        }
    }
    return count;
}