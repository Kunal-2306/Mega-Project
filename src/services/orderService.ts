import { API_URL, handleResponse } from './api';
import { CartItem } from '@/contexts/CartContext';

export interface OrderData {
  name: string;
  email?: string;
  phone: string;
  address?: string;
  message?: string;
  payment_method: 'cash_on_delivery' | 'upi';
  items: Array<{
    name: string;
    code: string;
    category: string;
    quantity: number;
    price: number;
    image: string;
  }>;
  total_items: number;
  total_price: number;
}

export const submitOrder = async (data: OrderData) => {
  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return handleResponse(response);
};

export const getOrders = async () => {
  const response = await fetch(`${API_URL}/orders`);
  return handleResponse(response);
};


