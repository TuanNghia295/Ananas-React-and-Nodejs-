import classNames from 'classnames/bind';
import style from './Modal.module.scss';
import Button from '../Button';
import { useState } from 'react';
const cx = classNames.bind(style);
function Modal({ closeModal, children, onGetInfo, submit }) {
    // Close the modal
    const [changeSize, setChangeSize] = useState(false);

    const handleSelectSize = (size) => {
        console.log(size);
        setSelectedSize(size);
    };

    const handleAddToBagClick = () => {
        if (selectedSize) {
            console.log(true);
            setChangeSize(!changeSize);
        } else {
            console.log(false);
        }
    };

    // use selectedProduct to show product information
    const [selectedSize, setSelectedSize] = useState(null);
    const selectedProduct = onGetInfo;
    const { pro_name, pro_type, price, image1, image2, image3 } = selectedProduct;
    return (
        <div
            className={cx('modal-background')}
            onClick={(e) => {
                if (e.target.className === 'Modal_modal-background__8zeZe') {
                    closeModal(false);
                }
            }}
        >
            <div id={cx(`pro-id`)} className={cx(`modal-container`)}>
                <div className={cx('pro-title')}>
                    <Button onClick={() => closeModal(false)}>
                        <h3>X</h3>
                    </Button>
                    {children}
                </div>
                <div className={cx('pro-body')}>
                    <img className={cx('pro-img')} src={image2} alt=""></img>
                    <div className={cx('pro-form-info')}>
                        <div className={cx('pro-form-type')}>
                            <p>{pro_type}</p>
                        </div>
                        <div className={cx('pro-form-name')}>
                            <h1>{pro_name}</h1>
                        </div>
                        <div className={cx('pro-form-price')}>
                            <p>{price}</p>
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
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={cx('pro-footer')}>
                    <Button className={cx('add-btn')} primary large onClick={handleAddToBagClick}>
                        <h5>Add to Bag</h5>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Modal;
