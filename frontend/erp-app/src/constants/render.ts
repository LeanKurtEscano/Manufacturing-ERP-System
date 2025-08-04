import {  faCheckCircle, faHourglassHalf, faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";
import type { Category,Material,Product } from "./interfaces/manageProducts";
import { 
    faUserGear, 
    faUsers, 
    faCreditCard, 
    faMoneyCheckDollar, 
    faIdCard,
    faCar,
    faCarOn,
    faChartBar, 
    faFileInvoiceDollar, 
    faBoxOpen,
    faSignOutAlt 
} from "@fortawesome/free-solid-svg-icons";

export const menuItems = [
    { icon: faUserGear, text: "Manage Users", url: "/dashboard/manage-users" },
    { icon: faBoxOpen, text: "Manage Products", url: "/dashboard/manage-products" },
    { icon: faIdCard, text: "User Verification", url: "/dashboard/user-verification" },
    { icon: faMoneyCheckDollar, text: "Loan Applications", url: "/dashboard/loan-applications" },
    { icon: faCreditCard, text: "Manage Payments", url: "/dashboard/manage-payments" },
    { icon: faCar, text: "Rental Applications", url: "/dashboard/rental-applications" },
    { icon: faCarOn, text: "Manage Rentals", url: "/dashboard/manage-rentals" },
    { icon: faSignOutAlt, text: "Logout" }
];


export const mockCategories: Category[] = [
  { id: '1', name: 'Electronics', description: 'Electronic components and devices' },
  { id: '2', name: 'Mechanical Parts', description: 'Mechanical components and hardware' },
  { id: '3', name: 'Raw Materials', description: 'Base materials and supplies' },
];

export const mockMaterials = [
  {
    id: '1',
    name: 'Steel Rod',
    sku: 'STL-001',
    category: 'Raw Materials',
  costPerUnit: 15.50,
      unit: 'kg',
    supplier: 'MetalCorp Inc.',
    description: 'High-grade steel rod for structural components',
    createdAt: '2024-01-10'
  },
  {
    id: '2',
    name: 'Copper Wire',
    sku: 'COP-002',
    category: 'Electronics',
     costPerUnit: 8.75,
    unit: 'meter',
    supplier: 'ElectroSupply Co.',
    description: '16 AWG copper wire for electrical connections',
    createdAt: '2024-01-12'
  },
  {
    id: '3',
    name: 'Plastic Housing',
    sku: 'PLS-003',
    category: 'Components',
    costPerUnit: 12.30,
    unit: 'piece',
    supplier: 'PlasticWorks Ltd.',
    description: 'Injection molded ABS plastic housing',
    createdAt: '2024-01-15'
  }
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Motor Assembly',
    sku: 'MOT-001',
    categoryId: '1',
    description: 'High-performance electric motor',
    bom: [
      { materialId: '2', quantity: 2 },
      { materialId: '3', quantity: 5 },
    
    ],
    totalCost: 35.50,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Frame Unit',
    sku: 'FRM-002',
    categoryId: '2',
    description: 'Structural frame component',
    bom: [
      { materialId: '1', quantity: 10 },
     
    ],
    totalCost: 26.20,
    createdAt: '2024-01-20',
  }
];
