export const API_URL = import.meta.env.VITE_API_URL || '/api';

export const handleResponse = async (response: Response) => {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Something went wrong');
    }
    return response.json();
};
