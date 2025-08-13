import React from 'react'
import { useState, useEffect } from 'react';
import { useProductContext } from '../../contexts/ProductContext';
import type { Category } from '../../constants/interfaces/manageProducts';
import type { Product } from '../../constants/interfaces/manageProducts';
import { productApi } from '../../config/apiConfig';

// Uncomment these imports when you want to use useQuery
// import { useQuery } from '@tanstack/react-query';
// import { useQueryClient } from '@tanstack/react-query';

interface ProductEditModalProps {
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  productId: string; // The ID of the product to edit
  categories: Category[];
}

const ProductEditModal: React.FC<ProductEditModalProps> = ({ 
  setShowEditModal, 
  productId, 
  categories 
}) => {
  const [selectedMaterial, setSelectedMaterial] = useState<number | ''>('');
  const [materialQuantity, setMaterialQuantity] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    setProductForm,
    productForm,
    setBomItems,
    setProducts,
    products,
    resetProductForm,
    bomItems,
    materials
  } = useProductContext();

  // Uncomment and modify this useQuery when you're ready to use it
  /*
  const queryClient = useQueryClient();
  
  const { 
    data: productData, 
    isLoading: queryLoading, 
    error: queryError,
    refetch 
  } = useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      const response = await productApi.get(`/products/${productId}`);
      return response.data;
    },
    enabled: !!productId, // Only run query if productId exists
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    cacheTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
    retry: 2, // Retry failed requests 2 times
    onSuccess: (data) => {
      // Populate form with fetched data
      setProductForm({
        name: data.name || '',
        sku: data.sku || '',
        categoryId: data.categoryId || '',
        description: data.description || '',
        bom: data.bom || [],
        totalCost: data.totalCost || 0
      });
      setBomItems(data.bom || []);
      setIsLoading(false);
    },
    onError: (error) => {
      console.error('Error fetching product:', error);
      setError('Failed to load product data');
      setIsLoading(false);
    }
  });
  */

  // Manual fetch function (remove this when using useQuery)
  const fetchProductData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await productApi.get(`/products/${productId}`);
      const productData = response.data;
      
      // Populate form with fetched data
      setProductForm({
        name: productData.name || '',
        sku: productData.sku || '',
        categoryId: productData.categoryId || '',
        description: productData.description || '',
        bom: productData.bom || [],
        totalCost: productData.totalCost || 0
      });
      setBomItems(productData.bom || []);
      
    } catch (error) {
      console.error('Error fetching product:', error);
      setError('Failed to load product data');
    } finally {
      setIsLoading(false);
    }
  };

  // Load product data on component mount
  useEffect(() => {
    if (productId) {
      fetchProductData();
    }
    
    // Cleanup function to reset form when modal closes
    return () => {
      resetProductForm();
    };
  }, [productId]);

  const removeBOMItem = (materialId: string) => {
    setBomItems(bomItems.filter(item => item.materialId !== materialId));
  };

  const handleUpdateProduct = async () => {
    const totalCost = productForm.bom.reduce((sum, item) => {
      const material = materials.find(m => m.id === item.materialId);
      return sum + (material?.costPerUnit ?? 0) * item.quantity;
    }, 0);
    
    const updatedProductForm = {
      ...productForm,
      totalCost,
      bom: bomItems
    };

    try {
      setIsLoading(true);
      
      const response = await productApi.put(`/products/${productId}`, updatedProductForm);

      if (response.status === 200) {
        // Update the products in context
        setProducts(products.map(p => 
          p.id === productId 
            ? { ...p, ...updatedProductForm }
            : p
        ));
        
        // Uncomment when using useQuery to invalidate cache
        // queryClient.invalidateQueries(['product', productId]);
        // queryClient.invalidateQueries(['products']); // If you have a products list query
        
        setShowEditModal(false);
        resetProductForm();
      }
    } catch (error) {
      console.error('Error updating product:', error);
      setError('Failed to update product');
    } finally {
      setIsLoading(false);
    }
  };

  const getMaterialName = (materialId: string) => {
    return materials.find(m => m.id === materialId)?.name || 'Unknown';
  };

  const getMaterialUnit = (materialId: string) => {
    return materials.find(m => m.id === materialId)?.unit || '';
  };

  const addBOMItem = () => {
    if (selectedMaterial && materialQuantity) {
      setProductForm(prev => {
        const existingItemIndex = prev.bom.findIndex(
          item => item.materialId === Number(selectedMaterial)
        );

        let updatedBOM = [...prev.bom];
        if (existingItemIndex >= 0) {
          updatedBOM[existingItemIndex].quantity = parseFloat(materialQuantity);
        } else {
          updatedBOM.push({
            materialId: Number(selectedMaterial),
            quantity: parseFloat(materialQuantity),
          });
        }

        return {
          ...prev,
          bom: updatedBOM,
        };
      });

      setSelectedMaterial('');
      setMaterialQuantity('');
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-slate-800 rounded-lg p-8">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            <span className="text-white">Loading product data...</span>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-slate-800 rounded-lg p-8">
          <div className="text-center">
            <div className="text-red-400 mb-4">{error}</div>
            <div className="space-x-2">
              <button
                onClick={fetchProductData}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Retry
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 text-slate-300 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Edit Product</h2>
            <button
              onClick={() => setShowEditModal(false)}
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
                    onChange={(e) => setSelectedMaterial(Number(e.target.value))}
                    className="w-full p-2 bg-slate-600 border border-slate-500 rounded text-white"
                  >
                    <option value="">Select Material</option>
                    {materials?.map((material) => (
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
              onClick={() => setShowEditModal(false)}
              className="px-4 py-2 text-slate-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdateProduct}
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Updating...' : 'Update Product'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductEditModal;