const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);
const grid = input.slice(1, n + 1).map(row => row.split(' ').map(Number));

// Please Write your code here.
const visited = Array.from({ length: n }, () => Array(m).fill(false));

const dx = [1, 0];
const dy = [0, 1];

const result = (function recursive(x, y){
    let arrival = 0;

    if (x === n - 1 && y === m - 1) {
        return 1;        
    }
    
    visited[y][x] = true;

    for (let i = 0; i < 2; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;

        if (grid[ny][nx] === 1 && !visited[ny][nx]) {
            arrival = Math.max(recursive(nx, ny), arrival);
        }
    }

    return arrival;
})(0, 0);

console.log(result);