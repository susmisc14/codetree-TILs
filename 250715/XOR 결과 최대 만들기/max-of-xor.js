const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const a = input[1].split(' ').map(Number);

// Please Write your code here.
function solve() {
    const result = (function recursive(index, sequence) {
        if (index === N && sequence.length !== M) {
            return 0;
        }

        if (sequence.length === M) {
            return sequence.reduce((acc, current) => acc ^ current, 0);
        }

        const resultWithSkipped = recursive(index + 1, sequence);
        const resultWithKept = recursive(index + 1, [...sequence, a[index]]);

        return Math.max(resultWithSkipped, resultWithKept);
    })(0, []);

    return result;
}

console.log(solve());