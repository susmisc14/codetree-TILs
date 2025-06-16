const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const n = Number(input[0]);
const grid = input.slice(1, n + 1).map(line => line.split(' ').map(Number));

// Please Write your code here.
function solve(n, grid) {
    const visited = new Set();

    // 시계 방향
    const dx = [1, 0, -1, 0];
    const dy = [0, 1, 0, -1];

    const findResidents = (y, x) => {        
        visited.add(`${y}-${x}`);

        let numberOfResidents = 1;
        for (let i = 0; i < 4; i++) {
            const ny = y + dy[i];
            const nx = x + dx[i];

            // 그리드 범위를 벗어났을 때
            if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue;

            // 이미 방분한 셀일 때
            if (visited.has(`${ny}-${nx}`)) continue;

            // 다음 셀에 사람이 있는 경우
            if (grid[ny][nx] === 1) {
                numberOfResidents += findResidents(ny, nx);
            };
        }

        return numberOfResidents;
    }

    let villages = [];
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (visited.has(`${i}-${j}`) || grid[i][j] === 0) continue;

            villages.push(findResidents(i, j));
        }
    }

    return villages.sort((a, b) => a - b);
}

const result = solve(n, grid)
console.log(result.length);

for (const item of result) {
    console.log(item);
}