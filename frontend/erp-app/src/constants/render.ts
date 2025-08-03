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

export const mockMaterials: Material[] = [
  { id: '1', name: 'Steel Sheet', unit: 'kg', costPerUnit: 2.50 },
  { id: '2', name: 'Aluminum Rod', unit: 'meter', costPerUnit: 5.75 },
  { id: '3', name: 'Copper Wire', unit: 'meter', costPerUnit: 1.20 },
  { id: '4', name: 'Plastic Resin', unit: 'kg', costPerUnit: 3.80 },
  { id: '5', name: 'Screws M6', unit: 'piece', costPerUnit: 0.15 },
  { id: '6', name: 'Circuit Board', unit: 'piece', costPerUnit: 12.00 },
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
      { materialId: '6', quantity: 1 },
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
      { materialId: '5', quantity: 8 },
    ],
    totalCost: 26.20,
    createdAt: '2024-01-20',
  },
];
