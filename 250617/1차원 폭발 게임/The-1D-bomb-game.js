const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);
const numbers = input.slice(1, Number(n) + 1).map(Number);

// Please Write your code here.
let currentNumber = numbers[0];
let numberOfNumbers = 0;
let pointer = 0;

while (pointer <= numbers.length) {
    if (currentNumber === numbers[pointer]) {
        numberOfNumbers++;
        pointer++;
    } else {
        if (numberOfNumbers >= m) {
            const start = pointer - numberOfNumbers;
            numbers.splice(start, numberOfNumbers);

            pointer = 0;
        }

        currentNumber = numbers[pointer];
        numberOfNumbers = 1;
        pointer++;
    }
}

console.log(numbers.length);
console.log(numbers.reverse().join("\n"));