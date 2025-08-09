
export interface BOMItem {
  materialId: string;
  quantity: number;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  categoryId: string;
  description: string;
  bom: BOMItem[];
  totalCost: number;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export type Material = {
  id: string;
  name: string;
  sku: string;
  category: string;
  costPerUnit: number;
  unit: string;
  supplier: string;
  description: string;
  createdAt: string;
};


export interface MaterialModalProps {

    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
    editingMaterial: any;
    materialForm: any;
    setMaterialForm: React.Dispatch<React.SetStateAction<any>>;
    category: Category[];
}


export interface CategoryProps {

  categories: Category[];
}