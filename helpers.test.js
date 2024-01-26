const ExpressError = require("./expressError");
const {
  mean,
  median,
  mode,
  convertStringToNumArray,
  frequencyCount,
} = require("./helpers");

describe("Find the median (middle value) of an array of numbers", () => {
  it("finds the median of an even length array", () => {
    expect(median([1, 2, 3, 4, 5, 6])).toEqual(3.5);
    expect(median([6, 4, 5, 1, 2, 3])).toEqual(3.5);
    expect(median([6, 4, 5, -1, -2, 3])).toEqual(3.5);
    expect(median([6, 4, -5, 1, 2, 3])).toEqual(2.5);
  });
  it("finds the median of an odd length array", () => {
    expect(median([1, 2, 3, 4, 5])).toEqual(3);
    expect(median([4, 1, 2, 5, 3])).toEqual(3);
    expect(median([4, -1, -2, 5, 3])).toEqual(3);
    expect(median([4, 1, 2, -5, 3])).toEqual(2);
  });
});

describe("Find the mean (average) of an array of numbers", () => {
  it("finds the mean of an empty array", () => {
    expect(mean([])).toEqual(0);
  });
  it("finds the mean of an array of numbers", () => {
    expect(mean([1, 2, 3, 4, 5])).toEqual(3);
    expect(mean([5, 5, 5, 5, 5])).toEqual(5);
    expect(mean([5, 5, 5, 5, -5])).toEqual(3);
  });
});

describe("Find the mode (most frequent number) of an array", () => {
  it("finds the mode", () => {
    expect(mode([1, 1, 1, 2, 2, 3])).toEqual(1);
    expect(mode([1, 1, 2, 2, 2, 3])).toEqual(2);
    expect(mode([1, 1, 2, 2, 2, 3, 3, 3, 3])).toEqual(3);
    expect(mode([1, 1, 2, 2, 2, -3, -3, -3, -3])).toEqual(-3);
  });
});

describe("Convert a query string of numbers into an array of integers", () => {
  it("converts the array successfully", () => {
    expect(convertStringToNumArray("1,2,3,4")).toEqual([1, 2, 3, 4]);
  });
  it("throws an error if part of the query string is not a number", () => {
    function badQuery() {
      convertStringToNumArray("1,2,foo");
    }
    expect(badQuery).toThrowError(ExpressError);
  });
});

describe("Counts how many times a value occurs within the array", () => {
  it("counts the frequency of values and returns an object", () => {
    expect(frequencyCount([1, 2, 2, 3, 3, 3, 4])).toEqual({
      1: 1,
      2: 2,
      3: 3,
      4: 1,
    });
  });
});
