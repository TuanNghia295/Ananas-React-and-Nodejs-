import axios from 'axios';

// Tạo một thể hiện của Axios với cấu hình cơ bản
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3002/',
});

// Hàm bao bọc để thực hiện các yêu cầu GET đến API
export const get = async (path, options = {}) => {
  try {
    const response = await axiosInstance.get(path, options);
    return response.data;
  } catch (error) {
    console.error('Error when fetching API:', error);
    throw error;
  }
};

// Hàm bao bọc để thực hiện các yêu cầu POST đến API
export const post = async (path, data = {}, options = {}) => {
  try {
    const response = await axiosInstance.post(path, data, options);
    return response.data;
  } catch (error) {
    console.error('Error when fetching API:', error);
    throw error;
  }
};

// Hàm bao bọc để thực hiện các yêu cầu PUT đến API
export const put = async (path, data = {}, options = {}) => {
  try {
    const response = await axiosInstance.put(path, data, options);
    return response.data;
  } catch (error) {
    console.error('Error when fetching API:', error);
    throw error;
  }
};

// Hàm bao bọc để thực hiện các yêu cầu DELETE đến API
export const del = async (path, options = {}) => {
  try {
    const response = await axiosInstance.delete(path, options);
    return response.data;
  } catch (error) {
    console.error('Error when fetching API:', error);
    throw error;
  }
};

// Xuất Axios thể hiện nếu bạn cần sử dụng trực tiếp
export default axiosInstance;
