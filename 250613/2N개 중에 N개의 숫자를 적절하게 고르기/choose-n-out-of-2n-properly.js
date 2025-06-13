const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const n = Number(input[0]);
const A = input[1].split(' ').map(Number);

// Please Write your code here.

function solve(n, numbers) {
    let totalSum = 0;
    for (const number of numbers) {
        totalSum += number;
    }

    let diff = Infinity;
    (function recursive(index, count, currentSum) {
        if (count === n) {
            const otherSum = totalSum - currentSum;            
            diff = Math.min(Math.abs(currentSum - otherSum), diff);

            return;
        }

        if (index === 2 * n) {
            return;
        }

        recursive(index + 1, count + 1, currentSum + numbers[index]);
        recursive(index + 1, count, currentSum);
    })(0, 0, 0);

    return diff;
}

console.log(solve(n, A));