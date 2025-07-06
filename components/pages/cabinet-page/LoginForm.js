'use client'

import React, {useCallback} from "react";
import {useForm} from "react-hook-form";
import {CLIENT_API_URL, RECAPTCHA_KEY} from "../../constants";
import {useRouter} from 'next/navigation';
import  { useAuthStore, useCacheStore } from '../../storage';
import axios from "axios";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const LoginFormContent = () => {
    const {
        register,
            handleSubmit,
            setError,
            clearErrors,
            formState: { errors },
    } = useForm();

    const router = useRouter();
    const setAuth = useAuthStore((state) => state.setAuth);
    const setStates = useCacheStore((state) => state.setStates);
    const { usStates } = useCacheStore();
    const { executeRecaptcha } = useGoogleReCaptcha();

    const onSubmit = useCallback(async (data) => {
        if (!executeRecaptcha) {
            setError('password', { type: 'manual', message: 'reCAPTCHA not ready' });
            return;
        }

        try {
            const gRecaptchaToken = await executeRecaptcha('login_form');
            const response = await axios.post(CLIENT_API_URL+'/api/auth/login', {
                ...data,
                'g-recaptcha-response': gRecaptchaToken
            });

            if (response?.data?.token) {
                const user = response.data.user;
                user.producerAgreementNo=response.data.user.producer_agreement_no;
                user.producerAgreementDate= response.data.user.producer_agreement_date ? new Date(response.data.user.producer_agreement_date) : '';
                user.feeAgreementNo=response.data.user.fee_agreement_no;
                user.feeAgreementDate= response.data.user.fee_agreement_date ? new Date(response.data.user.fee_agreement_date): '';
                setAuth(response.data.token, user);

                if(!usStates) {
                    const response2 = await axios.get(CLIENT_API_URL + '/api/states');
                    if(response2?.data?.data) {
                        setStates(response2.data.data);
                    }
                }

                router.push('/cabinet/my-portal'); // Redirect to the cabinet page on successful login
            } else {
                setError("email", { type: "manual", message: response.data.message });
            }
        } catch (error) {
            setError("email", { type: "manual", message: "Login failed. Please try again." });
        }
    }, [executeRecaptcha, setError, setAuth, usStates, setStates]);

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
                            <div className="forgot-pass pt-3 text-end">
                                <a href="/forgot" className="">Forgot password?</a>
                            </div>

                            {errors.password && (
                                <div className="invalid-feedback">{errors.password.message}</div>
                            )}
                        </div>
                        <button type="submit" className="btn-basic justify-content-center w-100">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default function LoginForm() {
    return (
        <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_KEY}>
            <LoginFormContent />
        </GoogleReCaptchaProvider>
    )
};