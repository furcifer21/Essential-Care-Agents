'use client'
import React, {useRef, useState} from "react";
import {ReCAPTCHA} from "react-google-recaptcha";
import {useForm} from "react-hook-form";
import {CLIENT_API_URL, RECAPTCHA_KEY} from "../../constants";
import {useRouter} from 'next/navigation';
import axios from "axios";
import {toast} from "sonner";

export default function ForgotForm() {
    const {
        register,
            handleSubmit,
            setError,
            clearErrors,
            formState: { errors },
    } = useForm();
    const recaptchaRef = useRef(null);
    const router = useRouter();

    const onSubmit = async (data) => {
        const recaptchaValue = recaptchaRef.current?.getValue() || 'ok';
        if (!recaptchaValue) {
            alert("Please complete the reCAPTCHA");
            return;
        }

        // console.log("Form submitted:", { ...data, recaptchaValue});
        try {
            await axios.post(CLIENT_API_URL+'/api/auth/forgot-password', { ...data, recaptcha: recaptchaValue });
            toast.success('Your request has been sent successfully. Check please your email.');
            router.push('/login');
        } catch (error) {
            setError("email", { type: "manual", message: "Something went wrong; please try again or contact support." });
        }
    };

    return (
        <section className="section-margin">
            <div className="container">
                <div className="login-form">
                    <h3 className="text-center mb-4">Forgot password</h3>
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

                        {/*<div className="mb-3 text-center">*/}
                        {/*    <ReCAPTCHA*/}
                        {/*        sitekey={RECAPTCHA_KEY}*/}
                        {/*        ref={recaptchaRef}*/}
                        {/*    />*/}
                        {/*</div>*/}

                        <button type="submit" className="btn-basic justify-content-center w-100">
                            Send password request
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
