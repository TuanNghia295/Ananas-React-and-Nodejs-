import classNames from 'classnames/bind';
import styles from './content.module.scss';
import { useEffect, useState } from 'react';
import { bannerData, collection, shoppingList } from '~/data/Content/Content';
import { Link } from 'react-router-dom';

import * as homeService from '~/apiServices/homeService';
import routes from '~/config/routes';
const cx = classNames.bind(styles);
function Content() {
    // Fecth API by axios
    const [currentBanner, setCurrentBanner] = useState(null);
    useEffect(() => {
        const fetchApi = async () => {
            const result = await homeService.bannerApi();
            setCurrentBanner(result);
            return result;
        };
        fetchApi();
    }, []);

    // automatically change the banner
    const [bannerIndex, setBannerIndex] = useState(0);
    const [banner, setBanner] = useState(bannerData);

    useEffect(() => {
        const lastBanner = banner.length - 1;
        if (bannerIndex > lastBanner) {
            setBannerIndex(0);
        }
        if (bannerIndex < 0) {
            setBannerIndex(lastBanner);
        }
    }, [banner, bannerIndex]);

    useEffect(() => {
        const bannerInterval = setInterval(() => {
            setBannerIndex(bannerIndex + 1);
        }, 5000);
        return () => clearInterval(bannerInterval);
    }, [bannerIndex, banner]);

    // Handle việc click và kéo banner
    // START:
    const [startX, setStartX] = useState(0);
    const [translateX, setTranslateX] = useState(0);

    // tạo hàm quản lý sự kiện khi click chuột vào banner
    const handleMouseDown = (e) => {
        setStartX(e.clientX);
        e.preventDefault();
    };

    // tạo hàm quản lý sự khiện khi move chuột trên banner
    const handleMouseMove = (e) => {
        // lấy tọa độ trục X của trỏ chuột
        // trừ đi startX để tính toán khoảng cách của chuột trên trục X
        const transX = e.clientX - startX;
        setTranslateX(-transX);
    };

    // tạo hàm quản lý sự khiện khi thả chuột sau khi nhấn click
    const handleMouseUp = (e) => {
        let finalX = e.clientX - startX;
        finalX = Math.abs(finalX);
        // xét xem sau khi căn bậc hai của khoảng cách từ start x đến finalX có
        // lớn hơn 1 phần tư chiều rộng của màn hình hay không
        console.log('finalx' + finalX);
        if (finalX > window.innerWidth / 4) {
            // nếu nó lơn hơn 0, tức là người dùng đang muốn kéo qua trái
            // nếu < 0, tức là người dùng đang muốn kéo qua phải
            if (finalX > 0) {
                setBannerIndex(bannerIndex - 1);
            } else {
                setBannerIndex(bannerIndex + 1);
            }
            setTranslateX(0);
        } else {
            // Thực hiện chuyển trang tại đây
            window.location.href = routes.productList;
        }
    };

    return (
        <div className={cx('container')}>
            {/* Banner List */}
            <div className={cx('banner-list')}>
                {Array.isArray(currentBanner) &&
                    currentBanner.map((items, id) => {
                        const { banner } = items;
                        let position = 'nextSlide';
                        if (bannerIndex === id) {
                            position = 'activeSlide';
                        }

                        if (
                            id === bannerIndex - 1 ||
                            (bannerIndex === 0 && id === banner.length - 1)
                        ) {
                            position = 'lastSlide';
                        }
                        return (
                            <article
                                className={cx(position)}
                                key={id}
                                onMouseDown={handleMouseDown}
                                onMouseMove={handleMouseMove}
                                onMouseUp={handleMouseUp}
                                onClick={(e) => {
                                    // Nếu giá trị translateX nhỏ hơn 5
                                    // (đây là một ngưỡng nhỏ để xác định xem
                                    // có phải là một thao tác kéo hình ảnh
                                    // hay không),
                                    if (Math.abs(translateX) < 5) {
                                        e.preventDefault();
                                    }
                                }}
                            >
                                <img src={banner} alt={id}></img>
                            </article>
                        );
                    })}
                <ul className={cx('slick-dots')}>
                    <li
                        className={cx('next')}
                        onClick={() => {
                            setBannerIndex(bannerIndex + 1);
                        }}
                    ></li>
                    <li
                        className={cx('prev')}
                        onClick={() => {
                            setBannerIndex(bannerIndex - 1);
                        }}
                    ></li>
                </ul>
            </div>

            {/* Collection */}
            <div className={cx('collection-container')}>
                {collection.map((item) => {
                    const { id, img, title, description, link } = item;
                    return (
                        <Link to={link} key={id}>
                            <section className={cx('collection-section')}>
                                <img className={cx('collection-banner')} src={img} alt={title} />
                                <div className={cx('collection-info')}>
                                    <h1 className={cx('collection-title')}>{title}</h1>
                                    <p className={cx('collection-desc')}>{description}</p>
                                </div>
                            </section>
                        </Link>
                    );
                })}
            </div>

            {/* Shopping List */}
            <div className={cx('shopping-container')}>
                <div className={cx('shoppingList-title')}>
                    <h1>Danh mục mua hàng</h1>
                </div>
                <div className={cx('shoppingList-container')}>
                    {shoppingList.map((items) => {
                        const { id, title, bgImg, listItems } = items;
                        const bgStyle = {
                            backgroundImage: `url(${bgImg})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'contain', // hoặc 'contain' nếu bạn muốn hình ảnh bao phủ phần tử chứa nó
                        };
                        return (
                            <ul className={cx('shoppingList')} key={id} style={bgStyle}>
                                <div className={cx('shopping-title')}>
                                    <h2>{title}</h2>
                                </div>
                                {listItems &&
                                    listItems.map((item, index) => {
                                        const { listTitle } = item;
                                        return (
                                            <li key={index} className={cx('shoppingList-items')}>
                                                {listTitle}
                                            </li>
                                        );
                                    })}
                            </ul>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Content;
