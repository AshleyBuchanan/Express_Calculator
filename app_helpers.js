// unifying function call
const getNumsFromQuery = (req, res, next) => {
    const tokens = parseNumsString(req.query.nums);
    
    const { invalid } = validateNumberStrings(tokens);
    if (invalid.length) {
        return res.status(400).json({
            error: `Invalid number(s): ${invalid.join(', ')}`
        });
    };

    req.nums = convertToNumbers(tokens);

    next();
};

const parseNumsString = (numsString) => {
    if (!numsString) return [];
    return numsString.split(',');
};

const validateNumberStrings = (tokens) => {
    const invalid = tokens.filter(token => {
        const trimmed = token.trim();
        return trimmed === '' || Number.isNaN(Number(trimmed));
    });

    return {
        isValid: invalid.length === 0,
        invalid
    };
};

const convertToNumbers = (tokens) => {
    return tokens.map(token => Number(token.trim()));
};


//helper helpers
const findMedian = (arr) => {
    const sorted = arr.sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);

    return median = sorted.length % 2 === 0
        ? (sorted[mid - 1] + sorted[mid]) / 2
        : sorted[mid];
};

const findMode = (arr) => {
    const counts = new Map();

    for (const num of arr) {
        counts.set(num, (counts.get(num) || 0) + 1);
    };

    let maxCount = 0;
    for (const count of counts.values()) {
        if (count > maxCount) maxCount = count;
    };

    if (maxCount === 1) return null;

    const modes = [];
    for (const [num, count] of counts.entries()) {
        if (count === maxCount) modes.push(num);
    };

    return modes.length === 1 ? modes[0] : null;
};

module.exports = {
    getNumsFromQuery,
    findMedian,
    findMode
};