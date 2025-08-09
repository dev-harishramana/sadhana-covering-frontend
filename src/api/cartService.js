// src/api/cartService.js
import API from './index';

// All requests will automatically have the base URL and token attached

export const fetchCart = () => API.get('/cart');
export const addToCart = (productId, quantity) => API.post('/cart/add', { productId, quantity });
export const updateCartItem = (productId, quantity) => API.put('/cart/update', { productId, quantity });
export const removeFromCart = (productId) => API.delete(`/cart/remove/${productId}`);
export const clearCart = () => API.delete('/cart/clear');