import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCartShopping,
    faChevronLeft,
    faChevronRight,
    faSearch,
    faSpinner,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import routes from '~/config/routes';
import { headerData, navData, slideBarData } from '~/data/Header/Header';
import { useState, useEffect, useRef, useCallback } from 'react';
import { faFacebookF, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { useDebounce } from '~/components/hooks';
import * as homeService from '~/apiServices/homeService';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.cjs';
import 'tippy.js/themes/light.css';
import 'tippy.js/animations/perspective.css';
const cx = classNames.bind(styles);
function Header() {
    // SlideBar
    const [slide, setSlide] = useState(slideBarData);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        let lastIndex = slide.length - 1;
        if (index > lastIndex) {
            setIndex(0);
        }
        if (index < 0) {
            setIndex(lastIndex);
        }
    }, [index, slide]);

    useEffect(() => {
        let slider = setInterval(() => {
            setIndex(index + 1);
        }, 3000);
        return () => clearInterval(slider);
    }, [index]);

    // HoverMenu
    const [hoverIndex, setHoverIndex] = useState(null);

    // Search place use rebounce hook
    const inputRef = useRef();
    const [input, setInput] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const debounce = useDebounce(input, 500);

    // Bước 1: sử dụng UseEffect để xét điều kiện
    // nếu như giá trị của debounce ở đầu cuối (trim) bằng false thì setShowResult = mảng rỗng
    useEffect(() => {
        if (debounce.trim()) {
            //  Bước 2: tạo 1 hàm bất đồng bộ để gọi tới API có danh sách sản phẩm
            const fetchApi = async () => {
                // cho setLoading = true để bắt đầu hiện ra phần danh sách tìm kiếm
                setLoading(true);
                const result = await homeService.searchProduct(input);
                setSearchResult(result);
                setLoading(false);
            };
            fetchApi();
        } else {
            setSearchResult([]);
        }
    }, [debounce]);

    const handleSearch = useCallback((e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setInput(searchValue);
            setShowResult(true);
        } else {
            setInput('');
            setSearchResult([]);
        }
    }, []);

    const handleHideResult = () => {
        setShowResult(false);
    };

    // click vào btn delete thì xóa nội dung của input và focus vào input
    const handleDelete = () => {
        setInput('');
        setSearchResult([]);
        setShowResult(false);
        inputRef.current.focus();
    };

    // Khi click vào danh sách tìm kiếm thì clear input
    const handleChooseProduct = () => {
        handleDelete();
        setShowResult(false);
    };
    //End Search btn

    return (
        <div className={cx('container')}>
            <header className={cx('header')}>
                {headerData.map((item) => {
                    return (
                        <li key={item.id} className={cx('header-items')}>
                            <Link to={item.link}>
                                <i className={cx('head-icons')}>{item.icon}</i>
                                <span className={cx('head-title')}>{item.title}</span>
                            </Link>
                        </li>
                    );
                })}
            </header>

            {/* Navigation */}
            <div className={cx('nav-container')}>
                <i className={cx('logo')}>
                    <Link to={routes.home}>
                        <img src="https://ananas.vn/wp-content/themes/ananas/fe-assets/images/svg/Logo_Ananas_Header.svg"></img>
                    </Link>
                </i>
                <ul className={cx('nav')}>
                    {navData.map((item, index) => {
                        const { title, icon, list } = item;
                        return (
                            <li
                                key={index}
                                className={cx('nav-items')}
                                onMouseEnter={() => setHoverIndex(index)}
                                onMouseLeave={() => setHoverIndex(null)}
                            >
                                <h3 className={cx('nav-title')}>{title}</h3>
                                {list && index === hoverIndex && (
                                    <ul key={index} className={cx('nav-list')}>
                                        {list.map((item, subIndex) => {
                                            const { listTitle, img, link } = item;
                                            return link ? (
                                                <Link to={link} key={subIndex}>
                                                    <li className={cx('nav-list-items')}>
                                                        {img && (
                                                            <img
                                                                src={img}
                                                                width={260}
                                                                height={260}
                                                                className={cx('list-banners')}
                                                            ></img>
                                                        )}
                                                        <p className={cx('list-title')}>
                                                            {listTitle}
                                                        </p>
                                                    </li>
                                                </Link>
                                            ) : (
                                                <li key={subIndex} className={cx('nav-list-items')}>
                                                    {img && (
                                                        <img
                                                            src={img}
                                                            width={260}
                                                            height={260}
                                                            className={cx('list-banners')}
                                                        ></img>
                                                    )}
                                                    <p className={cx('list-title')}>{listTitle}</p>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                                <h3 className={cx('nav-icon')}>{icon}</h3>
                            </li>
                        );
                    })}
                    <li className={cx('aboutUs')}>
                        <img src="https://ananas.vn/wp-content/themes/ananas/fe-assets/images/svg/DiscoverYOU.svg"></img>
                    </li>
                </ul>
                <div className={cx('search')}>
                    <button className={cx('serch-btn')}>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                    <div className={cx('wrapper')}>
                        <HeadlessTippy
                            interactive={true}
                            visible={showResult}
                            maxWidth={100}
                            placement={'bottom'}
                            render={(attrs) => (
                                <div className={cx('search-results')} {...attrs}>
                                    <h5 className={cx('search-title')}>Products</h5>
                                    {searchResult.map((searchValue) => {
                                        const { id, pro_name, image2 } = searchValue;
                                        return (
                                            <div
                                                key={id}
                                                className={cx('pro_result_info')}
                                                onClick={() => handleChooseProduct()}
                                            >
                                                <Link to={`${routes.productDetail}/${id}`}>
                                                    <img width={80} height={80} src={image2}></img>
                                                    <h5>{pro_name}</h5>
                                                </Link>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                            onClickOutside={handleHideResult}
                        >
                            <input
                                ref={inputRef}
                                value={input}
                                type="text"
                                placeholder="tìm kiếm"
                                spellCheck={false}
                                className={cx('search-place')}
                                onChange={handleSearch}
                            />
                        </HeadlessTippy>
                        {!!input && !loading && (
                            <div className={cx('deleteSearch')} onClick={handleDelete}>
                                <FontAwesomeIcon icon={faXmark} />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* SlideBar */}

            <div className={cx('slideBar-container')}>
                <div className={cx('sideBar')}>
                    <button className={cx('prev')} onClick={() => setIndex(index - 1)}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <div className={cx('slideContent')}>
                        {slide.map((item, slideIndex) => {
                            const { title } = item;
                            let position = 'nextSlide';
                            if (index === slideIndex) {
                                position = 'active';
                            }
                            if (
                                slideIndex === index - 1 ||
                                (index === 0 && slideIndex === slide.length - 1)
                            ) {
                                position = 'lastSlide';
                            }

                            return (
                                <article className={cx(position)} key={slideIndex} tabIndex={0}>
                                    <h5>{title}</h5>
                                </article>
                            );
                        })}
                    </div>
                    <button className={cx('next')} onClick={() => setIndex(index + 1)}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>
            </div>

            {/* Cart and Social */}
            <div className={cx('cart')}>
                <h5 className={cx('value')}>1</h5>
                <FontAwesomeIcon icon={faCartShopping} className={cx('icon')} />
            </div>
            <div className={cx('social')}>
                <div className={cx('icons')}>
                    <FontAwesomeIcon icon={faFacebookF} className={cx('face')} />
                </div>
                <div className={cx('icons')}>
                    <FontAwesomeIcon icon={faInstagram} className={cx('ins')} />
                </div>
                <div className={cx('icons')}>
                    <FontAwesomeIcon icon={faYoutube} className={cx('youtube')} />
                </div>
            </div>
        </div>
    );
}

export default Header;
