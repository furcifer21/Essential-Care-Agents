'use client'

import axios from "axios";

import React, {useRef, useState} from "react";
import {ReCAPTCHA} from "react-google-recaptcha";
import {useForm} from "react-hook-form";
import {CLIENT_API_URL, RECAPTCHA_KEY} from "../../constants";
import {useRouter} from 'next/navigation';
import useAuthStore from '../../storage';


export default function LoginForm() {
    const {
        register,
            handleSubmit,
            setError,
            clearErrors,
            formState: { errors },
    } = useForm();
    const recaptchaRef = useRef(null);
    const router = useRouter();
    const setAuth = useAuthStore((state) => state.setAuth);

    const onSubmit = async (data) => {
        const recaptchaValue = recaptchaRef.current?.getValue() || 'ok';
        if (!recaptchaValue) {
            alert("Please complete the reCAPTCHA");
            return;
        }

        console.log("Form submitted:", { ...data, recaptchaValue});
        try {
            const response = await axios.post(CLIENT_API_URL+'/api/auth/login', { ...data, recaptcha: recaptchaValue });
            if (response?.data?.token) {
                setAuth(response.data.token, response.data.user);
                router.push('/cabinet/my-portal'); // Redirect to the cabinet page on successful login
            } else {
                setError("email", { type: "manual", message: response.data.message });
            }
        } catch (error) {
            console.error("Login error:", error);
            setError("email", { type: "manual", message: "Login failed. Please try again." });
        }
    };

    return (
        <section className="section-margin">
            <div className="container">
                <div className="login-form">
                    <h3 className="text-center mb-4">Authorization</h3>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                {...register('email', { required: 'Valid email is required', pattern: /^\S+@\S+$/i })}
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            />
                            {errors.email && (
                                <div className="invalid-feedback">{errors.email.message}</div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                {...register('password', { required: 'Valid password is required' })}
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            />
                            {errors.password && (
                                <div className="invalid-feedback">{errors.password.message}</div>
                            )}
                        </div>

                        {/*<div className="mb-3 text-center">*/}
                        {/*    <ReCAPTCHA*/}
                        {/*        sitekey={RECAPTCHA_KEY}*/}
                        {/*        ref={recaptchaRef}*/}
                        {/*    />*/}
                        {/*</div>*/}

                        <button type="submit" className="btn-basic justify-content-center w-100">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
