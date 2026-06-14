import { useState } from "react";
import { useCategory } from "../../context/CategoryContext";
import { createCategory, deleteCategory, updateCategory } from "../../services/categoryService";

import DataTable from "../../components/admin/DataTable";
import Button from "../../components/common/Button";
import CategoryModal from "../../components/admin/CategoryModal";

const ManageCategories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const { fetchCategories, categories, loading, setLoading } = useCategory();

  const columns = [
    { header: 'ID', accessor: '_id' },
    { header: 'Image', accessor: 'image' },
    { header: 'Category Name', accessor: 'name' }
  ];

  const handleEdit = (slug) => {
    const categoryToEdit = categories.find((cat) => cat.slug === slug);

    if (categoryToEdit) {
      console.log("Found category:", categoryToEdit);
      setEditingCategory(categoryToEdit);
      setIsModalOpen(true);
    } else {
      console.error("Category not found with slug:", slug);
    }
  };

  const handleSave = async (data) => {
    setLoading(true);
    try {
      if (editingCategory) {
        const response = await updateCategory(editingCategory.slug, data);
        if (response?.success) {
          setIsModalOpen(false);
          alert("Category updated successfully!");
          await fetchCategories();
        }
      } else {

        const response = await createCategory(data);
        if (response?.success) {
          setIsModalOpen(false);
          alert("Category created successfully!");
          await fetchCategories();
        }
      }
    } catch (err) {
      const errorMessage = err?.message || "Failed to create category. Please try again.";
      console.error("Error creating category:", err);
      alert(errorMessage);
    } finally {
      setLoading(false);
      setEditingCategory(null);
    }
  };


  const handleDelete = async (slug) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(slug);
        alert("Category deleted successfully!");
        await fetchCategories();
      } catch (err) {
        alert(err?.message || "Failed to delete category.");
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold mb-6">Manage Categories</h2>
        <Button
          className="!w-auto px-4 py-1.5 text-sm bg-indigo-600 hover:bg-indigo-700 whitespace-nowrap"
          onClick={() => setIsModalOpen(true)}
        >
          + Add Category
        </Button>
      </div>

      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingCategory(null); }}
        onSave={handleSave}
        loading={loading}
        initialData={editingCategory}
      />

      <DataTable
        columns={columns}
        data={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default ManageCategories;