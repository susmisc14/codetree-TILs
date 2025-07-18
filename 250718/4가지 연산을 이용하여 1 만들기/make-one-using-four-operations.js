const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

let N = Number(input[0]);

// Please Write your code here.
function solve() {
    const queue = [];
    queue.push([N, 0]);

    let minCount = Infinity;

    while (queue.length > 0) {
        const [value, count] = queue.shift();

        if (value === 1) {
            minCount = Math.min(count, minCount);
            break;
        }

        for (let i = 0; i < 4; i++) {
            if (i === 0) {
                queue.push([value + 1, count + 1]);
            } else if (i === 1) {
                queue.push([value - 1, count + 1]);
            } else if (i === 2) {
                if (value % 3 === 0) {
                    queue.push([value / 3, count + 1]);
                }
            } else {
                if (value % 2 === 0) {
                    queue.push([value / 2, count + 1]);
                }
            }
        }
    }

    return minCount
}

console.log(solve());