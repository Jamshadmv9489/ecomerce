export const validateCategory = (values) => {
    let errors = {};

    // Name validation
    if (!values.name || !values.name.trim()) {
        errors.name = "Category name is required";
    }
    return errors;
};