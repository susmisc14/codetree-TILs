const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const N = Number(input[0]);

// Please Write your code here.
function solve() {
    const visited = new Array(N).fill(false);

    const result = (function recursive(sequence, currentVisited) {
        if (sequence.length === N) {
            return [sequence];
        }

        const sequences = [];

        for (let i = N; i > 0; i--) {
            if (currentVisited[i]) continue;

            currentVisited[i] = true;
            sequences.push(...recursive([...sequence, i], currentVisited));
            currentVisited[i] = false;
        }

        return sequences;
    })([], visited);

    return result
            .map((row) => row.join(" "))
            .join("\n");
}

console.log(solve());