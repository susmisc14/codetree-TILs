const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const a = input[1].split(' ').map(Number);

// Please Write your code here.
function solve() {
    const result = (function recursive(sequence) {
        if (sequence.length === M) {
            return sequence.reduce((acc, current) => acc ^ current, 0);
        }

        let maxValue = 0;

        for (const element of a) {
            maxValue = Math.max(recursive([...sequence, element]), maxValue);
        }

        return maxValue;
    })([]);

    return result;
}

console.log(solve());