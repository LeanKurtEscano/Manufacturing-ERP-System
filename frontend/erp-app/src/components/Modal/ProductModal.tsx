import React from 'react'
import { useState } from 'react';
import { useProductContext } from '../../contexts/ProductContext';
import type { Category } from '../../constants/interfaces/manageProducts';
import type{ Product } from '../../constants/interfaces/manageProducts';
import { mockMaterials } from '../../constants/render';
import { useQuery } from '@tanstack/react-query';
import { productApi } from '../../config/apiConfig';
import { useQueryClient } from '@tanstack/react-query';
interface ProductModalProps {
  setShowProductModal: React.Dispatch<React.SetStateAction<boolean>>;
  
  categories: Category[];
}

const ProductModal: React.FC<ProductModalProps> = ({ setShowProductModal,  categories }) => {
    const [selectedMaterial, setSelectedMaterial] = useState<number | ''>('');
     
    const queryClient = useQueryClient();
     const [materialQuantity, setMaterialQuantity] = useState('');
    const{setProductForm, productForm, setBomItems,setProducts,products, resetProductForm,bomItems, materials} = useProductContext();
    
    const removeBOMItem = (Id: string) => {
    setProductForm(prevForm => ({
    ...prevForm,
    bom: prevForm.bom.filter(item => item.materialId !== Id)
  }));

  };

  

  
const { data: materialsData, isError: materialsError, isLoading: materialsLoading } = useQuery({
  queryKey: ['materials'],
  queryFn: () => productApi.get('/materials'),
});

  console.log(productForm)


   const handleSaveProduct = async() => {
      const totalCost = productForm.bom.reduce((sum, item) => {
        const material = materials.find(m => m.id === item.materialId);
        return sum + ( material?.costPerUnit ?? 0 ) * item.quantity;
      }, 0);
      
      
      setProductForm(prev => ({ 
        ...prev,
        totalCost
      }));

      try {

        const response = await productApi.post('/products', productForm)

        if(response.status === 201) {
           setShowProductModal(false);
           resetProductForm();
         
        }


      } catch (error) {

        console.log(error)

      }finally {

     

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


  return (
   <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">
                    Add New Product
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
                          onChange={(e) => setSelectedMaterial(Number(e.target.value))}
                          className="w-full p-2 bg-slate-600 border border-slate-500 rounded text-white"
                        >
                          <option value="">Select Material</option>
                          {materialsData?.data?.data.map((material) => (
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
                      {productForm.bom.map((item) => {
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
                              className="text-red-400 cursor-pointer hover:text-red-300"
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
                        Total Cost: ${productForm.bom.reduce((sum, item) => {
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
                    Add Product
                  </button>
                </div>
              </div>
            </div>
          </div>
  )
}

export default ProductModal