import axios from "axios";

export const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

export const handleRequest = async <T>(
  requestFn: () => Promise<T>
): Promise<T> => {
  try {
    return await requestFn();
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const errorMessage = e.response?.data?.message || "An error occurred.";
      const errorStatus = e.response?.status || 500;

      console.error(
        `Request failed with status ${errorStatus}: ${errorMessage}`
      );

      throw e;
    }

    throw e;
  }
};
