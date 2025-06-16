const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const n = Number(input[0]);
const grid = input.slice(1, n + 1).map(line => line.split(' ').map(Number));

// Please Write your code here.
function solve(n, grid) {
    let dp = Array.from({ length: n }, () => Array.from({ length: n }).fill(0));

    // 시계 방향
    const dx = [1, 0, -1, 0];
    const dy = [0, 1, 0, -1];

    const findMaxPath = (y, x) => {
        // 이미 계산된 값이 있다면 즉시 반환
        if (dp[y][x] !== 0) {
            return dp[y][x];
        }
        
        let maxLength = 1;

        // 현재 위치에서 시계방향 탐색
        for (let i = 0; i < 4; i++) {
            const nx = x + dx[i];
            const ny = y + dy[i];

            // 그리드 범위를 벗어났을 때
            if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue;

            // 증가하는 경로인지 확인
            if (grid[ny][nx] > grid[y][x]) {
                maxLength = Math.max(findMaxPath(ny, nx) + 1, maxLength);
            }
        }

        dp[y][x] = maxLength;
        return maxLength;
    }

    let result = 0;
    for (let y = 0; y < n; y++) {
        for (let x = 0; x < n; x++) {
            result = Math.max(findMaxPath(y, x), result);
        }
    }

    return result;
}

console.log(solve(n, grid));