
import React, { createContext, useContext, useState } from 'react';
import type { BOMItem, Category, Material } from '../constants/interfaces/manageProducts';
import type{ Product } from '../constants/interfaces/manageProducts';
import { mockCategories, mockMaterials } from '../constants/render';
const ProductContext = createContext<any>(null);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const [bomItems, setBomItems] = useState<BOMItem[]>([]);
const [editingProduct, setEditingProduct] = useState<Product | null>(null);
   const [productForm, setProductForm] = useState({
       name: '',
       sku: '',
       categoryId: '',
       description: '',
       bom: [] as BOMItem[],
       totalCost: 0,
     });

     const [categories, setCategories] = useState<Category[]>();
    const [materials, setMaterials] = useState<Material[]>();

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
  return (
    <ProductContext.Provider value={{ bomItems, setBomItems, productForm, setProductForm, editingProduct, setEditingProduct, resetProductForm ,materials,setMaterials, categories, setCategories }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};

export default ProductContext