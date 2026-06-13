import { useState } from "react";
import { useCategory } from "../../context/CategoryContext";
import { createCategory } from "../../services/categoryService";

import DataTable from "../../components/admin/DataTable";
import Button from "../../components/common/Button";
import CategoryModal from "../../components/admin/CategoryModal";

const ManageCategories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { fetchCategories, categories, loading, setLoading } = useCategory();
  console.log("Categories data:", categories);

  const columns = [
    { header: 'ID', accessor: '_id' },
    { header: 'Image', accessor: 'image' },
    { header: 'Category Name', accessor: 'name' }
  ];

  const handleSave = async (data) => {
    setLoading(true);
    try {
      const response = await createCategory(data);

      if (response?.success) {
        setIsModalOpen(false);
        alert("Category created successfully!");
        await fetchCategories();
      } else {
        alert(response?.message || "Failed to create category.");
      }

    } catch (err) {
      const errorMessage = err?.message || "Failed to create category. Please try again.";
      console.error("Error creating category:", err);
      alert(errorMessage);
    } finally {
      setLoading(false);
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
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        loading={loading}
      />

      <DataTable
        columns={columns}
        data={categories}
        onEdit={(slug) => console.log("Editing", slug)}
        onDelete={(slug) => console.log("Deleting", slug)}
      />
    </div>
  )
}

export default ManageCategories;