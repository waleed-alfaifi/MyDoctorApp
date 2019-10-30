// All these validation methods are passed to the req object automatically by the express-validator package.

export const SaveUser = (req, res) => {
  req
    .checkBody('name')
    .notEmpty()
    .withMessage('لا يمكن ترك حقل الاسم فارغاً.');

  req
    .checkBody('email')
    .notEmpty()
    .withMessage('لا يمكن ترك حقل البريد الإلكتروني فارغاً.');

  req
    .checkBody('email')
    .isEmail()
    .withMessage('صيغة البريد الإلكتروني غير صحيحة.');

  req
    .checkBody('password')
    .notEmpty()
    .withMessage('لا يمكن ترك حقل كلمة المرور فارغاً.');

  req
    .checkBody('userType')
    .notEmpty()
    .withMessage('لا يمكن ترك حقل نوع المستخدم فارغاً.');
};
