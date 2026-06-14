import { useEffect, useState } from "react";

import { categoryValidator } from "../../utils/categoryValidation";
import { useForm } from "../../hooks/useForm";

import Modal from "../common/Modal";
import Input from "../common/Input";
import ImageUpload from "../common/ImageUpload";
import Button from "../common/Button";

const CategoryModal = ({ isOpen, onClose, onSave, loading, initialData }) => {
    const { values, errors, setErrors, setValues, handleChange, resetForm } = useForm({
        name: "",
        description: "",
        image: null
    });

    const [preview, setPreview] = useState(null);

useEffect(() => {
    if (isOpen && initialData) {
        setValues({
            name: initialData.name || "",
            description: initialData.description || "",
            image: null
        });
        setPreview(initialData?.image?.url || null);
    } else if (isOpen && !initialData) {
        resetForm();
        setPreview(null);
    }
}, [isOpen, initialData]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setValues((prev) => ({ ...prev, image: file }));
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        // Validate form fields
        const validationErrors = categoryValidator(values);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        if (values.image) {
            formData.append("image", values.image);
        }

        onSave(formData);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add New Category">
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <Input
                    label="Category Name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    error={errors.name}
                    placeholder="Enter category name"
                    required
                />

                <Input
                    label="Description"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    placeholder="Enter description"
                    required
                />

                <ImageUpload
                    label="Category Image"
                    preview={preview}
                    onChange={handleImageChange}
                    onRemove={() => {
                        setPreview(null);
                        setValues((prev) => ({ ...prev, image: null }));
                    }}
                />

                <div className="flex gap-2 pt-4">
                    <Button
                        type="button"
                        className="bg-amber-400 hover:bg-yellow-500 text-black !w-auto"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" loading={loading} className="!w-auto">
                        Save Category
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default CategoryModal;