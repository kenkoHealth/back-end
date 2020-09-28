// Will eventually utilize this to handle catching errors, will check for promise success/failure and move to the next MW.
const asyncMiddleware = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncMiddleware;
