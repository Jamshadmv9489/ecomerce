export const productValidator = (values) => {
    let errors = {};

    // 1. Name validation
    if (!values.name || !values.name.trim()) {
        errors.name = "Product name is required";
    }

    // 2. Description validation
    if (!values.description || !values.description.trim()) {
        errors.description = "Description is required";
    }

    // 3. Price validation
    if (!values.price) {
        errors.price = "Price is required";
    } else if (isNaN(values.price) || Number(values.price) < 0) {
        errors.price = "Price must be a valid positive number";
    }

    // 4. Category validation
    if (!values.category) {
        errors.category = "Please select a category";
    }

    // 5. Stock validation
    if (values.stock === "" || values.stock === undefined) {
        errors.stock = "Stock count is required";
    } else if (isNaN(values.stock) || Number(values.stock) < 0) {
        errors.stock = "Stock must be a valid non-negative number";
    }

    return errors;
};