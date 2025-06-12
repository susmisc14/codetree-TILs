const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');
const n = parseInt(input[0]);
const numbers = input[1].split(' ').map(Number);

// Please Write your code here.
numbers.sort((a, b) => a - b);

let result = Infinity;

for (let left = 0; left < n; left++) {
    let right = left + 1;

    while (right < n) {
        const sum = numbers[left] + numbers[right];
        const diff = Math.abs(sum) - Math.abs(result);

        if (Math.sign(diff) === -1) {
            result = sum;
        }

        right++;
    }
}

console.log(result);
