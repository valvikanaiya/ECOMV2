const baseUrl = import.meta.env.VITE_BASE_API_URL;

export const api = {
  products: `${baseUrl}/products`,
  getCategory: `${baseUrl}/products/categories`,
  getCartsItem: `${baseUrl}/carts`,
  getUser: `${baseUrl}/users`,
  addProduct: `${baseUrl}/products`,
  login: `${baseUrl}/auth/login`,
};
