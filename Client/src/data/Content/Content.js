import { Link } from 'react-router-dom';
import routes from '~/config/routes';

const bannerData = [
    {
        id: 0,
        img: 'https://ananas.vn/wp-content/uploads/LowHigh_Desktop-1920x1050.jpg',
        alt: 'banner1',
    },
    {
        id: 1,
        img: 'https://staging.ananas.vn/wp-content/uploads/desktop_home1.jpg',
        alt: 'banner2',
    },
    {
        id: 2,
        img: 'https://bloganchoi.com/wp-content/uploads/2020/09/banner-chinh-2m.jpg',
        alt: 'banner3',
    },
];

const collection = [
    {
        id: 1,
        img: 'https://ananas.vn/wp-content/uploads/banner-phu%CC%A3_2m-600x320.jpg',
        title: ` All black in black`,
        description:
            'Mặc dù được ứng dụng rất nhiều, nhưng sắc đen lúc nào cũng toát lên một vẻ huyền bí không nhàm chán',
        link: `${routes.productList}?gender=&category=&attribute=black`,
    },
    {
        id: 2,
        img: 'https://ananas.vn/wp-content/uploads/Banner_Sale-off-1.jpg',
        title: `Outlet sale`,
        description:
            'Danh mục những  sản phẩm bán tại "giá tốt hơn" chỉ được bán kênh online - Online Only, chúng đã từng làm mưa làm gió một thời gian và hiện đang rơi vào tình trạng bể size, bể số.',
        link: `${routes.promotion}`,
    },
];

const shoppingList = [
    {
        id: 1,
        title: <Link to={`${routes.productList}?gender=men`}>giày nam</Link>,
        bgImg: 'https://ananas.vn/wp-content/uploads/catalogy-1.jpg',
        listItems: [
            {
                id: 1,
                listTitle: (
                    <Link
                        to={`${routes.productList}/?gender=men&category=shoes&attribute=new-arrival`}
                    >
                        New arrivals
                    </Link>
                ),
            },
            {
                id: 2,
                listTitle: (
                    <Link
                        to={`${routes.productList}/?gender=men&category=shoes&attribute=best-seller`}
                    >
                        best seller
                    </Link>
                ),
            },
            {
                id: 3,
                listTitle: (
                    <Link
                        to={`${routes.productList}/?gender=men&category=shoes&attribute=sale-off`}
                    >
                        slae-off
                    </Link>
                ),
            },
        ],
    },
    {
        id: 2,
        title: <Link to={`${routes.productList}/?gender=women`}>giày nữ</Link>,
        bgImg: 'https://ananas.vn/wp-content/uploads/catalogy-2.jpg',
        listItems: [
            {
                listTitle: (
                    <Link
                        to={`${routes.productList}/?gender=women&category=shoes&attribute=new-arrival`}
                    >
                        New arrivals
                    </Link>
                ),
            },
            {
                listTitle: (
                    <Link
                        to={`${routes.productList}/?gender=women&category=shoes&attribute=best-seller`}
                    >
                        best seller
                    </Link>
                ),
            },
            {
                listTitle: (
                    <Link
                        to={`${routes.productList}/?gender=women&category=shoes&attribute=sale-off`}
                    >
                        slae-off
                    </Link>
                ),
            },
        ],
    },
    {
        id: 3,
        title: <Link to={routes.home}>Dòng sản phẩm</Link>,
        bgImg: 'https://ananas.vn/wp-content/uploads/catalogy-3.jpg',
        listItems: [
            {
                listTitle: (
                    <Link to={`${routes.productList}/?gender=&category=&attribute=basas`}>
                        basas
                    </Link>
                ),
            },
            {
                listTitle: (
                    <Link to={`${routes.productList}/?gender=&category=&attribute=vintas`}>
                        vintas
                    </Link>
                ),
            },
            {
                listTitle: (
                    <Link to={`${routes.productList}/?gender=&category=&attribute=urbas`}>
                        urbas
                    </Link>
                ),
            },
            {
                listTitle: (
                    <Link to={`${routes.productList}/?gender=&category=&attribute=pattas`}>
                        pattas
                    </Link>
                ),
            },
        ],
    },
];

export { bannerData, collection, shoppingList };
