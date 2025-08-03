export interface Material {
  id: string;
  name: string;
  unit: string;
  costPerUnit: number;
}

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