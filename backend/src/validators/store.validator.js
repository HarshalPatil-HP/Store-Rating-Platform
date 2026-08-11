import { body } from "express-validator";

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

export { createStoreValidators };