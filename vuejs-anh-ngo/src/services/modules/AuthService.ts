import { axiosLoginInstance } from '../axios';

/**
 * The above function is an asynchronous function that sends a POST request to a login endpoint with a
 * payload containing a username and password, and returns the response.
 * @param payload - The `payload` parameter is an object that contains two properties:
 * @returns the response from the axiosInstance.post() method.
 */
export const signIn = async (payload: {
  username: string;
  password: string;
}) => {
  try {
    const response = await axiosLoginInstance.post(
      '/auth/login',
      JSON.stringify(payload),
    );
    return response;
  } catch (err) {
    throw new Error('signIn error', { cause: err });
  }
};
