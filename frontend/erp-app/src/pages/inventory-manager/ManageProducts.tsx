import React, { useState,useEffect } from 'react';
import type { Material, BOMItem, Product, Category } from '../../constants/interfaces/manageProducts';
// Types
import { useProductContext } from '../../contexts/ProductContext';
import { mockProducts, mockCategories, mockMaterials } from '../../constants/render';
import Products from '../../components/manage-products/Products';
// Mock data
import Categories from '../../components/manage-products/Categories';
import ProductModal from '../../components/Modal/ProductModal';
import Materials from '../../components/manage-products/Materials';
import { productApi } from '../../config/apiConfig';
import { useQuery } from '@tanstack/react-query';
const ManageProducts: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'materials'>('products');
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const { materials, setMaterials } = useProductContext();
  // Product form state
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    sku: '',
    categoryId: '',
    description: '',
    bom: [] as BOMItem[],
  });

  const { data, isLoading:materialsLoading, isError:materialsError } = useQuery({
    queryKey: ['materials'],
    queryFn: async () => {
      const res = await productApi.get('/materials');
      return res.data;
    }
  });
  
  useEffect(() => {
    if (data) {
      setMaterials(data);
    }
  }, [data]);
  
  


const { data: categoriesData, isError, isLoading } = useQuery({
  queryKey: ['categories'],
  queryFn: () => productApi.get('/categories'),
});

console.log('Categories Data:', categoriesData?.data);


  // Category form state
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: '',
  });

  // BOM management


  const resetCategoryForm = () => {
    setCategoryForm({
      name: '',
      description: '',
    });
  };


  const handleAddCategory = () => {
    setShowCategoryModal(true);
    resetCategoryForm();
  };

  const handleSaveCategory = async () => {
    try {
      const response = await productApi.post('/category', categoryForm);
      if (response.status === 200) {
       
      }
    } catch (error) {
      console.error('Error saving category:', error);
    } finally {
      setShowCategoryModal(false);
      resetCategoryForm();

    }

  };






  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Manage Products</h1>
          <p className="text-slate-400">Manage products, categories, and bill of materials</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'products'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'categories'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
          >
            Categories
          </button>
          <button
            onClick={() => setActiveTab('materials')}
            className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'materials'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
          >
            Materials
          </button>

        </div>



        {/* Products Tab */}
        {activeTab === 'products' && (

          <>
            <Products setShowProductModal={setShowProductModal} products={products} />
          </>
        )}

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <Categories
            handleAddCategory={handleAddCategory}
            categories={categoriesData?.data || []}
          />
        )}

        {activeTab === 'materials' && (
          <Materials categories={categoriesData?.data || []} />
        )}

        {/* Product Modal */}
        {showProductModal && (
          <ProductModal
            setShowProductModal={setShowProductModal}
            editingProduct={editingProduct}
            categories={categoriesData?.data || []}
          />
        )}

        {/* Category Modal */}
        {showCategoryModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 rounded-lg w-full max-w-md">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Add New Category</h2>
                  <button
                    onClick={() => setShowCategoryModal(false)}
                    className="text-slate-400 hover:text-white text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Category Name</label>
                    <input
                      type="text"
                      value={categoryForm.name}
                      onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                      className="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                      placeholder="Enter category name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                      value={categoryForm.description}
                      onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                      className="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg text-white h-20"
                      placeholder="Enter category description"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <button
                    onClick={() => setShowCategoryModal(false)}
                    className="px-4 py-2 text-slate-300 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveCategory}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add Category
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProducts;