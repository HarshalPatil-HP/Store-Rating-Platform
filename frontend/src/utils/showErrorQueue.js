import toast from "react-hot-toast";

const TOAST_DURATION = 3500; // ms each toast stays visible

/**
 * Shows backend validation errors one at a time in a queue.
 * Backend errors are an array of { fieldName: "message" } objects.
 * Falls back to a plain message string if no errors array exists.
 *
 * @param {object} err - Axios error object
 * @param {string} fallback - Fallback message when no specific errors returned
 */
export function showErrorQueue(err, fallback = "Something went wrong") {
  const errors = err?.response?.data?.errors;

  if (errors && Array.isArray(errors) && errors.length > 0) {
    errors.forEach((errorObj, index) => {
      const message =
        typeof errorObj === "string" ? errorObj : Object.values(errorObj)[0];

      setTimeout(() => {
        toast.error(message, { duration: TOAST_DURATION });
      }, index * (TOAST_DURATION + 200)); // stagger by toast duration + small gap
    });
  } else {
    // Plain message from backend (e.g. "Invalid email or password")
    const message = err?.response?.data?.message || fallback;
    toast.error(message, { duration: TOAST_DURATION });
  }
}
