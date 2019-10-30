const showValidationErrors = (req, res, next) => {
  const errors = req.validationErrors();

  if (errors) {
    const errorsMessages = errors.map(err => err.msg);
    return res.status(422).json({ message: errorsMessages });
  }

  next();
};

const validate = fn => {
  return function(req, res, next) {
    fn(req, res);
    showValidationErrors(req, res, next);
  };
};

export default validate;
