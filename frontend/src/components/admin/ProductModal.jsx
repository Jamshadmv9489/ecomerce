import { useEffect, useState } from "react";

import { useForm } from "../../hooks/useForm";
import { useCategory } from "../../context/CategoryContext";
import { productValidator } from "../../utils/productValidator";

import Modal from "../common/Modal";
import Input from "../common/Input";
import ImageUpload from "../common/ImageUpload";
import Button from "../common/Button";
import Select from "../common/Select";

const ProductModal = ({ isOpen, onClose, onSave, loading, initialData }) => {
    const { values, errors, setErrors, setValues, handleChange, resetForm } = useForm({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        images: null
    });

    const {categories} = useCategory();

    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (isOpen && initialData) {
            setValues({
                name: initialData.name || "",
                description: initialData.description || "",
                price: initialData.price || "",
                category: initialData.category || "",
                stock: initialData.stock || "",
                images: null
            });
            setPreview(initialData?.images?.[0]?.url || null);
        } else if (isOpen && !initialData) {
            resetForm();
            setPreview(null);
        }
    }, [isOpen, initialData]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setValues((prev) => ({ ...prev, images: file }));
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        // Validate form fields
        const validationErrors = productValidator(values);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("price", values.price);
        formData.append("category", values.category);
        formData.append("stock", values.stock);

        if (values.images) {
            formData.append("images", values.images);
        }

        onSave(formData);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add New Category">
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <Input
                    label="Product Name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    error={errors.name}
                    placeholder="Enter product name"
                    required
                />

                <Input
                    label="Description"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    error={errors.description}
                    placeholder="Enter description"
                    required
                />

                <Input
                    label="Price"
                    name="price"
                    type="number"
                    value={values.price}
                    onChange={handleChange}
                    error={errors.price}
                    placeholder="Enter price"
                    required
                    min="0"
                />

                <Select
                    label="Category"
                    name="category"
                    value={values.category}
                    onChange={handleChange}
                    options={categories.map(c => ({ id: c._id, name: c.name }))}
                    error={errors.category}
                    required
                />

                <Input
                    label="Stock"
                    name="stock"
                    type="number"
                    value={values.stock}
                    onChange={handleChange}
                    error={errors.stock}
                    placeholder="Enter stock"
                    required
                    min="0"
                />

                <ImageUpload
                    label="Product Image"
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
    )
}

export default ProductModal