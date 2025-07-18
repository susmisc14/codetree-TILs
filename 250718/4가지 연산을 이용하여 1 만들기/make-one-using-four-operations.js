const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

let N = Number(input[0]);

// Please Write your code here.
function solve() {
    const visited = new Set();
    const queue = [];
    queue.push([N, 0]);

    let minCount = Infinity;

    while (queue.length > 0) {
        const [currentValue, count] = queue.shift();

        if (currentValue === 1) {
            minCount = Math.min(count, minCount);
            break;
        }

        if (currentValue % 3 === 0) {
            const nextValue = currentValue / 3;
            
            if (!visited.has(nextValue)) {
                queue.push([nextValue, count + 1]);
                visited.add(nextValue);
            }
        }

        if (currentValue % 2 === 0) {
            const nextValue = currentValue / 2;

            if (!visited.has(nextValue)) {
                queue.push([nextValue, count + 1]);
                visited.add(nextValue);
            }
        }


        for (let i = 0; i < 2; i++) {
            if (i === 0) {
                const nextValue = currentValue + 1;

                if (!visited.has(nextValue)) {
                    queue.push([nextValue, count + 1]);
                    visited.add(nextValue);
                }
            }
            
            if (i === 1) {
                const nextValue = currentValue - 1;

                if (!visited.has(nextValue)) {
                    queue.push([nextValue, count + 1]);
                    visited.add(nextValue);
                }
            }
        }
    }

    return minCount
}

console.log(solve());
