import * as request from '~/utils/request';

// Hàm gọi API banner sử dụng axios
export const bannerApi = async (query) => {
    try {
        const res = await request.get('', {
            params: {
                query,
            },
        });
        return res;
    } catch (error) {
        console.log('Error when fetching API:', error);
        throw error;
    }
};

// Hàm gọi API lấy danh sách sản phẩm
export const getProductList = async () => {
    try {
        const productList = await request.get('/product-list');
        return productList;
    } catch (error) {
        console.log('Error when fetching productList API:', error);
        throw error;
    }
};

// Hàm gọi API Chi tiết sản phẩm

export const getProductDetail = async (id) => {
    try {
        const productDetail = await request.get(`/product-detail?id=${id}`);
        // console.log('ProductDetail', productDetail);
        return productDetail;
    } catch (error) {
        console.log('Error when fetching productDetail API:', error);
        throw error;
    }
};

// Hàm tìm kiếm sản phẩm
export const searchProduct = async (pro_name) => {
    try {
        const response = await request.get(`/search?name=${pro_name}`);
        console.log('tim kiem san pham', response);
        return response;
    } catch (error) {
        console.log('Error when searching product', error);
        throw error;
    }
};

// Hàm lấy ra danh sách tài khoản để kiểm tra đăng nhập đăng ký
export const getAccountList = async (userName, password) => {
    try {
        const accountList = await request.get('/login');
        // console.log('lay thanh cong danh sach account', accountList);
        return accountList;
    } catch (error) {}
};

// Hàm login
export const login = async (acc_email, acc_pass) => {
    try {
        const loginData = {
            acc_email,
            acc_pass,
        };
        // Thực hiện yêu cầu POST đến máy chủ để kiểm tra đăng nhập
        const response = await request.post('/login/info', loginData);
        return response;
    } catch (error) {
        console.error('Lỗi khi gửi yêu cầu đăng nhập:', error);
        throw error;
    }
};

// Hàm Register

export const register = async (acc_email, acc_pass, acc_name) => {
    try {
        const registerData = {
            acc_email,
            acc_pass,
            acc_name,
        };
        // thực hiện yêu cầu post đến máy chủ để kiểm tra đăng ký
        const response = await request.post('/login/create', registerData);
        if (response.exist) {
            console.log(response.error);
        } else if (response.passInvalid) {
            console.log(response.error);
        } else if (response.canCreate) {
            console.log(response.message);
        }
        return response;
    } catch (error) {
        console.log('Lỗi đăng ký', error);
    }
};
