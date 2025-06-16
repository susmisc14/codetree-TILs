const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);
const grid = input.slice(1, n + 1).map(line => line.split(' ').map(Number));

// Please Write your code here.
function solve(n, m, grid) {
    const visited = Array.from({ length: n }, () => Array.from({ length: m }).fill(false));
    const queue = [];

    // 시계 방향
    const dx = [1, 0, -1, 0];
    const dy = [0, 1, 0, -1];

    // 1. 큐에 시작점 정보 [y, x, distance]를 추가
    queue.push([0, 0, 0]);
    visited[0][0] = true;

    // 2. 큐가 빌 때까지 반복
    while (queue.length > 0) {
        const [y, x, distance] = queue.shift();

        // 3. 도착지에 도달했으면 현재 거리 반환
        if (y === n - 1 && x === m - 1) {
            return distance;
        }

        // 4. 시계 방향으로 인접한 칸 탐색
        for (let i = 0; i < 4; i++) {
            const ny = y + dy[i];
            const nx = x + dx[i];

            // 5. 다음 칸이 유효한지 확인
            if (ny >= 0 && ny < n && nx >= 0 && nx < m && grid[ny][nx] === 1 && !visited[ny][nx]) {
                visited[ny][nx] = true;
                
                // 6. 유효하면 다음 탐색을 위해 큐에 추가
                queue.push([ny, nx, distance + 1]);
            }
        }
    }

    // 큐가 모두 비었는데 도달하지 못했다면 길이 없는 것
    return -1;
}

console.log(solve(n, m, grid));