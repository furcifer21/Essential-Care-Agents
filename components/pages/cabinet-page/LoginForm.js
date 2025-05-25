'use client'
import React, {useRef, useState} from "react";
import {ReCAPTCHA} from "react-google-recaptcha";
import {useForm} from "react-hook-form";

export default function LoginForm() {
    const {
        register,
            handleSubmit,
            setError,
            clearErrors,
            formState: { errors },
    } = useForm();
    const recaptchaRef = useRef(null);

    const onSubmit = async (data) => {
        const recaptchaValue = recaptchaRef.current?.getValue();
        if (!recaptchaValue) {
            alert("Please complete the reCAPTCHA");
            return;
        }

        console.log("Form submitted:", { ...data, recaptcha: recaptchaValue });
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

                        <div className="mb-3 text-center">
                            <ReCAPTCHA
                                sitekey="your-recaptcha-site-key"
                                ref={recaptchaRef}
                            />
                        </div>

                        <button type="submit" className="btn-basic justify-content-center w-100">
                            login
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
