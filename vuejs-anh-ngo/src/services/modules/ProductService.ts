import { axiosInstance } from '../axios';

type FormData = {
  id?: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating?: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail?: string;
  images?: (string | undefined)[];
};

/**
 * The function `getAllProduct` retrieves a list of products based on the provided parameters,
 * including pagination, search, and limit.
 * @param params - The `params` parameter is an object that contains three optional properties:
 * @returns The function `getAllProduct` returns an object with two properties: `data` and `count`. The
 * `data` property contains the response data from the API call, while the `count` property contains
 * the total count of products returned by the API.
 */
export const getAllProduct = async (
  params: {
    _page?: number;
    _limit?: number;
    search?: string;
  } = { _page: 1, _limit: 5, search: '' },
) => {
  try {
    const { _page, _limit, search } = params;
    const response = await axiosInstance.get('/products', {
      params: {
        _page,
        _limit,
        title_like: search ?? null,
      },
    });
    return {
      data: response.data,
      count: Number(response.headers['x-total-count']),
    };
  } catch (err) {
    throw new Error('getAllProduct error', { cause: err });
  }
};

/**
 * The function `getSingleProduct` is an asynchronous function that retrieves a single product by its
 * ID using an axios instance and returns the response data.
 * @param {number} id - The `id` parameter is a number that represents the unique identifier of a
 * product. It is used to fetch the details of a single product from the server.
 * @returns The function `getSingleProduct` is returning an object with a `data` property that contains
 * the response data from the API call.
 */
export const getSingleProduct = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/products/${id}`);
    return {
      data: response.data,
    };
  } catch (err) {
    throw new Error('getSingleProduct error', { cause: err });
  }
};

/**
 * The function creates a product by sending a POST request to the server with the provided data.
 * @param {FormData} data - The `data` parameter is of type `FormData`. It is an object that represents
 * a set of key/value pairs that can be sent to the server with an HTTP request. In this case, it is
 * used to send data for creating a new product.
 * @returns The function `createProduct` is returning an object with a `data` property that contains
 * the response data from the API call.
 */
export const createProduct = async (data: FormData) => {
  try {
    const response = await axiosInstance.post('/products/', data);
    return {
      data: response.data,
    };
  } catch (err) {
    throw new Error('createProduct error', { cause: err });
  }
};

/**
 * The function `updateProduct` is an asynchronous function that updates a product using a PATCH
 * request and returns the updated data.
 * @param {FormData} data - The `data` parameter is of type `FormData`, which is a built-in JavaScript
 * object used to represent form data when submitting it to a server. It is commonly used when working
 * with file uploads or when sending complex data structures that cannot be easily represented as JSON.
 * In this case, it is being
 * @returns The function `updateProduct` is returning an object with a `data` property that contains
 * the response data from the API call.
 */
export const updateProduct = async (data: FormData) => {
  try {
    const response = await axiosInstance.patch(`/products/${data.id}`, data);
    return {
      data: response.data,
    };
  } catch (err) {
    throw new Error('updateProduct error', { cause: err });
  }
};

/**
 * The function `deleteProduct` is an asynchronous function that sends a DELETE request to the
 * `/products/{id}` endpoint and returns the response data.
 * @param {number} id - The `id` parameter is the unique identifier of the product that you want to
 * delete.
 * @returns The deleteProduct function is returning an object with a "data" property, which contains
 * the response data from the axios delete request.
 */
export const deleteProduct = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/products/${id}`);
    return {
      data: response.data,
    };
  } catch (err) {
    throw new Error('deleteProduct error', { cause: err });
  }
};
