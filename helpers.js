const ExpressError = require("./expressError");

function convertStringToNumArray(str) {
  let strArray = str.split(",");
  let numArray = [];
  for (let i = 0; i <= strArray.length - 1; i++) {
    let value = Number(strArray[i]);
    if (Number.isNaN(value)) {
      throw new ExpressError(`'${strArray[i]}' is not a valid number`, 400);
    }
    numArray.push(Number(value));
  }
  return numArray;
}

function mean(arr) {
  if (arr.length === 0) return 0;
  let sum = 0;
  arr.forEach((n) => {
    sum += n;
  });
  return sum / arr.length;
}

function median(arr) {
  let median;
  const sorted = arr.sort((a, b) => {
    return a - b;
  });
  if (arr.length % 2 === 1) {
    median = Math.floor(arr.length / 2);
    return sorted[median];
  }
  median = arr.length / 2;
  return (sorted[median - 1] + sorted[median]) / 2;
}

function frequencyCount(arr) {
  return arr.reduce((acc, next) => {
    acc[next] = (acc[next] || 0) + 1;
    return acc;
  }, {});
}

function mode(arr) {
  let freq = frequencyCount(arr);

  let count = 0;
  let mode;

  for (let key in freq) {
    if (freq[key] > count) {
      mode = key;
      count = freq[key];
    }
  }
  return mode * 1;
}

module.exports = {
  convertStringToNumArray,
  mean,
  median,
  frequencyCount,
  mode,
};
