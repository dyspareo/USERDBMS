import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3008', // ✅ Change to your backend port
});

export const getUsers = () => api.get('/users');
export const createUser = (data) => api.post('/users', data);
export const deleteUser = (id) => api.delete(`/users/${id}`);
export const updateUser = (id, data) => api.put(`/users/${id}`, data);

export default api;
