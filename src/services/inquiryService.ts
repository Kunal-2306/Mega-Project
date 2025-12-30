import { API_URL, handleResponse } from './api';

export interface InquiryData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export const submitInquiry = async (data: InquiryData) => {
  const response = await fetch(`${API_URL}/inquiries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return handleResponse(response);
};

export const getInquiries = async () => {
  const response = await fetch(`${API_URL}/inquiries`);
  return handleResponse(response);
};
