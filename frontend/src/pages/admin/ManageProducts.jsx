
import { useProducts } from "../../context/ProductContext";

import Button from "../../components/common/Button";
import DataTable from "../../components/admin/DataTable";

const ManageProducts = () => {
  const { products } = useProducts();

  const columns = [
    { header: 'ID', accessor: '_id' },
    { header: 'Image', accessor: 'image' },
    { header: 'Name', accessor: 'name' },
    { header: 'Price', accessor: 'price' },
    { header: 'Stock', accessor: 'stock' }
  ];

  const handleEdit = () => {
    console.log("Editing");
  };

  const handleDelete = async () => {
    console.log("Deleting");

  };


  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold mb-6">Manage Products</h2>
        <Button
          className="!w-auto px-4 py-1.5 text-sm bg-indigo-600 hover:bg-indigo-700 whitespace-nowrap"
        >
          + Add Product
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default ManageProducts