const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const n = Number(input[0]);
const grid = input.slice(1, n + 1).map(line => line.split(' ').map(Number));

// Please Write your code here.
function solve(grid) {
    let dp = 0;

    // 시계 방향
    const dx = [1, 0, -1, 0];
    const dy = [0, 1, 0, -1];

    const move = (x, y, count) => {
        let value = count;

        // 현재 위치에서 시계방향 탐색
        for (let i = 0; i < 4; i++) {
            const nx = x + dx[i];
            const ny = y + dy[i];

            // 그리드 범위를 벗어났을 때
            if (ny < 0 || ny >= grid.length || nx < 0 || nx >= grid[y].length) continue;

            // 현재 위치의 값이 다음 위치의 값보다 크거나 같을 때
            if (grid[y][x] >= grid[ny][nx]) continue;

            value = Math.max(move(nx, ny, count + 1), value);
        }

        return value;
    }

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] !== 1) continue;

            dp = Math.max(move(x, y, 0), dp);
        }
    }

    return dp;
}

console.log(solve(grid) + 1);