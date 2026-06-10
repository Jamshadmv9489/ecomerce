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

/**
 * Validates login form fields.
 * @param {Object} values - The login form state (email, password).
 * @returns {Object} An object containing validation errors, if any.
 */
export const validateLogin = (values) => {
  const errors = {};
  const emailRegex = /\S+@\S+\.\S+/;

  // Email validation
  if (!values.email) {
    errors.email = "Email address is required";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "Please fill a valid email address";
  }

  // Password validation
  if (!values.password) {
    errors.password = "Password is required";
  }

  return errors;
};



// Shipping Address
export const validateShippingAddress = (values) => {
    let errors = {};

    if (!values.street.trim()) errors.street = "Street address is required";
    if (!values.city.trim()) errors.city = "City is required";
    if (!values.state.trim()) errors.state = "State is required";
    if (!values.postalCode.trim()) errors.postalCode = "Postal code is required";
    if (!values.country.trim()) errors.country = "Country is required";
    if (!values.phone.trim()) {
        errors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(values.phone)) {
        errors.phone = "Phone number must be 10 digits";
    }

    return errors;
};