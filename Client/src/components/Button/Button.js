import classNames from 'classnames/bind';
import styles from './button.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
function Button(props) {
    // sử dụng destructuring,rest để bóc tách đối tượng
    const {
        children,
        to,
        small = false,
        primary = false,
        large = false,
        outline = false,
        leftIcon,
        rightIcon,
        className,
        onClick,
        onSubmit,
        disabled = false,
        ...pastProps
    } = props;

    const classes = cx('wrapper', {
        primary,
        small,
        large,
        outline,
        leftIcon,
        rightIcon,
        disabled,
        [className]: className,
    });

    // Tạo ra biến thuộc tính để truyển vào Button (vd: onClick)
    const properties = {
        onClick,
        onSubmit,
        ...pastProps,
    };

    //tạo biến comp (component) mặc định là button
    let Comp = 'button';

    // Kiểm tra xem button có sử dụng để chuyển trang không
    // Nếu == true thì add thêm key properties.to có value là to
    // Thay đổi comp thành thẻ Link
    if (to) {
        properties.to = to;
        Comp = Link;
    }

    // Remove eventListeners when button is disabled
    if (disabled) {
        // Object.keys(properties).forEach();
        Object.keys(properties).forEach((propKey) => {
            if (propKey.startsWith('on') && typeof properties[propKey] === 'function') {
                delete properties[propKey];
            }
        });
    }

    return (
        <Comp className={classes} {...properties}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

export default Button;
