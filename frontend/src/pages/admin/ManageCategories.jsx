import { useCategory } from "../../context/CategoryContext";

import DataTable from "../../components/admin/DataTable";
import Button from "../../components/common/Button";

const ManageCategories = () => {
  const { categories, loading } = useCategory();
  console.log("Categories data:", categories);

  const columns = [
    { header: 'ID', accessor: '_id' },
    { header: 'Image', accessor: 'image' },
    { header: 'Category Name', accessor: 'name' }
  ];

  if (loading) return <div>Loading categories...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold mb-6">Manage Categories</h2>
        <Button
          className="!w-auto px-4 py-1.5 text-sm bg-indigo-600 hover:bg-indigo-700 whitespace-nowrap"
          onClick={() => navigate('/admin/categories/add')}
        >
          + Add Category
        </Button>
      </div>
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