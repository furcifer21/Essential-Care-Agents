"use client";

import { toast } from 'sonner';
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import {CLIENT_API_URL, RECAPTCHA_KEY} from "../../constants";
import {useRouter} from "next/navigation";
import {GoogleReCaptchaProvider, useGoogleReCaptcha} from "react-google-recaptcha-v3";
import ProducerAgreementModal from "./ProducerAgreementModal";

const FormBlockContent = ({insuranceData}) => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset,
        watch
    } = useForm();
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const selectedFileName = watch('attachment')?.[0]?.name ?? '';

    function validateFile(files) {
        if (!files || files.length === 0) return true;
        if (files.length > 1) return "Please select only one file";

        const file = files[0];
        const allowedTypes = [
            "application/pdf",
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp",
            "image/bmp",
            "image/svg+xml",
        ];

        if (!allowedTypes.includes(file.type)) return "Only image files or PDFs are allowed";

        const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSizeInBytes) return "File size should be less than 5MB";

        return true;
    }

    const onSubmit = async (data) => {
        if(!data.carriers || ! Array.isArray(data.carriers) || data.carriers.length < 3) {
            toast.error('Please select at least 3 ACA carriers.', {
              duration: 5000,
            });
            return;
        }

        if (!executeRecaptcha) {
          toast.error( 'reCAPTCHA not ready' ,{
            duration: 5000,
          });
          return;
        }
        executeRecaptcha('aca_contracting')
          .then((gRecaptchaToken) => {
            const sendData = [];

            for(const [key, value] of Object.entries(data.data)) {
              if (key !== 'carriers') {
                sendData.push({label: key, value});
              }
            }

            for(let i = 1; i <= data.carriers.length; i++) {
              sendData.push({ label: `${i}. Requested carrier:`, value: data.carriers[i-1] });
            }

            const formData = new FormData();
            formData.append("slug", "aca-contracting");
            formData.append("subject", "ACA Contracting Request");
            formData.append("aca_carriers", data.carriers.join('|'));
            sendData.forEach((element, index) => {
              formData.append(`data[${index}][label]`, element.label);
              formData.append(`data[${index}][value]`, element.value);
            })

            if (data.attachment?.[0] instanceof File) {
              formData.append('files[]', data.attachment[0]);
            }
            formData.append('g-recaptcha-response', gRecaptchaToken);
            return axios.post(CLIENT_API_URL + '/api/request-contracting', formData, {headers: { "Content-Type": "multipart/form-data"}})
          })
          .then((response) => {
            toast.success('We received your request contracting. Your request will pending until you sign the Producer Agreement.', {
              duration: 0,
            });
            setIsModalOpen(true);
          })
          .catch((e) => {
            toast.error('We have an issue with sending your request. ' + e.message, {
              duration: 0,
            });
            setIsModalOpen(false);
          })
    };

    const handleClick = () => {
      router.push('/');
    }

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

            <div className="d-flex flex-column mb-3">
              <label className="mb-0">First Name<span className={'text-orange'}>*</span></label>
                <input placeholder={`Your First Name`} className={'light-placeholder'} {...register('data[First Name]', { required: true, minLength: 2, maxLength: 255 })} />
                {errors.firstName && <span>First name is required (2–255 characters)</span>}
            </div>

            <div className="d-flex flex-column mb-3">
                <label className="mb-0">Last Name<span className={'text-orange'}>*</span></label>
                <input placeholder={`Your Last Name`} className={'light-placeholder'} {...register('data[Last Name', { required: true, minLength: 2, maxLength: 255 })} />
                {errors.lastName && <span>Last name is required (2–255 characters)</span>}
            </div>

            <div className="d-flex flex-column mb-3">
                <label className="mb-0">Email<span className={'text-orange'}>*</span></label>
                <input placeholder={`Your Email`}
                       className={'light-placeholder'}
                       {...register('data[Email]', {
                           required: 'Valid email is required',
                           pattern: {value: /^\S+@\S+$/i, message: 'Enter valid email',} })
                        }
                />
                {errors.email && <span>{errors.email.message}</span>}
            </div>

            <div className="d-flex flex-column mb-3">
                <label className="mb-0">Phone<span className={'text-orange'}>*</span></label>
                <input placeholder={`Your Phone`}
                    className={'light-placeholder'}
                    {...register('data[Phone]', {
                    required: true,
                    pattern: /^\+?[0-9]\d{1,14}$/
                })} />
                {errors.phone && <span>Valid phone number is required</span>}
            </div>

            <div className="d-flex flex-column mb-3">
                <label className="mb-0">Resident State</label>
                <input placeholder={`Your Resident State`}
                    className={'light-placeholder'}
                    {...register('data[Resident State]', { required: true, minLength: 2, maxLength: 255 })} />
                {errors.residentState && <span>Resident State is required</span>}
            </div>

            <div className="d-flex flex-column mb-3">
                <label className="mb-0">NPN<span className={'text-orange'}>*</span></label>
                <input placeholder={`Your National Producer Number`}
                    className={'light-placeholder'}
                    {...register('data[NPN]', { required: true, minLength: 2, maxLength: 255 })} />
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
                <label className="mb-2">Attach FFM Certificate (image or PDF)</label>

                <input
                    type="file"
                    id="file-upload"
                    accept="image/*,application/pdf"
                    {...register("attachment", { validate: validateFile })}
                    className="hidden-file-input"

                />

                <label htmlFor="file-upload" className={`custom-file-label ${selectedFileName ? 'selected' : ''}`}>
                    {selectedFileName || "Attach file"}
                </label>

                {errors.attachment && (
                    <span className="text-danger">{errors.attachment.message}</span>
                )}
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

            <button disabled={isSubmitting} type="submit" className="btn-basic w-100 justify-content-center">{isSubmitting ? 'REQUESTING...' : 'REQUEST CONTRACTING'}</button>

            <ProducerAgreementModal
              isOpen={isModalOpen}
              onClick={handleClick}
            />
        </form>
    );
}

export default function FormBlock({insuranceData}) {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_KEY}>
      <FormBlockContent insuranceData={insuranceData}/>
    </GoogleReCaptchaProvider>
  )
};