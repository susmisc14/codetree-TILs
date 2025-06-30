const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [k, n] = input[0].split(' ').map(Number);

// Please Write your code here.
function solve() {
    const result = (function recursive(keptSequence) {
        // Base Case
        if (keptSequence.length === n) {
            return [keptSequence];
        }

        // Recursive Step
        let sequences = [];

        for (let number = 1; number <= k; number++) {
            const length = keptSequence.length;

            if (
                length >= 2 &&
                number === keptSequence[length - 1] &&
                number === keptSequence[length - 2]
            ) {
                continue;
            }

            sequences.push(...recursive([...keptSequence, number]))
        }

        return sequences;
    })([]);

    return result
        .map((current) => current.join(" "))
        .join("\n");
}

console.log(solve());