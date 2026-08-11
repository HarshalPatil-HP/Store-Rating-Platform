import { body } from "express-validator";

const userRegistrationValidators = () => {
  return [
    body("name")
      .trim()
      .notEmpty().withMessage("Full name is required")
      .isLength({ min: 5, max: 40 }).withMessage("Name must be between 5 and 40 characters")
      .matches(/^[a-zA-Z\s]+$/).withMessage("Name must contain only letters and spaces — no numbers or special characters"),

    body("email")
      .trim()
      .notEmpty().withMessage("Email address is required")
      .isEmail().withMessage("Please enter a valid email address (e.g. john@gmail.com)")
      .customSanitizer((value) => value.toLowerCase()),

    body("address")
      .trim()
      .notEmpty().withMessage("Address is required")
      .isLength({ min: 5, max: 40 }).withMessage("Address must be between 5 and 40 characters"),

    body("password")
      .notEmpty().withMessage("Password is required")
      .isLength({ min: 8, max: 16 }).withMessage("Password must be 8 to 16 characters long")
      .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter (e.g. A, B, C)")
      .matches(/[0-9]/).withMessage("Password must contain at least one number (e.g. 1, 2, 3)")
      .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage("Password must contain at least one special character (e.g. @, #, !)")
  ];
};

const userLoginValidators = () => {
  return [
    body("email")
      .trim()
      .notEmpty().withMessage("Email address is required")
      .isEmail().withMessage("Please enter a valid email address (e.g. john@gmail.com)")
      .customSanitizer((value) => value.toLowerCase()),

    body("password")
      .notEmpty().withMessage("Password is required")
  ];
};

const changePasswordValidators = () => {
  return [
    body("oldPassword")
      .notEmpty().withMessage("Old password is required"),

    body("newPassword")
      .notEmpty().withMessage("New password is required")
      .isLength({ min: 8, max: 16 }).withMessage("New password must be 8 to 16 characters long")
      .matches(/[A-Z]/).withMessage("New password must contain at least one uppercase letter (e.g. A, B, C)")
      .matches(/[0-9]/).withMessage("New password must contain at least one number (e.g. 1, 2, 3)")
      .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage("New password must contain at least one special character (e.g. @, #, !)")
  ];
};

const createUserByAdminValidators = () => {
  return [
    body("name")
      .trim()
      .notEmpty().withMessage("Full name is required")
      .isLength({ min: 5, max: 40 }).withMessage("Name must be between 5 and 40 characters")
      .matches(/^[a-zA-Z\s]+$/).withMessage("Name must contain only letters and spaces — no numbers or special characters"),

    body("email")
      .trim()
      .notEmpty().withMessage("Email address is required")
      .isEmail().withMessage("Please enter a valid email address (e.g. john@gmail.com)")
      .customSanitizer((value) => value.toLowerCase()),

    body("address")
      .trim()
      .notEmpty().withMessage("Address is required")
      .isLength({ min: 5, max: 40 }).withMessage("Address must be between 5 and 40 characters"),

    body("password")
      .notEmpty().withMessage("Password is required")
      .isLength({ min: 8, max: 16 }).withMessage("Password must be 8 to 16 characters long")
      .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter (e.g. A, B, C)")
      .matches(/[0-9]/).withMessage("Password must contain at least one number (e.g. 1, 2, 3)")
      .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage("Password must contain at least one special character (e.g. @, #, !)"),

    body("role")
      .notEmpty().withMessage("Role is required")
      .isIn(["admin", "normal", "store_owner"]).withMessage("Role must be admin, normal, or store_owner")
  ];
};

const createStoreValidators = () => {
  return [
    body("name")
      .trim()
      .notEmpty().withMessage("Store name is required")
      .isLength({ min: 5, max: 40 }).withMessage("Store name must be between 5 and 40 characters")
      .matches(/^[a-zA-Z\s]+$/).withMessage("Store name must contain only letters and spaces"),

    body("email")
      .trim()
      .notEmpty().withMessage("Store email is required")
      .isEmail().withMessage("Please enter a valid email address (e.g. store@gmail.com)")
      .customSanitizer((value) => value.toLowerCase()),

    body("address")
      .trim()
      .notEmpty().withMessage("Address is required")
      .isLength({ min: 5, max: 40 }).withMessage("Address must be between 5 and 40 characters")
  ];
};

const submitRatingValidators = () => {
  return [
    body("rating")
      .notEmpty().withMessage("Rating is required")
      .isInt({ min: 1, max: 5 }).withMessage("Rating must be an integer between 1 and 5")
  ];
};

export {
  userRegistrationValidators,
  userLoginValidators,
  changePasswordValidators,
  createUserByAdminValidators,
  createStoreValidators,
  submitRatingValidators
};