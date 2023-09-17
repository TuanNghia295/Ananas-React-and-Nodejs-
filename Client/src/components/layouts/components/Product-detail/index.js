import classNames from 'classnames/bind';
import style from './productDetails.module.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as homeService from '~/apiServices/homeService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AiOutlineHeart } from 'react-icons/ai';
import { faHeart, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { icon } from '@fortawesome/fontawesome-svg-core';
import Button from '~/components/Button';
import routes from '~/config/routes';

const cx = classNames.bind(style);
function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState({});

    // get API by id
    useEffect(() => {
        const proInfo = async () => {
            const result = await homeService.getProductDetail(id);
            setProduct(result);
        };
        proInfo();
    }, [id]);
    const imageList = [product.image1, product.image2, product.image3, product.image4];

    // create a boolean element to indicate icons changed
    const [iconChange, setIconChange] = useState(false);
    const handleChangeIcon = () => {
        const proInfo = JSON.parse(localStorage.getItem('favorites'));
        const updatedFavorites = { ...proInfo };
        var key = id;
        setIconChange(!iconChange);
        if (iconChange) {
            delete updatedFavorites[key];
            console.log(updatedFavorites);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            setIconChange(!iconChange);
        }
    };

    //get ID of product
    useEffect(() => {
        // create a variable containing product
        const proInfo = JSON.parse(localStorage.getItem('favorites'));
        const updatedFavorites = { ...proInfo };
        var key = id;
        if (iconChange === true) {
            updatedFavorites[key] = product;
        }
        if (updatedFavorites.hasOwnProperty(key)) {
            setIconChange(true);
        }
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }, [iconChange]);

    // Quantity Buttons
    const [quantity, setQuantity] = useState(0);

    return (
        <div className={cx('container')}>
            <div className={cx('pro-name')}>
                <p>{product.pro_name}</p>
            </div>
            <div className={cx('pro-content')}>
                <aside className={cx('pro-image')}>
                    <section className={cx('pro-items-slide')}>
                        <ul className={cx('pro-items-list')}>
                            <div className={cx('active-image')}>
                                <img src={product.image1} alt={product.image1} />
                            </div>
                            {imageList.map((image, index) => {
                                return (
                                    <li className={cx('image-items')} key={index}>
                                        {image && <img src={image} alt={image}></img>}
                                    </li>
                                );
                            })}
                        </ul>
                    </section>
                </aside>
                <section className={cx('pro-info')}>
                    <div className={cx('pro-header-info')}>
                        <h2 className={cx('pro-name-color')}>
                            {product.pro_name}-{product.color}
                        </h2>
                        <div className={cx('pro-code-and-condition')}>
                            <p className={cx('pro-code')}>
                                Mã sản phẩm: <strong>{product.pro_code}</strong>
                            </p>
                            <p className={cx('pro-condition')}>
                                Tình trạng: <strong> {product.pro_type} </strong>
                            </p>
                        </div>
                        <div className={cx('price')}>{product.price}</div>
                        <div className={cx('color-container')}>
                            <h1>color here</h1>
                        </div>
                        <div className={cx('options')}>
                            <div className={cx('size')}>
                                <h2>Select Size</h2>
                                <ul className={cx('sizeList')}>
                                    <li className={cx('size-items')}>
                                        <Button outline disabled>
                                            22
                                        </Button>
                                    </li>

                                    <li className={cx('size-items')}>
                                        <Button outline>22</Button>
                                    </li>
                                    <li className={cx('size-items')}>
                                        <Button outline>22</Button>
                                    </li>
                                    <li className={cx('size-items')}>
                                        <Button outline>22</Button>
                                    </li>
                                    <li className={cx('size-items')}>
                                        <Button outline>22</Button>
                                    </li>
                                    <li className={cx('size-items')}>
                                        <Button outline>22</Button>
                                    </li>
                                    <li className={cx('size-items')}>
                                        <Button outline>22</Button>
                                    </li>
                                    <li className={cx('size-items')}>
                                        <Button outline>22</Button>
                                    </li>
                                    <li className={cx('size-items')}>
                                        <Button outline>22</Button>
                                    </li>
                                    <li className={cx('size-items')}>
                                        <Button outline>22</Button>
                                    </li>
                                    <li className={cx('size-items')}>
                                        <Button outline>22</Button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className={cx('add-to-cart')} type="submit">
                            <Button className={cx('cart-title')}>
                                <h1>Add to Bag</h1>
                            </Button>
                            <span
                                className={cx('heart-icon')}
                                onClick={() => handleChangeIcon(id, product)}
                            >
                                {iconChange ? (
                                    <FontAwesomeIcon icon={faHeart} />
                                ) : (
                                    <AiOutlineHeart />
                                )}
                            </span>
                        </div>
                        <Button className={cx('payment')} type="submit">
                            <h1>payment</h1>
                        </Button>
                        <span className={cx('warning')}>Vui lòng chọn Size/Số lượng phù hợp</span>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default ProductDetails;
