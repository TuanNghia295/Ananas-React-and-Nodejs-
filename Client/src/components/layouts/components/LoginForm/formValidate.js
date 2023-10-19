import React, { useState } from 'react'; // Import React
import Button from '~/components/Button';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './login.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle, faInstagram } from '@fortawesome/free-brands-svg-icons';

const cx = classNames.bind(styles);

// Define a functional component for your form
const FormValidate = (props) => {
    return (
        <form
            className={cx('form-container', { 'sign-up-container': props.isSignUpActive })}
            onSubmit={props.handleSignUp}
        >
            <div className={cx('form-signUp-signIn')}>
                <h1>{props.isSignUpActive ? 'Sign up' : 'Sign in'}</h1>
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
                {props.isSignUpActive && (
                    <input
                        value={props.nameValue}
                        type="text"
                        placeholder="Name"
                        name="acc_name"
                        className={cx('inputPlace')}
                        onChange={props.onGetNameValue}
                    />
                )}
                <input
                    value={props.emailValue}
                    type="email"
                    placeholder="Email"
                    className={cx('inputPlace')}
                    name="acc_email"
                    onChange={props.onGetAccountValue}
                />
                <input
                    value={props.passValue}
                    type="password"
                    placeholder="Password"
                    className={cx('inputPlace')}
                    autoComplete="currentPassword"
                    name="acc_pass"
                    onChange={props.onGetPassValue}
                />

                {props.errorVisible && (
                    <p className={cx('warning')}>Username or password invalid</p>
                )}
                {props.isSignUpActive ? (
                    <Button className={cx('signUp-btn')} primary onClick={props.handleSignUp}>
                        Sign Up
                    </Button>
                ) : (
                    <>
                        <Link to={'#'}>Forgot your password?</Link>
                        <Button className={cx('signIn-btn')} primary onClick={props.handleSignIn}>
                            Sign in
                        </Button>
                    </>
                )}
            </div>
        </form>
    );
};

export default FormValidate; // Export the component
