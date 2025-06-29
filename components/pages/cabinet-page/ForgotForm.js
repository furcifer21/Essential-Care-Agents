'use client'
import React from "react";
import {useForm} from "react-hook-form";
import {CLIENT_API_URL, RECAPTCHA_KEY, RECAPTCHA_KEY_V2} from "../../constants";
import {useRouter} from 'next/navigation';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import axios from "axios";
import {toast} from "sonner";

const ForgotFormContent = () => {
    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm();
    const router = useRouter();
    const { executeRecaptcha } = useGoogleReCaptcha();

    const onSubmit = async (data) => {
        if (!executeRecaptcha) {
            setError('email', { type: 'manual', message: 'reCAPTCHA not ready' });
            return;
        }

        try {
            const gRecaptchaToken = await executeRecaptcha('forgot_form');
            await axios.post(CLIENT_API_URL+'/api/auth/forgot-password', {
                ...data,
                'g-recaptcha-response': gRecaptchaToken
            });
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
                        <button type="submit" className="btn-basic justify-content-center w-100">
                            Send password request
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default function ForgotForm() {
    return (
      <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_KEY}>
          <ForgotFormContent />
      </GoogleReCaptchaProvider>
    )
}
