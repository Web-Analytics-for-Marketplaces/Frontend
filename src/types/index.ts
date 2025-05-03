import { ReactNode } from 'react';

export interface ChildrenProps {
  children: ReactNode;
}

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface SalesDataPoint {
  id: number;
  date: string;
  amount: number;
  product_id: number;
}

export interface Product {
  id: number;
  name: string;
  sku: string;
  price: number;
  stock: number;
}

export interface Campaign {
  id: number;
  name: string;
  budget: number;
  products: number[];
  status: 'active' | 'paused' | 'completed';
}