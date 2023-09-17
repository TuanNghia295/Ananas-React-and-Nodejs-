import classNames from 'classnames/bind';
import styles from './defaultLayouts.module.scss';
import Header from '../components/Header';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('content')}>{children}</div>
            <div className={cx('footer')}></div>
        </div>
    );
}

export default DefaultLayout;
