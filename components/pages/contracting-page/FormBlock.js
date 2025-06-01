"use client";

import { toast } from 'sonner';
import React, { useRef } from "react";
import {ReCAPTCHA} from "react-google-recaptcha";
import {useForm} from "react-hook-form";
import axios from "axios";
import {CLIENT_API_URL} from "../../constants";
import {useRouter} from "next/navigation";

export default function FormBlock({insuranceData}) {
    const recaptchaRef = useRef();
    const router = useRouter();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm();


    const onSubmit = async (data) => {
       /* const recaptchaValue = recaptchaRef.current?.getValue();
        if (!recaptchaValue) {
            alert("Please complete the reCAPTCHA");
            return;
        }*/
      if(!data.carriers || ! Array.isArray(data.carriers) || data.carriers.length < 3) {
          toast.error('Please select at least 3 ACA carriers.');
          return;
      }

      const sendData = [];
      for(const [key, value] of Object.entries(data.data)) {
        if (key !== 'carriers') {
          sendData.push({label: key, value});
        }
      }

      for(let i = 1; i <= data.carriers.length; i++) {
        sendData.push({ label: `${i}. Requested carrier:`, value: data.carriers[i-1] });
      }

      // console.log("Form submitted:", { ...data }, sendData);
      try {
        await axios.post(CLIENT_API_URL + '/api/form', {
          'slug': 'aca-contracting',
          'Subject': 'ACA Contracting Request',
          'gtoken': 'ok',
          'data': sendData,
        })
        toast.success('Your request has been sent successfully. We will contact you soon.');
        router.push('/');
      }
      catch (e) {
        toast.error('We have an issue with sending your request. ' + e.message);
      }
    };

    return (
        <form className="contract-form w-100" onSubmit={handleSubmit(onSubmit)}>
            <h3>Which ACA carriers do you request?</h3>
            {insuranceData.map((item) => (
                <div key={`form-carrier-${item.id}`}>
                    <label className="mb-2">
                        <input type="checkbox"
                                {...register(`carriers`)}
                                value={item.name}
                        />
                        <span className="ps-2">{item.name}</span>
                    </label>
                </div>
            ))}

            <div className="d-flex flex-column mb-2">
                <label className="mb-2">First Name</label>
                <input placeholder={`Your First Name`} {...register('data[First Name]', { required: true, minLength: 2, maxLength: 255 })} />
                {errors.firstName && <span>First name is required (2–255 characters)</span>}
            </div>

            <div className="d-flex flex-column mb-2">
                <label className="mb-2">Last Name</label>
                <input placeholder={`Your Last Name`} {...register('data[Last Name', { required: true, minLength: 2, maxLength: 255 })} />
                {errors.lastName && <span>Last name is required (2–255 characters)</span>}
            </div>

            <div className="d-flex flex-column mb-2">
                <label className="mb-2">Email</label>
                <input placeholder={`Your Email`}
                       {...register('data[Email]', {
                           required: 'Valid email is required',
                           pattern: {value: /^\S+@\S+$/i, message: 'Enter valid email',} })
                        }
                />
                {errors.email && <span>{errors.email.message}</span>}
            </div>

            <div className="d-flex flex-column mb-2">
                <label className="mb-2">Phone</label>
                <input placeholder={`Your Phone`} {...register('data[Phone]', {
                    required: true,
                    pattern: /^\+?[1-9]\d{1,14}$/
                })} />
                {errors.phone && <span>Valid phone number is required</span>}
            </div>

            <div className="d-flex flex-column mb-2">
                <label className="mb-2">Resident State</label>
                <input placeholder={`Your Resident State`} {...register('data[Resident State]', { required: true, minLength: 2, maxLength: 255 })} />
                {errors.residentState && <span>Resident State is required</span>}
            </div>

            <div className="d-flex flex-column mb-4">
                <label className="mb-2">NPN</label>
                <input placeholder={`Your National Producer Number`} {...register('data[NPN]', { required: true, minLength: 2, maxLength: 255 })} />
                {errors.npn && <span>NPN is required</span>}
            </div>

            <div className="d-flex flex-column mb-3">
                <label className="mb-2">Total ACA Sales</label>
                <select placeholder={``} {...register('data[Total ACA Sales]')}>
                    <option value="">Select...</option>
                    <option value="0-50">0–50</option>
                    <option value="51-100">51–100</option>
                    <option value="101+">101+</option>
                </select>
            </div>

            <div className="d-flex flex-column mb-2">
                <label className="mb-2">Are you 2025 FFM Certified?</label>
                <div className="d-flex">
                    <label className="me-4"><input type="radio" value="Yes" {...register('data[Are you 2025 FFM Certified]', { required: true })} /> Yes</label>
                    <label><input type="radio" value="No" {...register('data[Are you 2025 FFM Certified]')} /> No</label>
                </div>
                {errors.ffmCertified && <span>This field is required</span>}
            </div>

            <div className="d-flex flex-column mb-4">
                <label className="mb-2">Do you have additional agents you would like to contract?</label>
                <div className="d-flex">
                    <label className="me-4"><input type="radio" value="Yes" {...register('data[Do you have additional agents you would like to contract]', { required: true })} /> Yes</label>
                    <label><input type="radio" value="No" {...register('data[Do you have additional agents you would like to contract]')} /> No</label>
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

            <button disabled={isSubmitting} type="submit" className="btn-basic w-100 justify-content-center">{isSubmitting ? 'REQUESTING...' : 'REQUEST CONTRACTING'}</button>
        </form>
    );
}
