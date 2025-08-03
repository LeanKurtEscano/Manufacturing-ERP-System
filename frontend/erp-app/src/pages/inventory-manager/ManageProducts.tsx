import React, { useState } from 'react';
import type { Material,BOMItem,Product,Category } from '../../constants/interfaces/manageProducts';
// Types
import { mockProducts,mockCategories,mockMaterials } from '../../constants/render';
// Mock data

const ManageProducts: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'categories'>('products');
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [materials] = useState<Material[]>(mockMaterials);
  
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

  // Category form state
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: '',
  });

  // BOM management
  const [bomItems, setBomItems] = useState<BOMItem[]>([]);
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [materialQuantity, setMaterialQuantity] = useState('');

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

  const resetCategoryForm = () => {
    setCategoryForm({
      name: '',
      description: '',
    });
  };

  const handleAddProduct = () => {
    setShowProductModal(true);
    resetProductForm();
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

  const handleSaveProduct = () => {
    const totalCost = bomItems.reduce((sum, item) => {
      const material = materials.find(m => m.id === item.materialId);
      return sum + (material ? material.costPerUnit * item.quantity : 0);
    }, 0);

    if (editingProduct) {
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? { ...p, ...productForm, bom: bomItems, totalCost }
          : p
      ));
    } else {
      const newProduct: Product = {
        id: Date.now().toString(),
        ...productForm,
        bom: bomItems,
        totalCost,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setProducts([...products, newProduct]);
    }
    
    setShowProductModal(false);
    resetProductForm();
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleAddCategory = () => {
    setShowCategoryModal(true);
    resetCategoryForm();
  };

  const handleSaveCategory = () => {
    const newCategory: Category = {
      id: Date.now().toString(),
      ...categoryForm,
    };
    setCategories([...categories, newCategory]);
    setShowCategoryModal(false);
    resetCategoryForm();
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  const addBOMItem = () => {
    if (selectedMaterial && materialQuantity) {
      const existingItemIndex = bomItems.findIndex(item => item.materialId === selectedMaterial);
      
      if (existingItemIndex >= 0) {
        const updatedItems = [...bomItems];
        updatedItems[existingItemIndex].quantity = parseFloat(materialQuantity);
        setBomItems(updatedItems);
      } else {
        setBomItems([...bomItems, {
          materialId: selectedMaterial,
          quantity: parseFloat(materialQuantity),
        }]);
      }
      
      setSelectedMaterial('');
      setMaterialQuantity('');
    }
  };

  const removeBOMItem = (materialId: string) => {
    setBomItems(bomItems.filter(item => item.materialId !== materialId));
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.name || 'Unknown';
  };

  const getMaterialName = (materialId: string) => {
    return materials.find(m => m.id === materialId)?.name || 'Unknown';
  };

  const getMaterialUnit = (materialId: string) => {
    return materials.find(m => m.id === materialId)?.unit || '';
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
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'products'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'categories'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            Categories
          </button>
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
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
        )}

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Categories</h2>
              <button
                onClick={handleAddCategory}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <span>+</span> Add Category
              </button>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => (
                <div key={category.id} className="bg-slate-800 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{category.name}</h3>
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                  <p className="text-slate-400 text-sm">{category.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Product Modal */}
        {showProductModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">
                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                  </h2>
                  <button
                    onClick={() => setShowProductModal(false)}
                    className="text-slate-400 hover:text-white text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Product Details */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Product Details</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Product Name</label>
                        <input
                          type="text"
                          value={productForm.name}
                          onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                          className="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                          placeholder="Enter product name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">SKU</label>
                        <input
                          type="text"
                          value={productForm.sku}
                          onChange={(e) => setProductForm({...productForm, sku: e.target.value})}
                          className="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                          placeholder="Enter SKU"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Category</label>
                        <select
                          value={productForm.categoryId}
                          onChange={(e) => setProductForm({...productForm, categoryId: e.target.value})}
                          className="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                        >
                          <option value="">Select Category</option>
                          {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                          value={productForm.description}
                          onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                          className="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg text-white h-20"
                          placeholder="Enter product description"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bill of Materials */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Bill of Materials</h3>
                    
                    {/* Add BOM Item */}
                    <div className="mb-4 p-4 bg-slate-700 rounded-lg">
                      <h4 className="font-medium mb-3">Add Material</h4>
                      <div className="space-y-3">
                        <select
                          value={selectedMaterial}
                          onChange={(e) => setSelectedMaterial(e.target.value)}
                          className="w-full p-2 bg-slate-600 border border-slate-500 rounded text-white"
                        >
                          <option value="">Select Material</option>
                          {materials.map((material) => (
                            <option key={material.id} value={material.id}>
                              {material.name} (${material.costPerUnit}/{material.unit})
                            </option>
                          ))}
                        </select>
                        <div className="flex gap-2">
                          <input
                            type="number"
                            value={materialQuantity}
                            onChange={(e) => setMaterialQuantity(e.target.value)}
                            placeholder="Quantity"
                            className="flex-1 p-2 bg-slate-600 border border-slate-500 rounded text-white"
                          />
                          <button
                            onClick={addBOMItem}
                            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* BOM Items List */}
                    <div className="space-y-2">
                      {bomItems.map((item) => {
                        const material = materials.find(m => m.id === item.materialId);
                        const cost = material ? material.costPerUnit * item.quantity : 0;
                        return (
                          <div key={item.materialId} className="flex justify-between items-center p-3 bg-slate-700 rounded">
                            <div>
                              <div className="font-medium">{getMaterialName(item.materialId)}</div>
                              <div className="text-sm text-slate-400">
                                {item.quantity} {getMaterialUnit(item.materialId)} × ${material?.costPerUnit} = ${cost.toFixed(2)}
                              </div>
                            </div>
                            <button
                              onClick={() => removeBOMItem(item.materialId)}
                              className="text-red-400 hover:text-red-300"
                            >
                              Remove
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    {/* Total Cost */}
                    <div className="mt-4 p-3 bg-slate-700 rounded">
                      <div className="font-semibold text-green-400">
                        Total Cost: ${bomItems.reduce((sum, item) => {
                          const material = materials.find(m => m.id === item.materialId);
                          return sum + (material ? material.costPerUnit * item.quantity : 0);
                        }, 0).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="flex justify-end gap-2 mt-6">
                  <button
                    onClick={() => setShowProductModal(false)}
                    className="px-4 py-2 text-slate-300 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveProduct}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {editingProduct ? 'Update' : 'Add'} Product
                  </button>
                </div>
              </div>
            </div>
          </div>
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
                      onChange={(e) => setCategoryForm({...categoryForm, name: e.target.value})}
                      className="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                      placeholder="Enter category name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                      value={categoryForm.description}
                      onChange={(e) => setCategoryForm({...categoryForm, description: e.target.value})}
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