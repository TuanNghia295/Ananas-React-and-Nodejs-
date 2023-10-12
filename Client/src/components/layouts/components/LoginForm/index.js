import React, { useState, useEffect, useRef, useCallback } from 'react';
import classNames from 'classnames/bind';
import styles from './login.module.scss';
import { Link } from 'react-router-dom';
import Button from '~/components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle, faInstagram } from '@fortawesome/free-brands-svg-icons';
import * as homeService from '~/apiServices/homeService';
import { useDebounce } from '~/components/hooks';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function LoginForm() {
    const [isSignUpActive, setIsSignUpActive] = useState(false);

    // confirm info
    const [account, setAccount] = useState(null);

    const [emailValue, setEmailValue] = useState('');
    const [password, setPasswords] = useState('');

    const [name, setName] = useState('');
    const nameRef = useRef();

    const emailDebounce = useDebounce(emailValue, 500);
    const passDebounce = useDebounce(password, 500);
    const [errorVisible, setErrorVisible] = useState(false);

    // use useNavigate to programmatically change the browser's URL
    const navigate = useNavigate();

    // Get List Account
    useEffect(() => {
        const list = async () => {
            const result = await homeService.getAccountList();
            setAccount(result);
        };
        list();
    }, []);

    // Handle click btn signin and sign up
    const handleSignUpClick = (e) => {
        e.preventDefault();
        setIsSignUpActive(true);
    };

    const handleSignInClick = (e) => {
        e.preventDefault();
        setIsSignUpActive(false);
    };

    // Handle Sigin Submit
    const handleSignInSubmit = async () => {
        try {
            if (!emailDebounce || !passDebounce) {
                console.log('Email hoặc mật khẩu không hợp lệ');
                return;
            }

            const response = await homeService.login(emailDebounce, passDebounce);
            if (response && response.success) {
                // Đăng nhập thành công
                alert('Đăng nhập thành công');
                // Thực hiện các thao tác sau khi đăng nhập thành công (ví dụ: chuyển hướng)
                navigate('/');
            } else {
                // Đăng nhập thất bại
                console.log('Đăng nhập thất bại');
                // Display an error message to the user if success is false
                if (!response.success) {
                    console.log('Error:', response.message);
                    // Show the error message to the user
                    setErrorVisible(true);
                }
            }
        } catch (error) {
            console.error('Lỗi khi gọi hàm đăng nhập:', error);
        }
    };

    // Handle Register Form

    // handle getAccount value
    const handleGetAccountValue = useCallback(
        (e) => {
            const emailVal = e.target.value.trim().replaceAll(' ', ''); // Loại bỏ tất cả khoảng trắng;
            if (!emailVal.startsWith(' ')) {
                setEmailValue(emailVal);
            } else {
                setEmailValue('');
            }
        },
        [emailDebounce],
    );

    const handleGetPasswordValue = useCallback(
        (e) => {
            const passVal = e.target.value.trim();
            if (!passVal.startsWith(' ')) {
                setPasswords(passVal);
            } else {
                setPasswords('');
            }
        },
        [passDebounce],
    );

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')} id="container">
                <div className={cx('form-container', { 'sign-up-container': isSignUpActive })}>
                    <div className={cx('form-signUp-signIn')}>
                        <h1>{isSignUpActive ? 'Sign up' : 'Sign in'}</h1>
                        <div className={cx('social-container')}>
                            <Link to={'#'} className={cx('social')}>
                                <FontAwesomeIcon className={cx('face-icon')} icon={faFacebook} />
                            </Link>
                            <Link to={'#'} className={cx('social')}>
                                <FontAwesomeIcon className={cx('ins-icon')} icon={faInstagram} />
                            </Link>
                            <Link to={'#'} className={cx('social')}>
                                <FontAwesomeIcon className={cx('gg-icon')} icon={faGoogle} />
                            </Link>
                        </div>
                        <span>or use your email for registration</span>
                        {isSignUpActive && (
                            <input
                                type="text"
                                placeholder="Name"
                                name="acc_name"
                                className={cx('inputPlace')}
                            />
                        )}
                        <input
                            value={emailValue}
                            type="email"
                            placeholder="Email"
                            className={cx('inputPlace')}
                            name="acc_email"
                            onChange={handleGetAccountValue}
                        />
                        <input
                            value={password}
                            type="password"
                            placeholder="Password"
                            className={cx('inputPlace')}
                            autoComplete="currentPassword"
                            name="acc_pass"
                            onChange={handleGetPasswordValue}
                        />

                        {errorVisible && (
                            <p className={cx('warning')}>Username or password invalid</p>
                        )}
                        {isSignUpActive ? (
                            <Button className={cx('signUp-btn')} primary>
                                Sign Up
                            </Button>
                        ) : (
                            <>
                                <Link to={'#'}>Forgot your password?</Link>
                                <Button
                                    className={cx('signIn-btn')}
                                    primary
                                    onClick={handleSignInSubmit}
                                >
                                    Sign in
                                </Button>
                            </>
                        )}
                    </div>
                </div>
                <div className={cx('overlay-container', { 'right-panel-active': isSignUpActive })}>
                    <div className={cx('overlay')}>
                        {isSignUpActive ? (
                            <div
                                className={cx('overlay-panel', { 'overlay-left': !isSignUpActive })}
                            >
                                <h1>Welcome Back!</h1>
                                <p>
                                    To keep connected with us please login with your personal info
                                </p>
                                <Button
                                    className={cx('sign-in-container')}
                                    id={cx('signIn')}
                                    onClick={handleSignInClick}
                                >
                                    Sign In
                                </Button>
                            </div>
                        ) : (
                            <div className={cx('overlay-panel', 'overlay-right')}>
                                <h1>Hello!</h1>
                                <p>Enter your personal details and start journey with us</p>
                                <Button
                                    className={cx('ghost')}
                                    id={cx('signUp')}
                                    onClick={handleSignUpClick}
                                >
                                    Sign Up
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
