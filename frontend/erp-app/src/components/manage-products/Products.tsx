import React from 'react'
import { useProductContext } from '../../contexts/ProductContext';
import type{ Product } from '../../constants/interfaces/manageProducts';
interface ProductsProps {
setShowProductModal: React.Dispatch<React.SetStateAction<boolean>>;

products: Product[];
}
import { mockCategories } from '../../constants/render';

const Products: React.FC<ProductsProps> = ({ setShowProductModal, products }) => {

  const { setEditingProduct, setProductForm,setBomItems } = useProductContext();
   const getCategoryName = (categoryId: string) => {
    return mockCategories.find(c => c.id === categoryId)?.name || 'Unknown';
  };

     const resetProductForm = () => {
    setProductForm({
      name: '',
      sku: '',
      categoryId: '',
      description: '',
      bom: [],
    });
    setBomItems([]);
    setEditingProduct(null);
  };


    const handleAddProduct = () => {
    setShowProductModal(true);
    resetProductForm();
  };

 
  

   const handleDeleteProduct = (id: string) => {
   
  };

  const handleEditProduct = (product: Product) => {
      setEditingProduct(product);
      setProductForm({
        name: product.name,
        sku: product.sku,
        categoryId: product.categoryId,
        description: product.description,
        bom: product.bom,
      });
      setBomItems(product.bom);
      setShowProductModal(true);
    };

  return (
    <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Products</h2>
              <button
                onClick={handleAddProduct}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <span>+</span> Add Product
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-slate-800 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-700">
                    <th className="text-left p-4">Product</th>
                    <th className="text-left p-4">SKU</th>
                    <th className="text-left p-4">Category</th>
                    <th className="text-left p-4">Total Cost</th>
                    <th className="text-left p-4">Created</th>
                    <th className="text-left p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-t border-slate-700">
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-slate-400">{product.description}</div>
                        </div>
                      </td>
                      <td className="p-4 text-slate-300">{product.sku}</td>
                      <td className="p-4">
                        <span className="bg-slate-600 text-slate-200 px-2 py-1 rounded text-sm">
                          {getCategoryName(product.categoryId)}
                        </span>
                      </td>
                      <td className="p-4 text-green-400">${product.totalCost.toFixed(2)}</td>
                      <td className="p-4 text-slate-400">{product.createdAt}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
  )
}

export default Products