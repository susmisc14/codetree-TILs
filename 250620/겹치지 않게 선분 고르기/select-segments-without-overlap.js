const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');
const n = Number(input[0]);
const segments = input.slice(1, 1 + n).map(line => line.trim().split(' ').map(Number));

// Please Write your code here.
const result = (function recursive(segments) {
    let count = 1;
    
    for (const segment of segments) {
        const filtered = segments.filter(
            ([start, end]) => !(segment.includes(start) || segment.includes(end))
        );

        if (filtered.length === 0) {
            return count;
        }

        count = Math.max(recursive(filtered) + 1, count);
    }

    return count;
})(segments);

console.log(result);