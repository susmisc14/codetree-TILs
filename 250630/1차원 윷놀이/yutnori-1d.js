const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [n, m, k] = input[0].split(' ').map(Number);
const nums = input[1].split(' ').map(Number);

// Please Write your code here.
function solve() {
    const initialPiecePositions = new Array(k).fill(1);

    const result = (function recursive(turn, piecePositions) {
        // Base Case
        if (turn === n) {
            return piecePositions.filter((piecePosition) => piecePosition >= m).length;
        }

        // Recursive Step
        let maxScore = piecePositions.filter((pos) => pos >= m).length;
        
        for (let i = 0; i < k; i++) {
            if (piecePositions[i] >= m) continue;

            const nextPiecePositions = [...piecePositions];
            nextPiecePositions[i] += nums[turn];

            maxScore = Math.max(recursive(turn + 1, nextPiecePositions), maxScore); 
        }

        return maxScore;
    })(0, initialPiecePositions);

    return result;
}

console.log(solve());