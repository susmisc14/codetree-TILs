const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const n = Number(input[0]);

// Please Write your code here.

/**
 * 아이디어:
 * 1. n자리수 숫자 중 아름다운 수만 모은 배열 생성
 * 2. 아름다운 수는 `isButiful()`를 통해 확인
 *  2-1. `isButiful()`에서는 인자로 받은 숫자를 문자열화 한 뒤 연속된 문자를 그룹화 해서 배열에 저장
 *  2-2. 배열을 순회하면서 group의 요소들이 아름다운지 확인
 *  2-3. 하나라도 아름답지 않으면 그 수는 아름다운 수가 아님
 */

function isButiful(number) {
    let result = false;

    const stringified = number.toString();
    const group = stringified.match(/(.)\1*/g);
    for (const item of group) {
        const first = parseInt(item[0], 10);
        if (first === 0 || item.length % first !== 0) {
            result = false;
            break;
        };

        result = true;
    }

    return result;
}

function getBeautifulNumbers(n) {
    const start = Math.pow(10, n - 1);
    const end = Math.pow(10, n) - 1;

    const numbers = [];
    for (let i = start; i <= end; i++) {
        if (!isButiful(i)) continue;
        numbers.push(i);
    }

    return numbers;
}

// 풀이
const numbers = getBeautifulNumbers(n)

console.log(numbers.length);