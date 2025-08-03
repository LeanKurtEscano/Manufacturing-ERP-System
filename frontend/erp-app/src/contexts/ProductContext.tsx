
import React, { createContext, useContext, useState } from 'react';
import type { BOMItem } from '../constants/interfaces/manageProducts';
import type{ Product } from '../constants/interfaces/manageProducts';
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
     });
   
  return (
    <ProductContext.Provider value={{ bomItems, setBomItems, productForm, setProductForm, editingProduct, setEditingProduct }}>
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