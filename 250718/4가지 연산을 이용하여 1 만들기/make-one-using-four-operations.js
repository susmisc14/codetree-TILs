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

        if (value % 3 === 0) {
            queue.push([value / 3, count + 1]);
            continue;
        }

        if (value % 2 === 0) {
            queue.push([value / 2, count + 1]);
            continue;
        }

        for (let i = 0; i < 2; i++) {
            if (i === 0) {
                queue.push([value + 1, count + 1]);
                continue
            }
            
            if (i === 1) {
                queue.push([value - 1, count + 1]);
                continue
            }
        }
    }

    return minCount
}

console.log(solve());