const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);
const edges = [];
for (let i = 1; i <= m; i++) {
    edges.push(input[i].split(' ').map(Number));
}

// Please Write your code here.
// 1. 인접 행렬 생성 (1-based 인덱싱을 위해 n+1 크기로)
const graph = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));
const visited = Array(n + 1).fill(false);

// 2. 간선 정보로 인접 행렬 채우기 (무방향 그래프이므로 양쪽 모두 표시)
for (const [u, v] of edges) {
    graph[u][v] = 1;
    graph[v][u] = 1;
}

visited[1] = true;

const result = (function recursive(node) {
    let count = 0;

    for(let i = 1; i <= n; i++) {
        if (graph[node][i] === 1 && !visited[i]) {
            visited[i] = true;
            count += recursive(i) + 1;
        }
    }

    return count;
})(1, 1);

console.log(result);