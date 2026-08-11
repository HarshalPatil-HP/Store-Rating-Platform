import { body } from "express-validator";

const userRegistrationValidators = () => {
  return [
    body("name")
      .trim()
      .notEmpty().withMessage("Name is required")
      .isLength({ min: 5, max: 40 }).withMessage("Name must be between 5 and 40 characters"),

    body("email")
      .trim()
      .notEmpty().withMessage("Email is required")
      .isEmail().withMessage("Please provide a valid email address")
      .customSanitizer((value) => value.toLowerCase()),

    body("address")
      .trim()
      .notEmpty().withMessage("Address is required")
      .isLength({ min: 5, max: 40 }).withMessage("Address must be between 5 and 40 characters"),

    body("password")
      .notEmpty().withMessage("Password is required")
      .isLength({ min: 8, max: 16 }).withMessage("Password must be 8-16 characters")
      .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
      .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage("Password must contain at least one special character")
  ];
};

const userLoginValidators = () => {
  return [
    body("email")
      .trim()
      .notEmpty().withMessage("Email is required")
      .isEmail().withMessage("Please provide a valid email address")
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
      .isLength({ min: 8, max: 16 }).withMessage("New password must be 8-16 characters")
      .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
      .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage("Password must contain at least one special character")
  ];
};

const createUserByAdminValidators = () => {
  return [
    body("name")
      .trim()
      .notEmpty().withMessage("Name is required")
      .isLength({ min: 5, max: 40 }).withMessage("Name must be between 5 and 40 characters"),

    body("email")
      .trim()
      .notEmpty().withMessage("Email is required")
      .isEmail().withMessage("Please provide a valid email address")
      .customSanitizer((value) => value.toLowerCase()),

    body("address")
      .trim()
      .notEmpty().withMessage("Address is required")
      .isLength({ min: 5, max: 40 }).withMessage("Address must be between 5 and 40 characters"),

    body("password")
      .notEmpty().withMessage("Password is required")
      .isLength({ min: 8, max: 16 }).withMessage("Password must be 8-16 characters")
      .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
      .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage("Password must contain at least one special character"),

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
      .isLength({ min: 5, max: 40 }).withMessage("Store name must be between 5 and 40 characters"),

    body("email")
      .trim()
      .notEmpty().withMessage("Store email is required")
      .isEmail().withMessage("Please provide a valid email address")
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