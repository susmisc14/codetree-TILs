const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split("\n");

const N = Number(input[0]);
const cost = input.slice(1, N + 1).map(line => line.split(" ").map(Number));

// Please Write your code here.
function solve() {
    const visited = new Array(N).fill(false);
    visited[0] = true;

    const result = (function recursive(path, currentSum) {
        if (path.length === N) {
            const last = path[path.length - 1];
            const first = path[0];

            if (cost[last][first] === 0) return;

            return currentSum + cost[last][first];
        }

        const last = path[path.length - 1];
        let minCost = Infinity;

        for (let next = 0; next < N; next++) {
            if (!visited[next] && cost[last][next] !== 0) {
                visited[next] = true;                
                path.push(next);

                minCost = Math.min(recursive(path, cost[last][next] + currentSum), minCost);
                visited[next] = false;
                path.pop();
            }
        }

        return minCost;
    })([0], 0);

    
    return result;
}

console.log(solve());