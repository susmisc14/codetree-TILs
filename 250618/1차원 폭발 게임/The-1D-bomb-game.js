const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);
const numbers = input.slice(1, Number(n) + 1).map(Number);

// Please Write your code here.
while (true) {
    const prevLength = numbers.length;
    if (prevLength === 0) break;

    let write = 0;
    let read = 0;

    while (read < prevLength) {
        let groupEnd = read;
        while (groupEnd + 1 < prevLength && numbers[read] === numbers[groupEnd + 1]) {
            groupEnd++;
        }

        const groupSize = groupEnd - read + 1;

        if (groupSize < m) {
            for (let i = read; i <= groupEnd; i++) {
                numbers[write] = numbers[i];
                write++;
            }
        }

        read = groupEnd + 1;
    }

    numbers.length = write;

    if (numbers.length === prevLength) break;
}

console.log(numbers.length);
console.log(numbers.join("\n"));