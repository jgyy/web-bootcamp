export default (func) => {
  if (func.constructor.name === "AsyncFunction") {
    return (req, res, next) => {
      func(req, res, next).catch((err) => next(err));
    };
  }
  return (req, res, next) => {
    try {
      func(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};
