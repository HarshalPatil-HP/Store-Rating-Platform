import { body } from "express-validator";

const createStoreValidators = () => {
  return [
    body("name")
      .trim()
      .notEmpty().withMessage("Store name is required")
      .isLength({ min: 20, max: 60 }).withMessage("Store name must be between 20 and 60 characters"),

    body("email")
      .trim()
      .notEmpty().withMessage("Store email is required")
      .isEmail().withMessage("Please provide a valid email address")
      .normalizeEmail(),

    body("address")
      .trim()
      .notEmpty().withMessage("Address is required")
      .isLength({ max: 400 }).withMessage("Address cannot exceed 400 characters")
  ];
};

export { createStoreValidators };