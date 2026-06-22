import { useState } from "react";

export const useForm = (initialValues) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        setValues((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (Object.keys(errors).length > 0) {
            setErrors({});
        }
    };

    const resetForm = () => {
        setValues(initialValues);
        setErrors({});
    };

    const setValue = (name, value) => {
        setValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return {
        values,
        errors,
        setErrors,
        setValues,
        setValue,
        handleChange,
        resetForm,
    };
};