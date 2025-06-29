'use client'
import React, {useRef, useState} from "react";
import {ReCAPTCHA} from "react-google-recaptcha";
import {useForm} from "react-hook-form";
import {CLIENT_API_URL, RECAPTCHA_KEY} from "../../constants";
import {useRouter, useSearchParams} from 'next/navigation';
import axios from "axios";
import {toast} from "sonner";

export default function ResetForm() {
    const {
        register,
            handleSubmit,
            setError,
            clearErrors,
            formState: { errors },
    } = useForm();
    const recaptchaRef = useRef(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const resetToken = searchParams.get('token');

    const onSubmit = async (data) => {
        const recaptchaValue = recaptchaRef.current?.getValue() || 'ok';
        if (!recaptchaValue) {
            alert("Please complete the reCAPTCHA");
            return;
        }

        if(data['password'] !== data['passwordConfirmation']) {
            setError("passwordConfirmation", { type: "manual", message: "You password and it confirmation are not the same!" });
            return;
        }

        // console.log("Form submitted:", { ...data, resetToken, recaptchaValue});
        try {
            await axios.post(CLIENT_API_URL+'/api/auth/reset-password', { ...data, resetToken, recaptcha: recaptchaValue });
            toast.success('Your password is updated successfully.');
            router.push('/login'); // Redirect to the cabinet page on successful login
        } catch (error) {
            setError("password", { type: "manual", message: "Something went wrong; please try again or contact support." });
        }
    };

    return (
        <section className="section-margin">
            <div className="container">
                <div className="login-form">
                    <h3 className="text-center mb-4">Reset password</h3>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className="mb-3">
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

                        <div className="mb-4">
                            <label className="form-label">Confirm Password</label>
                            <input
                                type="password"
                                {...register('passwordConfirmation', { required: 'Valid password is required' })}
                                className={`form-control ${errors.passwordConfirmation ? 'is-invalid' : ''}`}
                            />
                            {errors.passwordConfirmation && (
                                <div className="invalid-feedback">{errors.passwordConfirmation.message}</div>
                            )}
                        </div>

                        {/*<div className="mb-3 text-center">*/}
                        {/*    <ReCAPTCHA*/}
                        {/*        sitekey={RECAPTCHA_KEY}*/}
                        {/*        ref={recaptchaRef}*/}
                        {/*    />*/}
                        {/*</div>*/}

                        <button type="submit" className="btn-basic justify-content-center w-100">
                            Set new password
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
