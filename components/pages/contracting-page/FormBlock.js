'use client';
import React, {useEffect, useRef, useState} from "react";
import {ReCAPTCHA} from "react-google-recaptcha";
import {Controller, useForm} from "react-hook-form";

export default function FormBlock() {
    const recaptchaRef = useRef();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();
    const ACACarriersCheckboxes = [
        { title: "Aetna CVS Health", name: "aetna" },
        { title: "Ambetter Health", name: "ambetter" },
        { title: "AmeriHealth Caritas Next", name: "amerihealth" },
        { title: "Anthem", name: "anthem" },
        { title: "Antidote Health", name: "antidote" },
        { title: "AvMed", name: "avmed" },
        { title: "Blue Cross and Blue Shield of Arizona", name: "bcbs_az" },
        { title: "Blue Cross and Blue Shield of Illinois", name: "bcbs_il" },
        { title: "Blue Cross and Blue Shield of Michigan", name: "bcbs_mi" },
        { title: "Blue Cross and Blue Shield of Montana", name: "bcbs_mt" },
        { title: "Blue Cross and Blue Shield of Nebraska", name: "bcbs_ne" },
        { title: "Blue Cross and Blue Shield of New Mexico", name: "bcbs_nm" },
        { title: "Blue Cross and Blue Shield of North Carolina", name: "bcbs_nc" },
        { title: "Blue Cross and Blue Shield of Oklahoma", name: "bcbs_ok" },
        { title: "Blue Cross and Blue Shield of Tennessee", name: "bcbs_tn" },
        { title: "Blue Cross and Blue Shield of Texas", name: "bcbs_tx" },
        { title: "CareSource", name: "caresource" },
        { title: "CHRISTUS Health Plan", name: "christus" },
        { title: "Cigna Health", name: "cigna" },
        { title: "Community Health Choice", name: "community" },
        { title: "HAP", name: "hap" },
        { title: "HealthFirst", name: "healthfirst" },
        { title: "Health Net", name: "healthnet" },
        { title: "L.A. Care Health Plan", name: "lacare" },
        { title: "Louisiana Blue", name: "lablue" },
        { title: "McLaren", name: "mclaren" },
        { title: "Medica", name: "medica" },
        { title: "Molina Healthcare", name: "molina" },
        { title: "Oscar Health", name: "oscar" },
        { title: "Priority Health", name: "priority" },
        { title: "Quartz", name: "quartz" },
        { title: "Select Health", name: "select" },
        { title: "Sentara Health Plans", name: "sentara" },
        { title: "UnitedHealthcare", name: "united" },
        { title: "Wellpoint", name: "wellpoint" },
        { title: "WellSense", name: "wellsense" },
    ];

    const onSubmit = (data) => {
       /* const recaptchaValue = recaptchaRef.current?.getValue();
        if (!recaptchaValue) {
            alert("Please complete the reCAPTCHA");
            return;
        }*/

        console.log("Form submitted:", { ...data });
    };

    return (
        <form className="contract-form w-100" onSubmit={handleSubmit(onSubmit)}>
            <h3>Which ACA carriers do you request?</h3>
            {ACACarriersCheckboxes.map((item) => (
                <div key={item.name}>
                    <label className="mb-2">
                        <input type="checkbox"
                                {...register(`carriers.${item.name}`)}
                        />
                        <span className="ps-2">{item.title}</span>
                    </label>
                </div>
            ))}

            <div className="d-flex flex-column mb-2">
                <label className="mb-2">First Name</label>
                <input placeholder={`Your First Name`} {...register('firstName', { required: true, minLength: 2, maxLength: 255 })} />
                {errors.firstName && <span>First name is required (2–255 characters)</span>}
            </div>

            <div className="d-flex flex-column mb-2">
                <label className="mb-2">Last Name</label>
                <input placeholder={`Your Last Name`} {...register('lastName', { required: true, minLength: 2, maxLength: 255 })} />
                {errors.lastName && <span>Last name is required (2–255 characters)</span>}
            </div>

            <div className="d-flex flex-column mb-2">
                <label className="mb-2">Email</label>
                <input placeholder={`Your Email`}
                       {...register('email', {
                           required: 'Valid email is required',
                           pattern: {value: /^\S+@\S+$/i, message: 'Введите корректный email',} })
                        }
                />
                {errors.email && <span>{errors.email.message}</span>}
            </div>

            <div className="d-flex flex-column mb-2">
                <label className="mb-2">Phone</label>
                <input placeholder={`Your Phone`} {...register('phone', {
                    required: true,
                    pattern: /^\+?[1-9]\d{1,14}$/
                })} />
                {errors.phone && <span>Valid phone number is required</span>}
            </div>

            <div className="d-flex flex-column mb-2">
                <label className="mb-2">Resident State</label>
                <input placeholder={`Your Resident State`} {...register('residentState', { required: true, minLength: 2, maxLength: 255 })} />
                {errors.residentState && <span>Resident State is required</span>}
            </div>

            <div className="d-flex flex-column mb-4">
                <label className="mb-2">NPN</label>
                <input placeholder={`Your National Producer Number`} {...register('npn', { required: true, minLength: 2, maxLength: 255 })} />
                {errors.npn && <span>NPN is required</span>}
            </div>

            <div className="d-flex flex-column mb-3">
                <label className="mb-2">Total ACA Sales</label>
                <select placeholder={``} {...register('totalACASales')}>
                    <option value="">Select...</option>
                    <option value="0-50">0–50</option>
                    <option value="51-100">51–100</option>
                    <option value="101+">101+</option>
                </select>
            </div>

            <div className="d-flex flex-column mb-2">
                <label className="mb-2">Are you 2025 FFM Certified?</label>
                <div className="d-flex">
                    <label className="me-4"><input type="radio" value="yes" {...register('ffmCertified', { required: true })} /> Yes</label>
                    <label><input type="radio" value="no" {...register('ffmCertified')} /> No</label>
                </div>
                {errors.ffmCertified && <span>This field is required</span>}
            </div>

            <div className="d-flex flex-column mb-4">
                <label className="mb-2">Do you have additional agents you would like to contract?</label>
                <div className="d-flex">
                    <label className="me-4"><input type="radio" value="yes" {...register('hasAdditionalAgents', { required: true })} /> Yes</label>
                    <label><input type="radio" value="no" {...register('hasAdditionalAgents')} /> No</label>
                </div>
                {errors.hasAdditionalAgents && <span>This field is required</span>}
            </div>

            <p className="mb-4">
                By completing this form, you authorize Essential Insurance Services ('Essential') to submit
                the selected carrier contract requests to the appropriate insurance companies on your behalf.
                You also authorize Essential to contact you by phone and email.
            </p>
            <div>
                <ReCAPTCHA
                    sitekey="your-recaptcha-site-key"
                    ref={recaptchaRef}
                />
            </div>

            <button type="submit" className="btn-basic w-100 justify-content-center">REQUEST CONTRACTING</button>
        </form>
    );
}
