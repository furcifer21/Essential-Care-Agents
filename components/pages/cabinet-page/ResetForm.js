'use client'

import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {CLIENT_API_URL, RECAPTCHA_KEY} from "../../constants";
import {useRouter, useSearchParams} from 'next/navigation';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import axios from "axios";
import {toast} from "sonner";
import {IconButton} from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';

const ResetFormContent = () => {
    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm();
    const router = useRouter();
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [showPassword, setShowPassword] = useState(false);
    const [isValidPasswordRules, setIsValidPasswordRules] = useState([false, false, false, false, false]);

    const searchParams = useSearchParams();
    const resetToken = searchParams.get('token');
    const isNew = searchParams.get('isNew');

    const onSubmit = async (data) => {
        if (!executeRecaptcha) {
            setError('password', { type: 'manual', message: 'reCAPTCHA not ready' });
            return;
        }

        if(data['password'] !== data['passwordConfirmation']) {
            setError("passwordConfirmation", { type: "manual", message: "You password and it confirmation are not the same!" });
            return;
        }

        try {
            const gRecaptchaToken = await executeRecaptcha('reset_form');
            await axios.post(CLIENT_API_URL+'/api/auth/reset-password', {
                ...data,
                resetToken,
                'g-recaptcha-response': gRecaptchaToken
            });
            toast.success('Your password is updated successfully.');
            router.push('/login'); // Redirect to the cabinet page on successful login
        } catch (error) {
            setError("password", { type: "manual", message: "Something went wrong; please try again or contact support." });
        }
    };

    const setOneRule = (index, value) => {
        setIsValidPasswordRules((prev) => {
            const newRules = [...prev]; // Создаем копию массива
            newRules[index] = value; // Изменяем 4-й элемент
            return newRules;
        });
    }
    const checkPasswordRules = (value) => {
        // Check length > 7
        if(value.length >7) setOneRule(0, true);
        else setOneRule(0, false);
        // Check at lease one lowercase
        if(/[a-z]/.test(value)) setOneRule(1, true);
        else setOneRule(1, false);
        // Check at lease one capital
        if(/[A-Z]/.test(value)) setOneRule(2, true);
        else setOneRule(2, false);
        // Check at lease one digit
        if(/[0-9]/.test(value)) setOneRule(3, true);
        else setOneRule(3, false);
        // Check at lease one special character
        if(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) setOneRule(4, true);
        else setOneRule(4, false);
    }

    return (
        <section className="section-margin">
            <div className="container">
                <div className="login-form">
                    <h3 className="text-center mb-4">
                        { isNew === '1' ?
                          <>Set new password</>
                          :
                          <>Reset password</>
                        }
                    </h3>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className="mb-3" style={{position:'relative'}}>
                            <label className="form-label">Password</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                {...register('password', {
                                    required: 'Valid password is required',
                                    onChange: (e) => checkPasswordRules(e.target.value),
                                })}
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            />
                            {!errors.password && (
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              style={{
                                  position: 'absolute',
                                  right: '8px',
                                  top: '75%',
                                  transform: 'translateY(-50%)',
                              }}
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                            )}

                            {errors.password && (
                                <div className="invalid-feedback">{errors.password.message}</div>
                            )}
                        </div>

                        <div className="mb-4" style={{position:'relative'}}>
                            <label className="form-label">Confirm Password</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                {...register('passwordConfirmation', { required: 'Valid password is required' })}
                                className={`form-control ${errors.passwordConfirmation ? 'is-invalid' : ''}`}
                            />
                            {!errors.passwordConfirmation && (
                                <IconButton
                                  onClick={() => setShowPassword(!showPassword)}
                                  style={{
                                      position: 'absolute',
                                      right: '8px',
                                      top: '75%',
                                      transform: 'translateY(-50%)',
                                  }}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            )}

                            {errors.passwordConfirmation && (
                                <div className="invalid-feedback">{errors.passwordConfirmation.message}</div>
                            )}
                        </div>
                        <div style={{width: 'fit-content', margin:'auto', display: 'flex', flexDirection: 'column', paddingBottom:'12px', fontSize:'.8rem', color:'red'}}>
                            <div className='w-100' style={isValidPasswordRules[0]?{color:'green'}:{}}>&bull; At least 8 characters</div>
                            <div className='w-100' style={isValidPasswordRules[1]?{color:'green'}:{}}>&bull; At least one lowercase letter</div>
                            <div className='w-100' style={isValidPasswordRules[2]?{color:'green'}:{}}>&bull; At least one capital letter</div>
                            <div className='w-100' style={isValidPasswordRules[3]?{color:'green'}:{}}>&bull; At least one digit</div>
                            <div className='w-100' style={isValidPasswordRules[4]?{color:'green'}:{}}>&bull; At least one special character</div>
                        </div>

                        <button type="submit" className="btn-basic justify-content-center w-100" disabled={!isValidPasswordRules.every(Boolean)}>
                            Set new password
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default function ResetForm() {
    return (
      <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_KEY}>
          <ResetFormContent />
      </GoogleReCaptchaProvider>
    )
};