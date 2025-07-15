const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);

// Please Write your code here.
function solve() {
    const result = (function recursive(start, sequence) {
        if (sequence.length === M) {
            return [sequence];
        }

        let sequences = [];

        for (let i = start; i <= N; i++) {
            sequences.push(...recursive(i + 1, [...sequence, i]));
        }

        return sequences;
    })(1, []);

    return result
            .map((current) => current.join(" "))
            .join("\n");
}

console.log(solve());