import Faqs from '~/pages/Faqs';
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Love from '~/pages/Love';
import OderSeacrh from '~/pages/OrderSearch';
import Policy from '~/pages/Policy';
import ProductDetail from '~/pages/ProductDetail';
import ProductList from '~/pages/ProductList';
import Promotion from '~/pages/Promotion';
import ShoppingCart from '~/pages/ShoppingCart';

const publicRoutes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/login',
        component: Login,
        layout: null,
    },
    {
        path: '/love',
        component: Love,
    },
    {
        path: '/odersearch',
        component: OderSeacrh,
    },
    {
        path: '/cart',
        component: ShoppingCart,
    },
    {
        path: '/product-list',
        component: ProductList,
    },
    {
        path: `/product-detail/:id`,
        component: ProductDetail,
    },
    {
        path: '/promotion',
        component: Promotion,
    },
    {
        path: '/policy',
        component: Policy,
    },
    {
        path: '/faqs',
        component: Faqs,
    },
];

const privateRoutes = [{}];

export { publicRoutes, privateRoutes };
