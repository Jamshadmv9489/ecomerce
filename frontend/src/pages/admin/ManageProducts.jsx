import { useState } from "react";

import { useProducts } from "../../context/ProductContext";
import { createProduct, deleteProduct, updateProduct } from "../../services/productService";

import Button from "../../components/common/Button";
import DataTable from "../../components/admin/DataTable";
import ProductModal from "../../components/admin/ProductModal";

const ManageProducts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const { products, loading, setLoading, fetchProducts } = useProducts();

  const columns = [
    { header: 'ID', accessor: '_id' },
    { header: 'Image', accessor: 'image' },
    { header: 'Name', accessor: 'name' },
    { header: 'Price', accessor: 'price' },
    { header: 'Stock', accessor: 'stock' }
  ];

  const handleEdit = (slug) => {
    const productToEdit = products.find((prod) => prod.slug === slug);

    if (productToEdit) {
      console.log("Found product:", productToEdit);
      setEditingProduct(productToEdit);
      setIsModalOpen(true);
    } else {
      console.error("Product not found with slug:", slug);
    }
  };

  const handleDelete = async (slug) => {
     if (window.confirm("Are you sure you want to delete this Product?")) {
          try {
            await deleteProduct(slug);
            alert("product deleted successfully!");
            await fetchProducts();
          } catch (err) {
            alert(err?.message || "Failed to delete product.");
          }
        }

  };

  const handleSave = async (data) => {
    setLoading(true);
    try {
      if (editingProduct) {
        const response = await updateProduct(editingProduct.slug, data);
        if (response?.success) {
          setIsModalOpen(false);
          alert("Product updated successfully!");
          await fetchProducts();
        }
      } else {

        const response = await createProduct(data);
        if (response?.success) {
          setIsModalOpen(false);
          alert("Product created successfully!");
          await fetchProducts();
        }
      }
    } catch (err) {
      const errorMessage = err?.message || "Failed to create Product. Please try again.";
      console.error("Error creating Product:", err);
      alert(errorMessage);
    } finally {
      setLoading(false);
      setEditingCategory(null);
    }
  };


  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold mb-6">Manage Products</h2>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="!w-auto px-4 py-1.5 text-sm bg-indigo-600 hover:bg-indigo-700 whitespace-nowrap"
        >
          + Add Product
        </Button>
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingProduct(null); }}
        onSave={handleSave}
        loading={loading}
        initialData={editingProduct}
      />

      <DataTable
        columns={columns}
        data={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default ManageProducts;