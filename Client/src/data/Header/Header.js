import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxArchive, faCartShopping, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faUser } from '@fortawesome/free-regular-svg-icons';
import routes from '~/config/routes';
import { Link } from 'react-router-dom';

const headerData = [
    {
        id: 1,
        icon: <FontAwesomeIcon icon={faBoxArchive} />,
        title: 'Tra cứu đơn hàng',
        link: routes.oderSearch,
    },
    {
        id: 2,
        icon: <FontAwesomeIcon icon={faHeart} />,
        title: 'Yêu thích',
        link: routes.love,
    },
    {
        id: 3,
        icon: <FontAwesomeIcon icon={faCartShopping} />,
        title: 'Giỏ Hàng',
        link: routes.cart,
    },
    {
        id: 4,
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'Đăng nhập',
        link: routes.login,
    },
];

const navData = [
    {
        title: <Link to={routes.productList}>sản phẩm</Link>,
        icon: <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>,
        list: [
            {
                link: `${routes.productList}?gender=men`,
                listTitle: 'cho nam',
                img: 'https://ananas.vn/wp-content/uploads/Menu_Nam.jpg',
            },
            {
                link: `${routes.productList}?gender=woman`,
                listTitle: 'cho nữ',
                img: 'https://ananas.vn/wp-content/uploads/Menu_Nu.jpg',
            },
            {
                link: `${routes.promotion}`,
                listTitle: 'outlet',
                img: 'https://ananas.vn/wp-content/uploads/Menu_Sale-off.jpg',
            },
            {
                listTitle: 'thời trang & phụ kiện',
                img: 'https://ananas.vn/wp-content/uploads/Menu_Phu-kien.jpg',
            },
        ],
    },
    {
        title: <Link to={`${routes.productList}/?gender=men`}>nam</Link>,
        icon: <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>,
        list: [
            {
                listTitle: 'Nổi bật',
            },
            {
                listTitle: 'giày',
            },
            {
                listTitle: 'Thời trang & phụ kiện',
            },
        ],
    },
    {
        title: <Link to={`${routes.productList}/?gender=woman`}>nữ</Link>,
        icon: <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>,
    },
    {
        title: <Link to={routes.promotion}>sale off</Link>,
    },
];

const slideBarData = [
    {
        title: <Link to={routes.policy}>HÀNG 2 TUẦN NHẬN ĐỔI - GIÀY NỬA NĂM BẢO HÀNH</Link>,
    },
    {
        title: <Link to={routes.faqs}>BUY 2 GET 10% OFF - ÁP DỤNG VỚI TẤT CẢ BASIC TEE</Link>,
    },
    {
        title: <Link to={routes.faqs}>FREE SHIPPING VỚI HOÁ ĐƠN TỪ 800K ! </Link>,
    },
];

export { headerData, navData, slideBarData };
