import React, { useState, useEffect, useRef, useCallback } from 'react';
import classNames from 'classnames/bind';
import styles from './login.module.scss';
import Button from '~/components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle, faInstagram } from '@fortawesome/free-brands-svg-icons';
import * as homeService from '~/apiServices/homeService';
import { useDebounce } from '~/components/hooks';
import { useNavigate } from 'react-router-dom';
import FormValidate from './formValidate';

const cx = classNames.bind(styles);

function Login() {
    const [isSignUpActive, setIsSignUpActive] = useState(false);

    // confirm info
    const [account, setAccount] = useState(null);

    const [emailValue, setEmailValue] = useState('');
    const [password, setPasswords] = useState('');
    const [name, setName] = useState('');

    const emailDebounce = useDebounce(emailValue, 500);
    const passDebounce = useDebounce(password, 500);
    const nameDebounce = useDebounce(name, 500);

    const [errorVisible, setErrorVisible] = useState(false);

    // use useNavigate to programmatically change the browser's URL
    const navigate = useNavigate();

    // Get List Account
    useEffect(() => {
        const list = async () => {
            const result = await homeService.getAccountList();
            console.log(result);
            setAccount(result);
        };
        list();
    }, []);

    // Handle click btn signin and sign up
    const handleSignUpClick = (e) => {
        setEmailValue('');
        setPasswords('');
        setIsSignUpActive(true);
    };

    const handleSignInClick = (e) => {
        setIsSignUpActive(false);
        setEmailValue('');
        setPasswords('');
    };

    // Handle Sigin Submit
    // Trong file login.js
    const handleSignInSubmit = async () => {
        try {
            const response = await homeService.login(emailDebounce, passDebounce);
            if (response && response.success) {
                // Đăng nhập thành công
                alert('Đăng nhập thành công');

                // Thực hiện chuyển hướng về trang chủ
                navigate('/');
            } else {
                // Đăng nhập thất bại
                // Display an error message to the user if success is false
                if (!response.success) {
                    // Show the error message to the user
                    setErrorVisible(true);
                }
            }
        } catch (error) {
            console.error('Lỗi khi gọi hàm đăng nhập:', error);
        }
    };

    // Handle Register Form
    const handleSignUpSubmit = async () => {
        try {
            const response = await homeService.register(emailDebounce, passDebounce, nameDebounce);
            if (response.canCreate) {
                alert('success registration');
                navigate('/');
            }
        } catch (error) {
            console.log('Error registering', error);
        }
    };
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
        [emailDebounce], // Thay thế [emailValue] bằng [emailDebounce]
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

    const handleGetNameValue = useCallback(
        (e) => {
            const nameVal = e.target.value;
            if (!nameVal.startsWith(' ')) {
                setName(nameVal);
                console.log('did get name');
            } else {
                setName('');
            }
        },
        [nameDebounce],
    );

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')} id="container">
                <FormValidate
                    isSignUpActive={isSignUpActive}
                    errorVisible={errorVisible}
                    nameValue={name}
                    passValue={password}
                    emailValue={emailValue}
                    onGetNameValue={handleGetNameValue}
                    onGetPassValue={handleGetPasswordValue}
                    onGetAccountValue={handleGetAccountValue}
                    handleSignUp={handleSignUpSubmit}
                    handleSingIn={handleSignInSubmit}
                />
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

export default Login;
