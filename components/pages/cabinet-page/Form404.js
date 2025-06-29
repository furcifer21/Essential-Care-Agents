'use client'
import React, {useRef, useState} from "react";
import {ReCAPTCHA} from "react-google-recaptcha";
import {useForm} from "react-hook-form";
import {CLIENT_API_URL, RECAPTCHA_KEY} from "../../constants";
import {useRouter} from 'next/navigation';

export default function Form404() {
    const router = useRouter();

    return (
        <section className="section-margin">
            <div className="container">
                <div className="login-form">
                    <h3 className="text-center mb-4">Under construction</h3>
                    <div className="row">
                        <div className="col text-center">
                            Sorry! This page is currently under development. Stay tuned for exciting new features coming soon to our portal!
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
