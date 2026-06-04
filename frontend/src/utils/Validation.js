/**
 * Utility functions for form validation.
 */

/**
 * Validates registration form fields.
 * @param {Object} values - The registration form state (name, email, password).
 * @returns {Object} An object containing validation errors, if any.
 */
export const validateRegister = (values) => {
  const errors = {};
  const emailRegex = /\S+@\S+\.\S+/;

  // Name validation
  if (!values.name || !values.name.trim()) {
    errors.name = "User name is required";
  } else if (values.name.length < 2) {
    errors.name = "Name must be at least 2 characters long";
  }

  // Email validation
  if (!values.email) {
    errors.email = "Email address is required";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "Please fill a valid email address";
  }

  // Password validation
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};

