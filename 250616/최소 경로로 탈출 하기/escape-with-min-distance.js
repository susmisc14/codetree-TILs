const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);
const grid = input.slice(1, n + 1).map(line => line.split(' ').map(Number));

// Please Write your code here.
function solve(n, m, grid) {
    const visited = Array.from({ length: n }, () => Array.from({ length: m }).fill(false));
    
    // 시계 방향
    const dx = [1, 0, -1, 0];
    const dy = [0, 1, 0, -1];

    const minPath = (function recursive(y, x) {
        visited[y][x] = true;

        let length = Number.MAX_SAFE_INTEGER;

        for (let i = 0; i < 4; i++) {
            const ny = y + dy[i];
            const nx = x + dx[i];

            // 그리드 범위를 벗어났을 떄
            if (ny < 0 || ny >= n || nx < 0 || nx >= m) continue;

            // 이미 방문한 경로일 때
            if (visited[ny][nx]) continue;

            // 탈출구일 경우
            if (ny === n - 1 && nx === m - 1) {
                length = 1;
            };

            // 뱀이 없을 경우
            if (grid[ny][nx] === 1) {
                length = Math.min(recursive(ny, nx) + 1, length);
            }
        }

        return length;
    })(0, 0);

    return minPath !== Number.MAX_SAFE_INTEGER ? minPath : -1;
}

console.log(solve(n, m, grid));