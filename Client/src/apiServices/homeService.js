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
        const productDetail = await request.get(`/product-detail/${id}`);
        // console.log("ProductDetail", productDetail);
        return productDetail;
    } catch (error) {
        console.log('Error when fetching productList API:', error);
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
