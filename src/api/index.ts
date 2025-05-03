const API_ROOT = 'https://api.yourdomain.com/api';

async function fetchJSON(path: string, opts: RequestInit = {}) {
  const res = await fetch(`${API_ROOT}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...opts.headers },
    ...opts,
  });
  
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface SalesData {
  id: number;
  created_at: string;
  total_price: number;
  product_id: number;
}

export interface Stock {
  id: number;
  quantity: number;
  location?: string;
}

export interface Product {
  id: number;
  name: string;
  sku: string;
  price: number;
  stocks: Stock[];
}

export interface Campaign {
  id: number;
  name: string;
  budget: number;
  products: number[];
  status: 'active' | 'paused' | 'completed';
  start_date: string;
  end_date?: string;
}

export interface BarcodeData {
  product: string;
  code_type: string;
  data: string;
}

export interface BarcodeResponse {
  id: number;
  image: string;
  code: string;
}

export function login(username: string, password: string): Promise<LoginResponse> {
  return fetchJSON('/auth/login/', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
}

export function fetchSales(): Promise<SalesData[]> {
  return fetchJSON('/analytics/sales/');
}

export function fetchProducts(): Promise<Product[]> {
  return fetchJSON('/inventory/products/');
}

export function updateStock(id: number, quantity: number): Promise<Stock> {
  return fetchJSON(`/inventory/stocks/${id}/`, {
    method: 'PUT',
    body: JSON.stringify({ quantity }),
  });
}

export function fetchCampaigns(): Promise<Campaign[]> {
  return fetchJSON('/ads/campaigns/');
}

export function createCampaign(data: Omit<Campaign, 'id'>): Promise<Campaign> {
  return fetchJSON('/ads/campaigns/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function generateBarcode(data: BarcodeData): Promise<BarcodeResponse> {
  return fetchJSON('/barcode/barcodes/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}