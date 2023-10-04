import classNames from 'classnames/bind';
import style from './favourite.module.scss';
import Button from '~/components/Button';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faRecycle, faTrash } from '@fortawesome/free-solid-svg-icons';
import Modal from '~/components/Modals/Modal';

const cx = classNames.bind(style);
function Favourite() {
    // Get value from localStorage
    const favoritesProducts = localStorage.getItem('favorites');
    const favoritesList = favoritesProducts ? JSON.parse(favoritesProducts) : [];
    const itemsLength = Object.keys(favoritesList);

    // Select size
    const [changeSize, setChangeSize] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const handleSelectSize = (product) => {
        setChangeSize(true);
        setSelectedProduct(product);
    };
    return (
        <div className={cx('container')}>
            <header className={cx('content-header')}>
                <div className={cx('content-title')}>
                    <h3>Favourites</h3>
                </div>
                <div className={cx('items-quantity')}>
                    <h5>{itemsLength.length} Items</h5>
                </div>
            </header>

            <section className={cx('content-place')}>
                {Object.values(favoritesList).map((item) => {
                    const { id, pro_name, image1, price, pro_type, color, pro_code, slug } = item;
                    return (
                        <div className={cx(`product-info`)} key={id}>
                            <img className={cx('pro-img')} src={image1} alt={image1}></img>
                            <div className={cx('pro-name-and-price')}>
                                <div className={cx('pro-name')}>
                                    <p>{pro_name}</p>
                                </div>
                                <div className={cx('pro-price')}>
                                    <p>{price}</p>
                                </div>
                                <div className={cx('pro-type')}>
                                    <p>{pro_type}</p>
                                </div>
                                <div className={cx('options')}>
                                    <Button
                                        className={cx('modify')}
                                        outline
                                        small
                                        onClick={() => handleSelectSize(item)}
                                    >
                                        <FontAwesomeIcon icon={faPen} />
                                    </Button>
                                    <Button className={cx('delete')} outline small>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </Button>
                                </div>
                                <Button className={cx('select-btn')} large primary>
                                    Add to Cart
                                </Button>
                            </div>
                        </div>
                    );
                })}
                {changeSize && <Modal closeModal={setChangeSize} onGetInfo={selectedProduct} />}
            </section>
        </div>
    );
}
export default Favourite;
