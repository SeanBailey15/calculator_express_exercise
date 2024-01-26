const express = require("express");
const ExpressError = require("./expressError");
const { convertStringToNumArray, mean, median, mode } = require("./helpers");

const app = express();

app.use(express.json());

app.get("/mean", (req, res, next) => {
  try {
    const q = req.query.nums;
    if (!q) throw new ExpressError("Nums are required", 400);
    const nums = convertStringToNumArray(q);
    const result = mean(nums);
    if (nums instanceof Error) {
      throw new ExpressError(nums.message);
    }
    return res.json({
      response: {
        nums: nums,
        operation: "mean",
        result: result,
      },
    });
  } catch (err) {
    return next(err);
  }
});

app.get("/median", (req, res, next) => {
  try {
    const q = req.query.nums;
    if (!q) throw new ExpressError("Nums are required", 400);
    const nums = convertStringToNumArray(q);
    const result = median(nums);
    if (nums instanceof Error) {
      throw new ExpressError(nums.message);
    }
    return res.json({
      response: {
        nums: nums,
        operation: "median",
        result: result,
      },
    });
  } catch (err) {
    return next(err);
  }
});

app.get("/mode", (req, res, next) => {
  try {
    const q = req.query.nums;
    if (!q) throw new ExpressError("Nums are required", 400);
    const nums = convertStringToNumArray(q);
    const result = mode(nums);
    if (nums instanceof Error) {
      throw new ExpressError(nums.message);
    }
    return res.json({
      response: {
        nums: nums,
        operation: "mode",
        result: result,
      },
    });
  } catch (err) {
    return next(err);
  }
});

app.use((req, res, next) => {
  const err = new ExpressError("Page Not Found", 404);
  next(err);
});

app.use((error, req, res, next) => {
  let status = error.status || 500;
  let msg = error.msg;

  console.error(error.stack);
  console.error("Error:", error.msg);
  console.error("Status:", error.status);
  return res.status(status).json({
    error: { msg, status },
  });
});

app.listen(5000, () => {
  console.log("App is running on port 5000 : http://localhost:5000");
});
