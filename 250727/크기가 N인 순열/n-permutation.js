const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const N = Number(input[0]);

// Please Write your code here.
function solve () {
    const visited = new Array(N + 1).fill(false);

    const reuslt = (function recursive (sequence, currentVisited) {
        if (sequence.length === N) {
            return [sequence];
        }

        let sequences = [];

        for (let i = 1; i <= N; i++) {
            if (currentVisited[i]) continue;

            currentVisited[i] = true;
            sequences.push(...recursive([...sequence, i], [...currentVisited]));
            currentVisited[i] = false;
        }

        return sequences;
    })([], visited);

    return reuslt
            .map((row) => row.join(" "))
            .join("\n");
}

console.log(solve());
