import React, { useEffect, useState } from 'react';
import { mockMaterials } from '../../constants/render';
import type{ Material, MaterialModalProps } from '../../constants/interfaces/manageProducts';
import { productApi } from '../../config/apiConfig'; 
import { useQueryClient } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useProductContext } from '../../contexts/ProductContext';
import type { CategoryProps } from '../../constants/interfaces/manageProducts';
const MaterialModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  editingMaterial, 
  materialForm, 
  setMaterialForm, 
  category
}: MaterialModalProps) => {
  
  const units = ['piece', 'kg', 'gram', 'meter', 'liter', 'box', 'roll'];

  const handleInputChange = (field, value) => {
    setMaterialForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async() => {
    try {

      const response = await productApi.post('/materials', materialForm);
       

      if (response.status === 201) {
        onClose();
      }

    } catch (error) {
      console.error("Error saving material:", error);
    } finally {


    }
  };

  const isFormValid = materialForm.name && 
                     materialForm.sku && 
                     materialForm.category && 
                     materialForm.costPerUnit && 
                     materialForm.unit &&
                     materialForm.supplier &&
                     materialForm.description;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 ">
      <div className="bg-slate-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">
              {editingMaterial ? 'Edit Material' : 'Add New Material'}
            </h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white text-2xl transition-colors duration-200 w-8 h-8 flex items-center justify-center rounded hover:bg-slate-700"
            >
              ×
            </button>
          </div>

          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-white">Material Name*</label>
                <input
                  type="text"
                  value={materialForm.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter material name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 text-white">SKU*</label>
                <input
                  type="text"
                  value={materialForm.sku}
                  onChange={(e) => handleInputChange('sku', e.target.value)}
                  className="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter SKU"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-white">Category*</label>
                <select
                  value={materialForm.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                >
                  <option value="">Select category</option>
                  {category?.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-white">Unit Cost*</label>
                <input
                  type="number"
                  step="0.01"
                  value={materialForm.costPerUnit}
                  onChange={(e) => handleInputChange('costPerUnit', e.target.value)}
                  className="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="0.00"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-white">Unit*</label>
                <select
                  value={materialForm.unit}
                  onChange={(e) => handleInputChange('unit', e.target.value)}
                  className="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                >
                  <option value="">Select unit</option>
                  {units.map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-white">Supplier</label>
                <input
                  type="text"
                  value={materialForm.supplier}
                  onChange={(e) => handleInputChange('supplier', e.target.value)}
                  className="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter supplier name"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-1 text-white">Description</label>
              <textarea
                value={materialForm.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg text-white h-20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Enter material description"
              />
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-slate-300 hover:text-white transition-colors duration-200 rounded hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!isFormValid}
              >
                {editingMaterial ? 'Update Material' : 'Add Material'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const Materials: React.FC<CategoryProps> = ({ categories }) => {

  const [showMaterialModal, setShowMaterialModal] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
  const [materialForm, setMaterialForm] = useState({
    name: '',
    sku: '',
    category: '',
    costPerUnit: '',
    unit: '',
    supplier: '',
    description: ''
  });

  const {materials,setMaterials} = useProductContext();

  const queryClient = useQueryClient();

  


  const resetMaterialForm = () => {
    setMaterialForm({
      name: '',
      sku: '',
      category: '',
      costPerUnit: '',
      unit: '',
      supplier: '',
      description: ''
    });
    setEditingMaterial(null);
  };

  const populateFormForEdit = (material: Material) => {
    setMaterialForm({
      name: material.name,
      sku: material.sku,
      category: material.category,
      costPerUnit: material.costPerUnit.toString(),
      unit: material.unit,
      supplier: material.supplier,
      description: material.description
    });
    setEditingMaterial(material);
  };

  // Modal control functions
  const openAddModal = () => {
    resetMaterialForm();
    setShowMaterialModal(true);
  };

  const openEditModal = (material) => {
    populateFormForEdit(material);
    setShowMaterialModal(true);
  };

  const closeModal = () => {
    setShowMaterialModal(false);
    resetMaterialForm();
  };

  const handleSaveMaterial = async() => {
     try {

      const response = await productApi.post('/materials', materialForm);
       
      if(response.status === 200) {
       queryClient.invalidateQueries({ queryKey: ['materials'] })

      }


     } catch (error) {
      
     } finally {

       closeModal();

     }
    
   
  };

  const handleDeleteMaterial = (materialId) => {
    if (window.confirm('Are you sure you want to delete this material?')) {
      setMaterials(materials.filter(material => material.id !== materialId));
    }
  };

  // No Data Component
  const NoDataState = () => (
    <div className="bg-slate-800 rounded-lg shadow-lg">
      <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
        {/* Icon */}
        <div className="w-24 h-24 bg-slate-700 rounded-full flex items-center justify-center mb-6">
          <svg 
            className="w-12 h-12 text-slate-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 1v6m6-6v6" 
            />
          </svg>
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-semibold text-white mb-2">
          No Materials Found
        </h3>
        
        {/* Description */}
        <p className="text-slate-400 mb-6 max-w-md">
          You haven't added any materials yet. Create your first material to start managing your inventory.
        </p>
        
        {/* Action Button */}
        <button
          onClick={openAddModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors duration-200 font-medium"
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 4v16m8-8H4" 
            />
          </svg>
          Add Your First Material
        </button>
        
        {/* Optional: Additional helpful text */}
        <div className="mt-8 text-sm text-slate-500">
          <p>Materials help you track inventory costs and suppliers</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="p-6">
        {/* Action Bar */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Materials</h2>
          <button
            onClick={openAddModal}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
          >
            <span className="text-xl">+</span>
            Add Material
          </button>
        </div>

        {/* Conditional Rendering: Table or No Data State */}
        {materials?.length === 0 ? (
          <NoDataState />
        ) : (
          /* Materials Table */
          <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700">
                  <tr>
                    <th className="text-left p-4 font-medium">Material</th>
                    <th className="text-left p-4 font-medium">SKU</th>
                    <th className="text-left p-4 font-medium">Category</th>
                    <th className="text-left p-4 font-medium">Unit Cost</th>
                    <th className="text-left p-4 font-medium">Unit</th>
                    <th className="text-left p-4 font-medium">Supplier</th>
                    <th className="text-left p-4 font-medium">Created</th>
                    <th className="text-left p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {materials?.map((material, index) => (
                    <tr key={material.id} className={index % 2 === 0 ? 'bg-slate-800' : 'bg-slate-750'}>
                      <td className="p-4">
                        <div>
                          <div className="font-medium text-white">{material.name}</div>
                          <div className="text-sm text-slate-400">{material.description}</div>
                        </div>
                      </td>
                      <td className="p-4 text-slate-300">{material.sku}</td>
                      <td className="p-4">
                        <span className="bg-slate-600 text-slate-200 whitespace-nowrap px-2 py-1 rounded text-sm">
                          {material.category.name}
                        </span>
                      </td>
                      <td className="p-4 text-green-400 font-medium">${material.costPerUnit.toFixed(2)}</td>
                      <td className="p-4 text-slate-300">{material.unit}</td>
                      <td className="p-4 text-slate-300">{material.supplier}</td>
                      <td className="p-4 text-slate-400">{material.createdAt}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEditModal(material)}
                            className="text-blue-400 hover:text-blue-300 text-sm transition-colors duration-200 px-2 py-1 rounded hover:bg-slate-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteMaterial(material.id)}
                            className="text-red-400 hover:text-red-300 text-sm transition-colors duration-200 px-2 py-1 rounded hover:bg-slate-700"
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

        {/* Material Modal */}
        <MaterialModal
          isOpen={showMaterialModal}
          onClose={closeModal}
          onSave={handleSaveMaterial}
          editingMaterial={editingMaterial}
          materialForm={materialForm}
          setMaterialForm={setMaterialForm}
          category={categories}
        />
      </div>
    </div>
  );
};

export default Materials;