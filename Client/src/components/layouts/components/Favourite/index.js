import classNames from 'classnames/bind';
import style from './favourite.module.scss';
import Button from '~/components/Button';
import { useState } from 'react';

const cx = classNames.bind(style);
function Favourite() {
    const [edit, setEdit] = useState(false);
    const handleEditChange = (e) => {
        e.preventDefault();
        setEdit(!edit);
    };

    // Get value from localStorage
    const favoritesProducts = localStorage.getItem('favorites');
    const favoritesList = JSON.parse(favoritesProducts);
    console.log(favoritesList);

    // Select size
    const [selectedSize, setSelectedSize] = useState(null);
    const handeleDefault = (e) => {
        e.preventDefault();
    };

    const handleSelectSize = (size) => {
        console.log(size);
        setSelectedSize(size);
    };

    const handleAddToBagClick = () => {
        if (selectedSize) {
            console.log(true);
        } else {
            console.log(false);
        }
    };

    return (
        <div className={cx('container')}>
            <header className={cx('content-header')}>
                <div className={cx('content-title')}>
                    {edit ? <h3>Manage Your Favourites</h3> : <h3>Favourites</h3>}
                </div>
                <Button className={cx(edit ? 'done-btn' : 'edit-btn')} onClick={handleEditChange}>
                    {edit ? 'Done' : 'Edit'}
                </Button>
            </header>

            <section className={cx('content-place')}>
                {Object.values(favoritesList).map((item) => {
                    const { id, pro_name, image1, price, pro_type, color, pro_code, slug } = item;
                    return (
                        <div className={cx('product-info')} key={id}>
                            <img className={cx('pro-img')} src={image1} alt={image1}></img>
                            <div className={cx('pro-name-and-price')}>
                                <div className={cx('pro-name')}>
                                    <p>{pro_name}</p>
                                </div>
                                <div className={cx('pro-price')}>
                                    <p>{price}</p>
                                </div>
                            </div>
                            <div className={cx('pro-type')}>
                                <p>{pro_type}</p>
                            <Button className={cx('select-btn')}>Select Size</Button>
                            </div>
                        </div>
                    );
                })}
                ,
                {/* <div className={cx('product-info')}>
                    <img
                        className={cx('pro-img')}
                        src="https://secure-images.nike.com/is/image/DotCom/DQ0660_130?align=0,1&cropN=0,0,0,0&resMode=sharp&fmt=jpg&wid=592&bgc=f5f5f5"
                        alt="imgage"
                    ></img>
                    <div className={cx('pro-name-and-price')}>
                        <div className={cx('pro-name')}>
                            <p>Jumpman MVP</p>
                        </div>
                        <div className={cx('pro-price')}>
                            <p>4,849,000</p>
                            <span> đ</span>
                        </div>
                    </div>
                    <div className={cx('pro-type')}>
                        <p>New Arrival</p>
                    </div>
                    <Button className={cx('select-btn')}>Select Size</Button>
                </div>

                <div className={cx('product-info')}>
                    <img
                        className={cx('pro-img')}
                        src="https://secure-images.nike.com/is/image/DotCom/DQ0660_130?align=0,1&cropN=0,0,0,0&resMode=sharp&fmt=jpg&wid=592&bgc=f5f5f5"
                        alt="imgage"
                    ></img>
                    <div className={cx('pro-name-and-price')}>
                        <div className={cx('pro-name')}>
                            <p>Jumpman MVP</p>
                        </div>
                        <div className={cx('pro-price')}>
                            <p>4,849,000</p>
                            <span> đ</span>
                        </div>
                    </div>
                    <div className={cx('pro-type')}>
                        <p>New Arrival</p>
                    </div>
                    <Button className={cx('select-btn')}>Select Size</Button>
                </div> */}
                {/* SELECT SIZE FORM */}
                <form method="post" action="" className={cx('pro-form')} onSubmit={handeleDefault}>
                    <img
                        className={cx('pro-img')}
                        src="https://secure-images.nike.com/is/image/DotCom/DM8968_302?align=0,1&cropN=0,0,0,0&resMode=sharp&fmt=jpg&wid=592&bgc=f5f5f5"
                        alt=""
                    ></img>
                    <div className={cx('pro-form-info')}>
                        <div className={cx('pro-form-type')}>
                            <p>Men's Road Running Shoes</p>
                        </div>
                        <div className={cx('pro-form-name')}>
                            <h1>Nike Zoom Fly 5</h1>
                        </div>
                        <div className={cx('pro-form-price')}>
                            <p>4,699,000₫</p>
                        </div>
                        <div className={cx('select-form-size')}>
                            <div className={cx('select-title')}>
                                <h3>Select Size</h3>
                            </div>
                            <ul className={cx('sizeList')}>
                                <li
                                    className={cx('size-items')}
                                    onClick={() => handleSelectSize('22')}
                                >
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
                            <Button
                                className={cx('add-btn')}
                                primary
                                large
                                onClick={handleAddToBagClick}
                            >
                                <h5>Add to Bag</h5>
                            </Button>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    );
}
export default Favourite;
