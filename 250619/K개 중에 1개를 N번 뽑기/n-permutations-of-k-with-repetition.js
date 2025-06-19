const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');
const [k, n] = input[0].split(' ').map(Number);

// Please write your code here.
const result = (function recursive(currentSequence) {
    if (currentSequence.length === n) {
        return [currentSequence];
    }

    const sequences = [];

    for (let i = 1; i <= k; i += 1) {
        sequences.push(...recursive([...currentSequence, i]));
    }

    return sequences;
})([]);

result.forEach((sequence) => console.log(sequence.join(" ")));
