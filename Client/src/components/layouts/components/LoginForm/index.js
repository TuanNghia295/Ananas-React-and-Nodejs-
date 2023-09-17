import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './login.module.scss';
import { Link } from 'react-router-dom';
import Button from '~/components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle, faInstagram } from '@fortawesome/free-brands-svg-icons';

const cx = classNames.bind(styles);

function LoginForm() {
    const [isSignUpActive, setIsSignUpActive] = useState(false);

    const handleSignUpClick = (e) => {
        e.preventDefault();
        console.log(e);
        setIsSignUpActive(true);
    };

    const handleSignInClick = () => {
        setIsSignUpActive(false);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')} id="container">
                <div className={cx('form-container', { 'sign-up-container': isSignUpActive })}>
                    <form action="#" className={cx('form-signUp-signIn')}>
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
                            <input type="text" placeholder="Name" className={cx('inputPlace')} />
                        )}
                        <input type="email" placeholder="Email" className={cx('inputPlace')} />
                        <input
                            type="password"
                            placeholder="Password"
                            className={cx('inputPlace')}
                        />
                        {isSignUpActive ? (
                            <Button className={cx('signUp-btn')} primary>
                                Sign Up
                            </Button>
                        ) : (
                            <>
                                <Link to={'#'}>Forgot your password?</Link>
                                <Button className={cx('signIn-btn')} primary>
                                    Sign in
                                </Button>
                            </>
                        )}
                    </form>
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
