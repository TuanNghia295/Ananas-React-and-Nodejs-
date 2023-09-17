import classNames from 'classnames/bind';
import styles from './productList.module.scss';
import { Link, NavLink } from 'react-router-dom';
import routes from '~/config/routes';
import { useEffect, useState } from 'react';
import { treeData } from '~/data/Content/product';
import * as homeService from '~/apiServices/homeService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AiOutlineHeart } from 'react-icons/ai';
import { faHeart, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
const cx = classNames.bind(styles);
function ProductLists() {
    //[GET] product-list/show
    const [currentList, setCurrentList] = useState(null);
    useEffect(() => {
        const fetchApi = async () => {
            const result = await homeService.getProductList();
            setCurrentList(result);
            return result;
        };
        fetchApi();
    }, []);

    const [active, setActive] = useState(null);
    const handleActive = (index) => {
        setActive(index);
    };

    // Toggle active menu
    const [activeMenu, setActiveMenu] = useState({});
    // Khởi tạo activeMenus với giá trị mặc định là true cho tất cả các khóa
    useEffect(() => {
        const initialActiveMenus = {};
        treeData.forEach((data) => {
            initialActiveMenus[data.id] = true;
        });
        setActiveMenu(initialActiveMenus);
    }, []);

    const handleActiveMenu = (id) => {
        setActiveMenu((preActiveMenu) => {
            return {
                ...preActiveMenu,
                [id]: !preActiveMenu[id], // xét xem nếu giá trị hiện tại của Menu là true thì đảo ngược
            };
        });
    };
    // Get Id product
    const [productIds, setProductIds] = useState({});
    const handleGetIdProduct = (product) => {
        setProductIds((prevIds) => {
            const updatedIds = { ...prevIds };

            // Check if the product is already liked (exists in the productIds object)
            if (updatedIds[product.id]) {
                // If the product is liked, remove it from the favorites (localStorage) and the state
                delete updatedIds[product.id];
                localStorage.setItem('favorites', JSON.stringify(updatedIds));
            } else {
                // If the product is not liked, add it to the favorites (localStorage) and the state
                updatedIds[product.id] = product;
                localStorage.setItem('favorites', JSON.stringify(updatedIds));
            }

            return updatedIds;
        });
    };

    // Favorite list product
    useEffect(() => {
        // Retrieve the liked products from the localStorage and update the state
        const favorites = JSON.parse(localStorage.getItem('favorites'));
        // console.log((favorites));
        if (favorites) {
            setProductIds(favorites);
        }
    }, []);

    return (
        <div className={cx('container')}>
            <aside className={cx('sideBar-container')}>
                <div className={cx('navbar')}>
                    <ul className={cx('navbar-list')}>
                        <li
                            className={cx('navbar-items', {
                                active: active === 0,
                            })}
                            onClick={() => handleActive(0)}
                        >
                            <Link to={routes.productList}>tất cả</Link>
                        </li>
                        <li
                            className={cx('navbar-items', {
                                active: active === 1,
                            })}
                            onClick={() => handleActive(1)}
                        >
                            <Link to={`${routes.productList}?gender=men`}>nam</Link>
                        </li>
                        <li
                            className={cx('navbar-items', {
                                active: active === 2,
                            })}
                            onClick={() => handleActive(2)}
                        >
                            <Link to={`${routes.productList}?gender=women`}>nữ</Link>
                        </li>
                    </ul>
                    <div className={cx('divider')}></div>
                </div>
                <div className={cx('type-items')}>
                    <ul className={cx('type-list')}>
                        <li className={cx('items')}>
                            <Link to={routes.productList}>Accessories | Phụ kiện</Link>
                        </li>
                        <li className={cx('items')}>
                            <Link to={routes.productList}>Footwear | Lên chân</Link>
                        </li>
                        <li className={cx('items')}>
                            <Link to={routes.productList}>Top | Nửa trên</Link>
                        </li>
                    </ul>
                    <div className={cx('divider')}></div>
                </div>
                <div className={cx('tree')}>
                    {treeData.map((data) => {
                        const { id, title, info } = data;
                        return (
                            <ul className={cx('tree-list')} key={id} tabIndex={-1}>
                                <li className={cx('tree-list-items')}>
                                    <button
                                        className={cx(`tree-items-header`)}
                                        onClick={() => handleActiveMenu(id)}
                                    >
                                        <h3 className={cx('title-tree')}>
                                            {title}
                                            <div className={cx('title-icon')}>
                                                {activeMenu[id] ? (
                                                    <FontAwesomeIcon
                                                        icon={faChevronDown}
                                                        className={cx('chevronDown')}
                                                    />
                                                ) : (
                                                    <FontAwesomeIcon
                                                        icon={faChevronUp}
                                                        className={cx('chevronUp')}
                                                    />
                                                )}
                                            </div>
                                        </h3>
                                    </button>
                                    {activeMenu[id] && (
                                        <div
                                            className={cx('tree-items-content', {
                                                visible: activeMenu[id],
                                            })}
                                        >
                                            {info.map((info, id) => {
                                                const { status } = info;
                                                return (
                                                    <ul
                                                        className={cx('tree-items-content-list')}
                                                        key={id}
                                                    >
                                                        <Link to={routes.oderSearch}>
                                                            <li
                                                                className={cx(
                                                                    'tree-items-content-list-items',
                                                                )}
                                                            >
                                                                {status}
                                                            </li>
                                                        </Link>
                                                    </ul>
                                                );
                                            })}
                                        </div>
                                    )}
                                </li>
                            </ul>
                        );
                    })}
                </div>
            </aside>
            <section className={cx('product-section-container')}>
                <div className={cx('banner')}>
                    <img src="https://ananas.vn/wp-content/uploads/desktop_productlist.jpg"></img>
                </div>
                {Array.isArray(currentList) &&
                    currentList.map((item) => {
                        const { id, color, pro_name, price, pro_type, image1, image2 } = item;
                        return (
                            <div className={cx('thumbnail')} key={id}>
                                <div className={cx('pro-link')}>
                                    <div className={cx('image-container')}>
                                        <div className={cx('image-wrapper')}>
                                            <Link to={`${routes.productDetail}/${id}`}>
                                                <img src={image1} className={cx('image1')}></img>
                                                <img src={image2} className={cx('image2')}></img>
                                            </Link>
                                            <button
                                                className={cx('heart-icon')}
                                                onClick={() => {
                                                    handleGetIdProduct(item);
                                                }}
                                            >
                                                <AiOutlineHeart
                                                    className={cx('outline-heart-icon')}
                                                />
                                                {productIds[id] && (
                                                    <FontAwesomeIcon
                                                        icon={faHeart}
                                                        className={cx('solid-heart-icon')}
                                                    />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('buy-and-like')}>
                                    <div className={cx('buy-now')}>
                                        <h2>
                                            <Link to={routes.cart}>Mua Ngay</Link>
                                        </h2>
                                    </div>
                                </div>
                                <div className={cx('pro-list-divider')}></div>
                                <div className={cx('pro-info')}>
                                    <div className={cx('type')}>
                                        <p>{pro_type}</p>
                                    </div>
                                    <h5 className={cx('name')}>
                                        <Link to={`${routes.productDetail}/${id}`}>{pro_name}</Link>
                                    </h5>
                                    <p className={cx('color')}>{color}</p>
                                    <h4 className={cx('price')}>{price}</h4>
                                </div>
                            </div>
                        );
                    })}
            </section>
        </div>
    );
}

export default ProductLists;
