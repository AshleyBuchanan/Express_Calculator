const { findMean, findMedian, findMode } = require('./app_helpers');

describe('findMedian', () => {
    test('finds median of odd-length array', () => {
        expect(findMedian([1, 2, 3])).toBe(2);
    });

    test('finds median of even-length array', () => {
        expect(findMedian([1, 2, 3, 4])).toBe(2.5);
    });

    test('returns null for empty array', () => {
        expect(findMedian([])).toBe(null);
    });

    test('handles negative numbers', () => {
        expect(findMedian([-5, -1, -3])).toBe(-3);
    });
});

describe('findMode', () => {
    test('finds mode of one dominant value in array', () => {
        expect(findMode([1, 2, 2, 3])).toBe(2);
    });

    test('returns null when passed no dominant value in array', () => {
        expect(findMode([1, 2, 3, 4])).toBe(null);
    });

    test('returns null when passed two dominant values in array', () => {
        expect(findMode([1, 1, 2, 2, 3])).toBe(null);
    });

    test('returns null for empty array', () => {
        expect(findMode([])).toBe(null);
    });
});

describe('findMean', () => {
    test('finds mean of array', () => {
        expect(findMean([1, 2, 3])).toBe(2);
    });

    test('returns null for empty array', () => {
        expect(findMean([])).toBe(null);
    });

    test('handles negative numbers', () => {
        expect(findMean([-2, -4, -6])).toBe(-4);
    });
});


